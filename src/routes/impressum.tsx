import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/impressum")({
  head: () => ({
    meta: [
      { title: "Impressum | Canablanca Select" },
      {
        name: "description",
        content: "Impressum und Anbieterinformationen von Canablanca Select.",
      },
      { name: "robots", content: "noindex, follow" },
    ],
  }),
  component: Impressum,
});

function Impressum() {
  return (
    <main className="min-h-screen bg-background px-6 py-16 text-foreground sm:py-24">
      <article className="mx-auto max-w-3xl rounded-2xl border border-border bg-card/60 p-8 sm:p-12">
        <Link
          to="/"
          className="text-sm text-primary underline decoration-primary/60 underline-offset-4"
        >
          Zurück zur Startseite
        </Link>

        <h1 className="mt-8 text-4xl font-normal text-primary sm:text-5xl">Impressum</h1>

        <section className="mt-10 space-y-3">
          <h2 className="font-sans text-lg font-medium normal-case tracking-normal text-primary">
            Angaben gemäß § 5 DDG
          </h2>
          <address className="not-italic leading-7">
            <p>E&amp;P</p>
            <p>Mainzer Landstraße 69</p>
            <p>60329 Frankfurt am Main</p>
          </address>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className="font-sans text-lg font-medium normal-case tracking-normal text-primary">
            Kontakt
          </h2>
          <p>
            Telefon:{" "}
            <a
              href="tel:+4915211242808"
              className="underline decoration-primary/60 underline-offset-4 hover:text-primary"
            >
+49 (0) 152 11242808</a>
          </p>
          <p>
            E-Mail:{" "}
            <a
              href="mailto:info@canablanca.eu"
              className="underline decoration-primary/60 underline-offset-4 hover:text-primary"
            >
              info@canablanca.eu
            </a>
          </p>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className="font-sans text-lg font-medium normal-case tracking-normal text-primary">
            Umsatzsteuer-ID
          </h2>
          <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:</p>
          <p>DE01408915680</p>
        </section>
      </article>
    </main>
  );
}
