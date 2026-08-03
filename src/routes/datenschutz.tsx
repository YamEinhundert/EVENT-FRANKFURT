import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/datenschutz")({
  head: () => ({
    meta: [
      { title: "Datenschutz | Canablanca Select" },
      {
        name: "description",
        content: "Datenschutzerklärung von Canablanca Select.",
      },
      { name: "robots", content: "noindex, follow" },
    ],
  }),
  component: Datenschutz,
});

const headingClass = "font-sans text-lg font-medium normal-case tracking-normal text-primary";

function Datenschutz() {
  return (
    <main className="min-h-screen bg-background px-6 py-16 text-foreground sm:py-24">
      <article className="mx-auto max-w-3xl rounded-2xl border border-border bg-card/60 p-8 leading-7 sm:p-12">
        <Link
          to="/"
          className="text-sm text-primary underline decoration-primary/60 underline-offset-4"
        >
          Zurück zur Startseite
        </Link>

        <h1 className="mt-8 text-4xl font-normal text-primary sm:text-5xl">Datenschutzerklärung</h1>

        <section className="mt-10 space-y-3">
          <h2 className={headingClass}>1. Verantwortlicher</h2>
          <address className="not-italic">
            <p>E&amp;P</p>
            <p>Bethmannstraße 7–9</p>
            <p>60313 Frankfurt am Main</p>
            <p>
              Telefon:{" "}
              <a className="underline underline-offset-4" href="tel:+4915211242808">
                +49 (0) 152 11242808
              </a>
            </p>
            <p>
              E-Mail:{" "}
              <a className="underline underline-offset-4" href="mailto:info@canablanca.eu">
                info@canablanca.eu
              </a>
            </p>
          </address>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className={headingClass}>2. Aufruf der Website und Hosting</h2>
          <p>
            Beim Aufruf dieser Website werden technisch erforderliche Verbindungsdaten verarbeitet.
            Dazu können insbesondere IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene
            Adresse, Browser- und Geräteinformationen sowie Status- und Fehlerdaten gehören. Die
            Verarbeitung dient der sicheren, stabilen und fehlerfreien Bereitstellung der Website.
          </p>
          <p>
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt im
            sicheren und zuverlässigen Betrieb der Website.
          </p>
          <p>
            Die Website und die Anmeldedaten werden über Dienste von Cloudflare, Inc., 101 Townsend
            St, San Francisco, CA 94107, USA, bereitgestellt. Cloudflare verarbeitet Daten in
            unserem Auftrag. Dabei kann eine Verarbeitung außerhalb der Europäischen Union
            stattfinden. Für solche Übermittlungen werden die nach der DSGVO vorgesehenen
            Schutzmechanismen eingesetzt.
          </p>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className={headingClass}>3. Anmeldung zur Veranstaltung</h2>
          <p>
            Bei einer Anmeldung verarbeiten wir die gewählte Anmeldeart, deinen Namen, deine
            E-Mail-Adresse und deine Telefonnummer. Der Zugangscode wird zur Zuordnung der
            Empfehlung gespeichert. Bei Artists und Ausstellern wird zusätzlich die Anzahl der
            Crew-Mitglieder gespeichert.
          </p>
          <p>
            Die Daten werden zur Prüfung, Bearbeitung und Bestätigung der Anmeldung sowie zur
            Organisation und Durchführung der Veranstaltung verarbeitet. Rechtsgrundlage ist Art. 6
            Abs. 1 lit. b DSGVO. Soweit die Verarbeitung der Organisation und Missbrauchsvermeidung
            dient, erfolgt sie zusätzlich auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
          </p>
          <p>
            Zugriff erhalten nur die mit der Organisation befassten Personen sowie der technische
            Auftragsverarbeiter Cloudflare. Eine Weitergabe zu Werbezwecken erfolgt nicht.
          </p>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className={headingClass}>4. Speicherdauer</h2>
          <p>
            Anmeldedaten werden grundsätzlich bis zum Abschluss der Veranstaltungsorganisation
            verarbeitet und anschließend gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten
            oder berechtigten Gründe für eine weitere Speicherung bestehen. Technische
            Protokolldaten werden nur so lange gespeichert, wie dies für Sicherheit und
            Fehleranalyse erforderlich ist.
          </p>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className={headingClass}>5. Schriftarten, Cookies und Reichweitenmessung</h2>
          <p>
            Die auf dieser Website verwendeten Schriftarten werden lokal von unserem Hosting
            ausgeliefert. Beim Laden der Schriftarten wird keine Verbindung zu Google Fonts
            hergestellt. Wir verwenden keine Marketing- oder Analyse-Cookies und führen keine
            personenbezogene Reichweitenmessung durch.
          </p>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className={headingClass}>6. Deine Rechte</h2>
          <p>
            Du hast im Rahmen der gesetzlichen Voraussetzungen das Recht auf Auskunft, Berichtigung,
            Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Zur
            Ausübung deiner Rechte genügt eine Nachricht an info@canablanca.eu.
          </p>
          <p>
            Außerdem kannst du dich bei einer Datenschutzaufsichtsbehörde beschweren. Zuständig ist
            insbesondere der Hessische Beauftragte für Datenschutz und Informationsfreiheit,
            Postfach 3163, 65021 Wiesbaden, E-Mail: poststelle@datenschutz.hessen.de.
          </p>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className={headingClass}>7. Automatisierte Entscheidungen</h2>
          <p>
            Eine automatisierte Entscheidungsfindung einschließlich Profiling findet nicht statt.
          </p>
        </section>

        <p className="mt-12 text-sm text-muted-foreground">Stand: 3. August 2026</p>
      </article>
    </main>
  );
}
