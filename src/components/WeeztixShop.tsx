const SHOP_URL = "https://weeztix.shop/4cd89qyn";

export function WeeztixShop() {
  return (
    <details className="group overflow-hidden rounded-2xl border border-primary/60 bg-card shadow-[0_0_50px_-24px_var(--gold)]">
      <summary className="cursor-pointer list-none px-6 py-6 text-center transition-colors hover:bg-primary/10 [&::-webkit-details-marker]:hidden">
        <span className="block font-display text-3xl tracking-widest text-primary sm:text-4xl">
          Tickets
        </span>
        <span className="mt-2 block text-sm text-muted-foreground">
          Antippen, um den Ticketshop zu öffnen
        </span>
        <span className="mt-4 inline-block text-2xl text-primary transition-transform group-open:rotate-180">
          ⌄
        </span>
      </summary>
      <div className="border-t border-border">
        <iframe
          src={SHOP_URL}
          title="CANABLANCA Ticketshop bei Weeztix"
          className="block min-h-[820px] w-full bg-white"
          allow="payment"
          loading="lazy"
        />
        <div className="border-t border-border px-5 py-4 text-center text-sm text-muted-foreground">
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
    </details>
  );
}
