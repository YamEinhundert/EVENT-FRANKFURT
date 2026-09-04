import "./lib/error-capture";

import { env as cloudflareEnv } from "cloudflare:workers";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

type WeeztixOrder = {
  guid?: unknown;
  shop_id?: unknown;
  firstname?: unknown;
  lastname?: unknown;
  email?: unknown;
  status?: unknown;
  is_complete?: unknown;
  created_at?: unknown;
  tickets?: unknown;
  metadata?: unknown;
};

function findMetadataValue(value: unknown, wantedKeys: string[]): string {
  const wanted = new Set(wantedKeys.map((key) => key.toLowerCase()));
  const visit = (node: unknown): string => {
    if (!node || typeof node !== "object") return "";
    if (Array.isArray(node)) {
      for (const item of node) {
        const found = visit(item);
        if (found) return found;
      }
      return "";
    }
    const record = node as Record<string, unknown>;
    const label = clean(record.name ?? record.label ?? record.key, 100).toLowerCase();
    if (wanted.has(label)) {
      return clean(record.value ?? record.val ?? record.answer, 255);
    }
    for (const [key, child] of Object.entries(record)) {
      if (wanted.has(key.toLowerCase())) {
        const direct = clean(child, 255);
        if (direct) return direct;
      }
      const found = visit(child);
      if (found) return found;
    }
    return "";
  };
  return visit(value);
}

function detectTicketType(order: WeeztixOrder) {
  const raw = JSON.stringify(order.tickets ?? []).toLowerCase();
  if (raw.includes("artist")) return "artist";
  if (raw.includes("aussteller") || raw.includes("exhibitor")) return "aussteller";
  if (raw.includes("vip")) return "vip";
  if (raw.includes("gästeliste") || raw.includes("gaesteliste") || raw.includes("guestlist")) {
    return "gaesteliste";
  }
  return "ticket";
}

async function importWeeztixOrder(request: Request) {
  const configuredNonce = clean(
    (cloudflareEnv as unknown as { WEEZTIX_WEBHOOK_NONCE?: string }).WEEZTIX_WEBHOOK_NONCE,
    255,
  );
  const receivedNonce = clean(request.headers.get("OpenTicket-Identifier"), 255);

  if (!configuredNonce) {
    console.error("WEEZTIX_WEBHOOK_NONCE is not configured");
    return Response.json({ error: "Webhook nicht konfiguriert." }, { status: 503 });
  }
  if (!receivedNonce || receivedNonce !== configuredNonce) {
    return Response.json({ error: "Nicht autorisiert." }, { status: 401 });
  }

  try {
    const order = (await request.json()) as WeeztixOrder;
    const externalId = clean(order.guid, 100);
    const email = clean(order.email, 255).toLowerCase();
    const name = `${clean(order.firstname, 100)} ${clean(order.lastname, 100)}`.trim();
    const phone = findMetadataValue(order.metadata ?? order, [
      "telefon",
      "telefonnummer",
      "phone",
      "phone number",
      "mobile",
      "mobilnummer",
    ]);
    const status = clean(order.status, 50).toLowerCase();

    if (!externalId || !email.includes("@") || name.length < 2) {
      return Response.json({ error: "Unvollständige Bestelldaten." }, { status: 400 });
    }
    if (order.is_complete === false || (status && !["paid", "complete", "completed"].includes(status))) {
      return Response.json({ ok: true, ignored: true });
    }

    const db = cloudflareEnv.DB.withSession("first-primary");
    await db.prepare("ALTER TABLE anmeldungen ADD COLUMN quelle TEXT").run().catch(() => undefined);
    await db.prepare("ALTER TABLE anmeldungen ADD COLUMN externe_id TEXT").run().catch(() => undefined);
    await db.prepare("ALTER TABLE anmeldungen ADD COLUMN ticketanzahl INTEGER").run().catch(() => undefined);
    await db
      .prepare("CREATE UNIQUE INDEX IF NOT EXISTS anmeldungen_externe_id_idx ON anmeldungen (externe_id)")
      .run();

    const ticketCount = Array.isArray(order.tickets) ? order.tickets.length : 1;
    await db
      .prepare(
        `INSERT OR IGNORE INTO anmeldungen
          (anmeldeart, name, email, telefon, zugangscode, crew_anzahl, erstellt_am, quelle, externe_id, ticketanzahl)
         VALUES (?, ?, ?, ?, NULL, NULL, ?, 'weeztix', ?, ?)`,
      )
      .bind(
        detectTicketType(order),
        name,
        email,
        phone,
        clean(order.created_at, 50) || new Date().toISOString(),
        externalId,
        ticketCount,
      )
      .run();

    return Response.json({ ok: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Bestellung konnte nicht importiert werden." }, { status: 500 });
  }
}

async function saveRegistration(request: Request) {
  try {
    const payload = (await request.json()) as Record<string, unknown>;
    const anmeldeart = clean(payload["anmeldeart"], 30);
    const name = clean(payload["name"], 100);
    const email = clean(payload["email"], 255);
    const telefon = clean(payload["telefon"], 40);
    const zugangscode = clean(payload["zugangscode"], 50).toUpperCase();
    const crewAnzahl = Number(payload["crew_anzahl"] ?? 0);
    const brauchtCrew = anmeldeart === "artist" || anmeldeart === "aussteller";

    if (
      !["artist", "aussteller", "vip", "gaesteliste"].includes(anmeldeart) ||
      name.length < 2 ||
      !email.includes("@") ||
      telefon.length < 3 ||
      zugangscode.length < 2 ||
      (brauchtCrew && (!Number.isInteger(crewAnzahl) || crewAnzahl < 0 || crewAnzahl > 50))
    ) {
      return Response.json({ error: "Bitte Pflichtfelder prüfen." }, { status: 400 });
    }

    const db = cloudflareEnv.DB.withSession("first-primary");

    await db
      .prepare(
        `
      CREATE TABLE IF NOT EXISTS anmeldungen (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        anmeldeart TEXT NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        telefon TEXT NOT NULL,
        zugangscode TEXT,
        crew_anzahl INTEGER,
        erstellt_am TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `,
      )
      .run();

    const columns = await db.prepare("PRAGMA table_info(anmeldungen)").all<{ name: string }>();

    if (!columns.results.some((column) => column.name === "zugangscode")) {
      try {
        await db.prepare("ALTER TABLE anmeldungen ADD COLUMN zugangscode TEXT").run();
      } catch (error) {
        const refreshedColumns = await db
          .prepare("PRAGMA table_info(anmeldungen)")
          .all<{ name: string }>();
        if (!refreshedColumns.results.some((column) => column.name === "zugangscode")) {
          throw error;
        }
      }
    }

    await db
      .prepare(
        "CREATE INDEX IF NOT EXISTS anmeldungen_zugangscode_idx ON anmeldungen (zugangscode)",
      )
      .run();

    await db
      .prepare(
        "INSERT INTO anmeldungen (anmeldeart, name, email, telefon, zugangscode, crew_anzahl) VALUES (?, ?, ?, ?, ?, ?)",
      )
      .bind(anmeldeart, name, email, telefon, zugangscode || null, brauchtCrew ? crewAnzahl : null)
      .run();

    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Anmeldung konnte nicht gespeichert werden." }, { status: 500 });
  }
}

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown): Promise<Response> {
    try {
      const url = new URL(request.url);
      if (url.hostname === "www.canablanca.eu" || url.protocol === "http:") {
        const canonicalUrl = new URL(`${url.pathname}${url.search}`, "https://canablanca.eu");
        return Response.redirect(canonicalUrl, 301);
      }

      if (url.pathname === "/api/anmeldungen" && request.method === "POST") {
        return await saveRegistration(request);
      }

      if (url.pathname === "/api/weeztix" && request.method === "POST") {
        return await importWeeztixOrder(request);
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
