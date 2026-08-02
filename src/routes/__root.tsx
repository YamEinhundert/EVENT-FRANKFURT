import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";

import "@fontsource/barlow/400.css";
import "@fontsource/barlow/500.css";
import "@fontsource/barlow/600.css";
import "@fontsource/bebas-neue/400.css";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Seite nicht gefunden</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Diese Seite existiert nicht oder wurde verschoben.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Die Seite konnte nicht geladen werden
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Bitte lade die Seite neu oder gehe zurück zur Startseite.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Erneut versuchen
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Zur Startseite
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Canablanca Select 2026 – Frankfurt" },
      {
        name: "description",
        content:
          "Canablanca Select – International Culture Event am 12.09.2026 in Frankfurt. Anmeldung für Artists, Aussteller, VIP und Gästeliste.",
      },
      { name: "author", content: "Canablanca" },
      { name: "application-name", content: "Canablanca Select" },
      { name: "theme-color", content: "#06170e" },
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
      { name: "twitter:title", content: "Canablanca Select 2026 – Frankfurt" },
      {
        name: "twitter:description",
        content: "International Culture Event · 12. September 2026 · Frankfurt am Main",
      },
      {
        name: "twitter:image",
        content: "https://canablanca.eu/canablanca-select-2026-preview.png",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        href: "/canablanca-select-2026-preview.png",
        type: "image/png",
      },
      { rel: "apple-touch-icon", href: "/canablanca-select-2026-preview.png" },
      { rel: "canonical", href: "https://canablanca.eu/" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster position="top-center" />
    </QueryClientProvider>
  );
}
