import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

type D1Statement = {
  bind: (...values: unknown[]) => D1Statement;
  run: () => Promise<unknown>;
};

type ServerEnv = {
  DB?: { prepare: (query: string) => D1Statement };
};

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

async function saveRegistration(request: Request, env: ServerEnv) {
  if (!env.DB) {
    return Response.json({ error: "Datenbank nicht verbunden." }, { status: 503 });
  }

  try {
    const payload = (await request.json()) as Record<string, unknown>;
    const anmeldeart = clean(payload.anmeldeart, 30);
    const name = clean(payload.name, 100);
    const email = clean(payload.email, 255);
    const telefon = clean(payload.telefon, 40);
    const crewAnzahl = Number(payload.crew_anzahl ?? 0);
    const brauchtCrew = anmeldeart === "artist" || anmeldeart === "aussteller";

    if (
      !["artist", "aussteller", "vip", "gaesteliste"].includes(anmeldeart) ||
      name.length < 2 ||
      !email.includes("@") ||
      telefon.length < 3 ||
      (brauchtCrew && (!Number.isInteger(crewAnzahl) || crewAnzahl < 0 || crewAnzahl > 50))
    ) {
      return Response.json({ error: "Bitte Pflichtfelder prüfen." }, { status: 400 });
    }

    await env.DB.prepare(
      `
      CREATE TABLE IF NOT EXISTS anmeldungen (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        anmeldeart TEXT NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        telefon TEXT NOT NULL,
        crew_anzahl INTEGER,
        erstellt_am TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `,
    ).run();

    await env.DB.prepare(
      "INSERT INTO anmeldungen (anmeldeart, name, email, telefon, crew_anzahl) VALUES (?, ?, ?, ?, ?)",
    )
      .bind(anmeldeart, name, email, telefon, brauchtCrew ? crewAnzahl : null)
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
  async fetch(request: Request, env: ServerEnv, ctx: unknown) {
    try {
      const url = new URL(request.url);
      if (url.pathname === "/api/anmeldungen" && request.method === "POST") {
        return await saveRegistration(request, env);
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
