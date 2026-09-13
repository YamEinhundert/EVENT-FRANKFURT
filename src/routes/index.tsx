import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, CalendarDays, Camera, MapPin } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Canablanca Mash Up – Frankfurt" },
      {
        name: "description",
        content:
          "Canablanca Mash Up Frankfurt. Danke für Mash Up 001. Das nächste Canablanca Mash Up kommt im Dezember 2026.",
      },
      { property: "og:title", content: "Canablanca Mash Up – Danke Frankfurt" },
      {
        property: "og:description",
        content: "Mash Up 001 ist Geschichte. Next Mash Up: Dezember 2026 in Frankfurt.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://canablanca.eu/" },
      { property: "og:site_name", content: "Canablanca Mash Up" },
      { property: "og:locale", content: "de_DE" },
      { property: "og:image", content: "https://canablanca.eu/mash-up-001-danke.jpg" },
      { property: "og:image:secure_url", content: "https://canablanca.eu/mash-up-001-danke.jpg" },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1024" },
      { property: "og:image:height", content: "1536" },
      { property: "og:image:alt", content: "Canablanca Mash Up – Danke Frankfurt" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://canablanca.eu/mash-up-001-danke.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://canablanca.eu/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <section className="relative isolate min-h-[92vh] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(211,167,74,0.16),transparent_40%),linear-gradient(to_bottom,#06170e,#020b06)]" />
        <div className="relative mx-auto grid min-h-[92vh] max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:py-24">
          <div className="text-center lg:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-primary sm:text-sm">
              Mash Up 001 · Frankfurt
            </p>
            <h1 className="mt-6 gold-gradient-text text-7xl leading-[0.86] sm:text-8xl lg:text-9xl">
              Danke.
            </h1>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-foreground/80 lg:mx-0">
              Unser erstes Canablanca Mash Up ist Geschichte. Danke an alle Artists, Partner,
              Helfer – und vor allem an euch, die diesen Tag besonders gemacht haben.
            </p>
            <div className="mt-10 inline-flex flex-col items-center gap-2 border-y border-primary/40 px-8 py-5 lg:items-start">
              <span className="font-display text-2xl tracking-[0.12em] text-primary">
                NEXT MASH UP
              </span>
              <span className="font-display text-5xl tracking-wide sm:text-6xl">DEZEMBER 2026</span>
              <span className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-muted-foreground">
                <MapPin className="size-4 text-primary" /> Frankfurt am Main
              </span>
            </div>
            <p className="mt-6 text-sm uppercase tracking-[0.25em] text-muted-foreground">
              Datum, Location &amp; Line-up folgen
            </p>
          </div>

          <figure className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-5 rounded-[2rem] bg-primary/10 blur-3xl" />
            <img
              src="/mash-up-001-danke.jpg"
              alt="Canablanca Mash Up – Dankesmotiv für Frankfurt"
              className="relative w-full rounded-2xl border border-primary/50 shadow-[0_30px_100px_-35px_rgba(211,167,74,0.55)]"
            />
          </figure>

          <a
            href="#impressionen"
            aria-label="Zu den Impressionen"
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-primary/80 transition-colors hover:text-primary"
          >
            <ArrowDown className="size-7 animate-bounce" />
          </a>
        </div>
      </section>

      <section id="impressionen" className="border-y border-border bg-card/40">
        <div className="mx-auto max-w-6xl px-6 py-24 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.42em] text-primary">
            Mash Up 001 · September 2026
          </p>
          <h2 className="mt-4 text-5xl sm:text-7xl">Impressionen</h2>
          <div className="mx-auto mt-10 flex min-h-72 max-w-4xl flex-col items-center justify-center rounded-2xl border border-dashed border-primary/40 bg-background/50 px-6">
            <Camera className="size-10 text-primary" />
            <p className="mt-5 font-display text-3xl tracking-widest">DIE GALERIE KOMMT</p>
            <p className="mt-2 max-w-md text-muted-foreground">
              Fotos und Momente vom ersten Canablanca Mash Up folgen hier in Kürze.
            </p>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(211,167,74,0.12),transparent_50%)]" />
        <div className="relative mx-auto max-w-5xl px-6 py-24 text-center">
          <CalendarDays className="mx-auto size-8 text-primary" />
          <p className="mt-5 text-sm uppercase tracking-[0.35em] text-primary">Das war erst der Anfang</p>
          <h2 className="mt-5 text-5xl sm:text-7xl">Wir sehen uns im Dezember.</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Same vibes. Higher places. Alle Details zum nächsten Mash Up folgen.
          </p>
        </div>
      </section>

      <footer className="border-t border-border bg-card/30">
        <div className="mx-auto max-w-6xl px-6 py-12 text-sm text-muted-foreground">
          <p className="font-display text-2xl tracking-widest text-primary">CANABLANCA MASH UP</p>
          <p className="mt-2">Music · People · Plants · Culture · Frankfurt am Main</p>
          <nav className="mt-6" aria-label="Rechtliche Informationen">
            <Link to="/impressum" className="underline decoration-primary/60 underline-offset-4 hover:text-primary">
              Impressum
            </Link>
            <span aria-hidden="true" className="mx-3">·</span>
            <Link to="/datenschutz" className="underline decoration-primary/60 underline-offset-4 hover:text-primary">
              Datenschutz
            </Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
