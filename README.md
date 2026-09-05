# Canablanca Select Frankfurt

Landingpage und Anmeldung für Canablanca Select, das International Culture Event am 12.09.2026 in Frankfurt. Die Anwendung läuft als TanStack-Start-App auf Cloudflare Workers und speichert Anmeldungen in Cloudflare D1.

## Lokal starten

```sh
npm install
npm run dev
```

## Cloudflare

1. Das GitHub-Repository mit Cloudflare Workers Builds verbinden.
2. Build-Befehl: `npm run build`
3. Deploy-Befehl: `npx wrangler deploy`
4. Cloudflare legt die D1-Datenbank für das Binding `DB` beim ersten Deployment an.

Die Formulareingänge findest du anschließend im Cloudflare-Dashboard unter **Storage & Databases → D1 → Studio → anmeldungen**. Von Weeztix übertragene, abgeschlossene Bestellungen werden nach Ticketart getrennt in **weeztix_artist**, **weeztix_aussteller**, **weeztix_vip**, **weeztix_gaesteliste** und **weeztix_sonstige** gespeichert. Jede Zeile entspricht einem Ticket bzw. Teilnehmer und enthält getrennte Angaben für Ticketinhaber und Besteller. `bestellung_json` und `ticket_json` bewahren zusätzlich den vollständigen übertragenen Payload auf.
