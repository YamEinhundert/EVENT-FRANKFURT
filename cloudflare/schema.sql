CREATE TABLE IF NOT EXISTS anmeldungen (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  anmeldeart TEXT NOT NULL CHECK (anmeldeart IN ('artist', 'aussteller', 'vip', 'gaesteliste')),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  telefon TEXT NOT NULL,
  zugangscode TEXT,
  crew_anzahl INTEGER,
  erstellt_am TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS anmeldungen_erstellt_am_idx
  ON anmeldungen (erstellt_am DESC);

CREATE INDEX IF NOT EXISTS anmeldungen_zugangscode_idx
  ON anmeldungen (zugangscode);
