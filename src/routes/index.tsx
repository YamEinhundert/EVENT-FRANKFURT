import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, MapPin, Clock } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import flyerImg from "@/assets/hash-cup-flyer.png";
import { AnmeldeFormular, ANMELDEARTEN } from "@/components/AnmeldeFormular";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Canablanca Select 2026 – Frankfurt" },
      {
        name: "description",
        content:
          "Canablanca Select – International Culture Event am 12.09.2026 in Frankfurt. Anmeldung für Artists, Aussteller, VIP und Gästeliste.",
      },
      { property: "og:title", content: "Canablanca Select 2026 – Frankfurt" },
      {
        property: "og:description",
        content: "International Culture Event · 12. September 2026 · Frankfurt am Main",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://canablanca.eu/" },
      { property: "og:site_name", content: "Canablanca Select" },
      { property: "og:locale", content: "de_DE" },
      {
        property: "og:image",
        content: "https://canablanca.eu/canablanca-select-2026-preview.png",
      },
      {
        property: "og:image:secure_url",
        content: "https://canablanca.eu/canablanca-select-2026-preview.png",
      },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "800" },
      { property: "og:image:height", content: "684" },
      {
        property: "og:image:alt",
        content: "Canablanca Select 2026 – Wappen mit zwei Löwen",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:image",
        content: "https://canablanca.eu/canablanca-select-2026-preview.png",
      },
    ],
    links: [{ rel: "canonical", href: "https://canablanca.eu/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(211,167,74,0.11),transparent_42%),linear-gradient(to_bottom,#06170e,#031008)]" />
        <div className="relative mx-auto max-w-5xl px-6 py-28 text-center sm:py-36">
          <img
            src="/canablanca-select-2026-preview.png"
            alt="Canablanca Wappen mit zwei Löwen"
            className="mx-auto mb-6 h-auto w-full max-w-sm mix-blend-screen"
          />
          <p className="text-sm uppercase tracking-[0.4em] text-primary">präsentiert</p>
          <h1 className="mt-6 gold-gradient-text text-6xl leading-none sm:text-8xl">
            Canablanca
            <br />
            Select 2026
          </h1>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2">
              <CalendarDays className="size-4 text-primary" /> 12. September 2026
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2">
              <MapPin className="size-4 text-primary" /> Frankfurt am Main
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2">
              <Clock className="size-4 text-primary" /> 11:00 – 02:00 Uhr
            </span>
          </div>
          <a
            href="#anmeldung"
            className="mt-10 inline-block rounded-lg bg-primary px-10 py-4 font-display text-xl tracking-widest text-primary-foreground transition-opacity hover:opacity-90"
          >
            Jetzt anmelden
          </a>
        </div>
      </section>

      {/* Flyer */}
      <section className="border-y border-border bg-card/40">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-20">
          <div className="relative overflow-hidden rounded-xl border border-primary/60 shadow-[0_0_60px_-22px_var(--gold)]">
            <img
              src={flyerImg}
              alt="Canablanca Select Frankfurt Event-Flyer mit QR-Code"
              className="block w-full"
            />
            <span className="absolute bottom-[5.5%] left-[15.5%] w-[21%] bg-[#f7efdf] p-[1.2%]">
              <QRCodeSVG
                value="https://canablanca.eu"
                size={220}
                level="H"
                bgColor="#f7efdf"
                fgColor="#06170e"
                className="h-auto w-full"
                title="QR-Code zu canablanca.eu"
              />
            </span>
          </div>
          <a
            href="#anmeldung"
            className="mt-10 rounded-lg bg-primary px-10 py-4 font-display text-xl tracking-widest text-primary-foreground transition-opacity hover:opacity-90"
          >
            Jetzt anmelden
          </a>
        </div>
      </section>

      {/* Anmeldearten */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-4xl text-primary sm:text-5xl">Anmeldung</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ANMELDEARTEN.map((art) => (
            <div
              key={art.id}
              className={`flex flex-col rounded-2xl border bg-card p-8 ${
                "highlight" in art && art.highlight
                  ? "border-primary shadow-[0_0_40px_-15px_var(--gold)]"
                  : "border-border"
              }`}
            >
              <h3 className="text-3xl text-primary">{art.name}</h3>
              <a
                href="#anmeldung"
                className="mt-8 rounded-lg border border-primary px-6 py-3 text-center font-display text-lg tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                {art.button}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Anmeldung */}
      <section id="anmeldung" className="border-t border-border bg-card/40">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-4xl text-primary sm:text-5xl">Anmeldeformular</h2>
          <div className="mt-10">
            <AnmeldeFormular />
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-6 py-12 text-sm text-muted-foreground">
        <p className="font-display text-xl tracking-widest text-primary">CANABLANCA SELECT</p>
        <p className="mt-2">
          International Culture Event · 12.09.2026 · Frankfurt am Main · Zutritt ab 18 Jahren.
          Teilnahme nur im Rahmen der geltenden gesetzlichen Bestimmungen.
        </p>
        <nav className="mt-6" aria-label="Rechtliche Informationen">
          <Link
            to="/impressum"
            className="underline decoration-primary/60 underline-offset-4 transition-colors hover:text-primary"
          >
            Impressum
          </Link>
          <span aria-hidden="true" className="mx-3">
            ·
          </span>
          <Link
            to="/datenschutz"
            className="underline decoration-primary/60 underline-offset-4 transition-colors hover:text-primary"
          >
            Datenschutz
          </Link>
        </nav>
      </footer>
    </main>
  );
}
