import { useEffect, useState } from "react";

const EVENT_TIME = new Date("2026-09-12T12:00:00+02:00").getTime();

function remaining() {
  const distance = Math.max(0, EVENT_TIME - Date.now());
  return {
    tage: Math.floor(distance / 86_400_000),
    stunden: Math.floor((distance / 3_600_000) % 24),
    minuten: Math.floor((distance / 60_000) % 60),
    sekunden: Math.floor((distance / 1_000) % 60),
  };
}

export function EventCountdown() {
  const [time, setTime] = useState({ tage: 0, stunden: 0, minuten: 0, sekunden: 0 });

  useEffect(() => {
    setTime(remaining());
    const timer = window.setInterval(() => setTime(remaining()), 1_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="mx-auto mt-10 max-w-2xl" aria-label="Countdown bis CANABLANCA">
      <p className="mb-3 text-xs uppercase tracking-[0.35em] text-primary">Bis CANABLANCA</p>
      <div className="grid grid-cols-4 overflow-hidden rounded-xl border border-primary/50 bg-card/70 backdrop-blur">
        {Object.entries(time).map(([label, value]) => (
          <div key={label} className="border-r border-border px-2 py-4 last:border-r-0 sm:px-5">
            <strong className="block font-display text-3xl leading-none text-primary sm:text-5xl">
              {String(value).padStart(2, "0")}
            </strong>
            <span className="mt-2 block text-[10px] uppercase tracking-wider text-muted-foreground sm:text-xs">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
