const SHOP_URL = "https://weeztix.shop/4cd89qyn";

export function WeeztixShop() {
  return (
    <div className="overflow-hidden rounded-2xl border border-primary/60 bg-card shadow-[0_0_60px_-24px_var(--gold)]">
      <div className="border-b border-border px-6 py-5 text-center">
        <h2 className="text-4xl text-primary sm:text-5xl">Tickets</h2>
        <p className="mt-3 text-muted-foreground">
          Daten einmal eingeben, sicher über Weeztix bezahlen und Ticket per E-Mail erhalten.
        </p>
      </div>
      <iframe
        src={SHOP_URL}
        title="CANABLANCA Ticketshop bei Weeztix"
        className="block min-h-[900px] w-full bg-white"
        allow="payment"
        loading="eager"
      />
      <div className="border-t border-border px-6 py-4 text-center text-sm text-muted-foreground">
        Falls der Shop nicht angezeigt wird:{" "}
        <a
          href={SHOP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-4"
        >
          Ticketshop öffnen
        </a>
      </div>
    </div>
  );
}
