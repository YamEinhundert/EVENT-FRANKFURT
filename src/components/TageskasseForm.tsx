import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, CircleCheck, Users } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2, "Bitte Namen angeben").max(100),
  email: z.string().trim().email("Ungültige E-Mail-Adresse").max(255),
  telefon: z.string().trim().min(3, "Bitte Telefonnummer angeben").max(40),
  personen_anzahl: z.number().int().min(1).max(10),
});

export function TageskasseForm() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const parsed = schema.safeParse({
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      telefon: String(data.get("telefon") ?? ""),
      personen_anzahl: Number(data.get("personen_anzahl") ?? 1),
    });

    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Bitte Eingaben prüfen");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/tageskasse", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!response.ok) throw new Error("Vormerkung fehlgeschlagen");

      form.reset();
      setDone(true);
      toast.success("Du bist für die Tageskasse vorgemerkt!");
    } catch {
      toast.error("Vormerkung fehlgeschlagen. Bitte später erneut versuchen.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <details className="group mt-5 overflow-hidden rounded-2xl border border-border bg-card/80">
      <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-5 transition-colors hover:bg-primary/10 [&::-webkit-details-marker]:hidden">
        <span className="grid size-11 shrink-0 place-items-center rounded-full border border-primary/50 bg-primary/10 text-primary">
          <Users className="size-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-display text-2xl tracking-wider text-primary">
            Tages- &amp; Abendkasse
          </span>
          <span className="mt-1 block text-sm text-muted-foreground">
            Vor Ort zahlen · Einlass nur nach Anmeldung
          </span>
        </span>
        <ChevronDown className="size-5 shrink-0 text-primary transition-transform group-open:rotate-180" />
      </summary>

      <div className="border-t border-border px-5 py-6 sm:px-7">
        {done ? (
          <div className="py-4 text-center" role="status">
            <CircleCheck className="mx-auto size-10 text-primary" />
            <p className="mt-3 font-display text-2xl tracking-wide text-primary">
              Vormerkung eingegangen
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Bezahlung und Einlass erfolgen vor Ort.
            </p>
            <button
              type="button"
              onClick={() => setDone(false)}
              className="mt-5 rounded-lg border border-primary px-5 py-2 text-sm text-primary transition-colors hover:bg-primary/10"
            >
              Weitere Anmeldung
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <p className="text-sm leading-6 text-muted-foreground">
                Melde dich hier vorab an. Ohne vorherige Anmeldung ist kein Einlass möglich.
                Bezahlt wird vor Ort.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium">
                Name *
                <input
                  name="name"
                  required
                  minLength={2}
                  maxLength={100}
                  autoComplete="name"
                  className="h-11 rounded-lg border border-input bg-background px-3"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                E-Mail *
                <input
                  name="email"
                  type="email"
                  required
                  maxLength={255}
                  autoComplete="email"
                  className="h-11 rounded-lg border border-input bg-background px-3"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Telefon *
                <input
                  name="telefon"
                  type="tel"
                  required
                  minLength={3}
                  maxLength={40}
                  autoComplete="tel"
                  className="h-11 rounded-lg border border-input bg-background px-3"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Anzahl Personen *
                <input
                  name="personen_anzahl"
                  type="number"
                  required
                  min={1}
                  max={10}
                  defaultValue={1}
                  inputMode="numeric"
                  className="h-11 rounded-lg border border-input bg-background px-3"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-primary px-6 py-3 font-display text-lg tracking-widest text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Wird gespeichert…" : "Jetzt anmelden"}
            </button>
            <p className="text-center text-xs leading-5 text-muted-foreground">
              Mit dem Absenden werden deine Angaben zur Bearbeitung der Vormerkung gespeichert. Mehr
              dazu in unserer{" "}
              <Link
                to="/datenschutz"
                className="underline decoration-primary/60 underline-offset-2 hover:text-primary"
              >
                Datenschutzerklärung
              </Link>
              .
            </p>
          </form>
        )}
      </div>
    </details>
  );
}
