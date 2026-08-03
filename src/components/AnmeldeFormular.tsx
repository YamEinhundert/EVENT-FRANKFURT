import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";

export const ANMELDEARTEN = [
  {
    id: "artist",
    name: "Artist",
    button: "Als Artist anmelden",
  },
  {
    id: "aussteller",
    name: "Aussteller",
    button: "Als Aussteller anmelden",
  },
  {
    id: "vip",
    name: "VIP",
    button: "VIP-Anmeldung",
    highlight: true,
  },
  {
    id: "gaesteliste",
    name: "Gästeliste",
    button: "Auf die Gästeliste",
  },
] as const;

const schema = z.object({
  anmeldeart: z.enum(["artist", "aussteller", "vip", "gaesteliste"]),
  name: z.string().trim().min(2, "Bitte Namen angeben").max(100),
  email: z.string().trim().email("Ungültige E-Mail-Adresse").max(255),
  telefon: z.string().trim().min(3, "Bitte Telefonnummer angeben").max(40),
  zugangscode: z.string().trim().min(2, "Bitte Zugangscode angeben").max(50),
  crew_anzahl: z.number().int().min(0).max(50).optional(),
});

export function AnmeldeFormular() {
  const [anmeldeart, setAnmeldeart] = useState<string>("gaesteliste");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const brauchtCrew = anmeldeart === "artist" || anmeldeart === "aussteller";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      anmeldeart,
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      telefon: String(fd.get("telefon") ?? ""),
      zugangscode: String(fd.get("zugangscode") ?? ""),
      crew_anzahl: brauchtCrew ? Number(fd.get("crew_anzahl") ?? 0) : undefined,
    });

    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Bitte Eingaben prüfen");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/anmeldungen", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!response.ok) throw new Error("Anmeldung fehlgeschlagen");
      setDone(true);
      toast.success("Anmeldung eingegangen!");
    } catch {
      toast.error("Anmeldung fehlgeschlagen. Bitte später erneut versuchen.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-primary bg-card p-10 text-center">
        <p className="font-display text-3xl tracking-wide text-primary">
          Danke für deine Anmeldung!
        </p>
        <p className="mt-3 text-muted-foreground">
          Deine Anmeldung wird innerhalb von 24 Stunden bestätigt.
        </p>
        <button
          type="button"
          onClick={() => setDone(false)}
          className="mt-6 rounded-lg border border-primary px-5 py-2 text-primary"
        >
          Weitere Person anmelden
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5 rounded-2xl border border-border bg-card p-6 sm:p-8"
    >
      <div className="grid gap-2">
        <label className="text-sm font-medium" htmlFor="anmeldeart">
          Anmeldeart *
        </label>
        <select
          id="anmeldeart"
          value={anmeldeart}
          onChange={(e) => setAnmeldeart(e.target.value)}
          className="h-11 rounded-lg border border-input bg-background px-3 text-foreground"
        >
          {ANMELDEARTEN.map((art) => (
            <option key={art.id} value={art.id}>
              {art.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="name">
            Name *
          </label>
          <input
            id="name"
            name="name"
            required
            minLength={2}
            maxLength={100}
            className="h-11 rounded-lg border border-input bg-background px-3"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="email">
            E-Mail *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={255}
            className="h-11 rounded-lg border border-input bg-background px-3"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="telefon">
            Telefon *
          </label>
          <input
            id="telefon"
            name="telefon"
            type="tel"
            required
            maxLength={40}
            className="h-11 rounded-lg border border-input bg-background px-3"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="zugangscode">
            Zugangscode *
          </label>
          <input
            id="zugangscode"
            name="zugangscode"
            required
            minLength={2}
            maxLength={50}
            autoCapitalize="characters"
            autoComplete="off"
            spellCheck={false}
            className="h-11 rounded-lg border border-input bg-background px-3 uppercase"
          />
        </div>
        {brauchtCrew && (
          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="crew_anzahl">
              Anzahl Crew-Mitglieder *
            </label>
            <input
              id="crew_anzahl"
              name="crew_anzahl"
              type="number"
              required
              min={0}
              max={50}
              defaultValue={0}
              className="h-11 rounded-lg border border-input bg-background px-3"
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-primary px-6 py-3 font-display text-lg tracking-widest text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {loading ? "Wird gesendet…" : "Anmeldung absenden"}
      </button>
      <p className="text-center text-xs text-muted-foreground">
        Mit dem Absenden werden deine Angaben zur Bearbeitung der Anmeldung gespeichert. Weitere
        Informationen findest du in unserer{" "}
        <Link
          to="/datenschutz"
          className="underline decoration-primary/60 underline-offset-2 hover:text-primary"
        >
          Datenschutzerklärung
        </Link>
        .
      </p>
    </form>
  );
}
