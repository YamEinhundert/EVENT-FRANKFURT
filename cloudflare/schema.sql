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

CREATE TABLE IF NOT EXISTS weeztix_artist (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ticket_datensatz_id TEXT NOT NULL UNIQUE,
  bestell_id TEXT NOT NULL,
  ticketart TEXT NOT NULL,
  ticketname TEXT,
  ticketinhaber_name TEXT NOT NULL,
  ticketinhaber_email TEXT NOT NULL,
  ticketinhaber_telefon TEXT,
  besteller_name TEXT NOT NULL,
  besteller_email TEXT NOT NULL,
  besteller_telefon TEXT,
  zugangscode TEXT,
  bestellstatus TEXT,
  erstellt_am TEXT NOT NULL,
  empfangen_am TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  bestellung_json TEXT NOT NULL,
  ticket_json TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS weeztix_artist_bestell_id_idx
  ON weeztix_artist (bestell_id);

CREATE TABLE IF NOT EXISTS weeztix_aussteller (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ticket_datensatz_id TEXT NOT NULL UNIQUE,
  bestell_id TEXT NOT NULL,
  ticketart TEXT NOT NULL,
  ticketname TEXT,
  ticketinhaber_name TEXT NOT NULL,
  ticketinhaber_email TEXT NOT NULL,
  ticketinhaber_telefon TEXT,
  besteller_name TEXT NOT NULL,
  besteller_email TEXT NOT NULL,
  besteller_telefon TEXT,
  zugangscode TEXT,
  bestellstatus TEXT,
  erstellt_am TEXT NOT NULL,
  empfangen_am TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  bestellung_json TEXT NOT NULL,
  ticket_json TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS weeztix_aussteller_bestell_id_idx
  ON weeztix_aussteller (bestell_id);

CREATE TABLE IF NOT EXISTS weeztix_vip (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ticket_datensatz_id TEXT NOT NULL UNIQUE,
  bestell_id TEXT NOT NULL,
  ticketart TEXT NOT NULL,
  ticketname TEXT,
  ticketinhaber_name TEXT NOT NULL,
  ticketinhaber_email TEXT NOT NULL,
  ticketinhaber_telefon TEXT,
  besteller_name TEXT NOT NULL,
  besteller_email TEXT NOT NULL,
  besteller_telefon TEXT,
  zugangscode TEXT,
  bestellstatus TEXT,
  erstellt_am TEXT NOT NULL,
  empfangen_am TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  bestellung_json TEXT NOT NULL,
  ticket_json TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS weeztix_vip_bestell_id_idx
  ON weeztix_vip (bestell_id);

CREATE TABLE IF NOT EXISTS weeztix_gaesteliste (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ticket_datensatz_id TEXT NOT NULL UNIQUE,
  bestell_id TEXT NOT NULL,
  ticketart TEXT NOT NULL,
  ticketname TEXT,
  ticketinhaber_name TEXT NOT NULL,
  ticketinhaber_email TEXT NOT NULL,
  ticketinhaber_telefon TEXT,
  besteller_name TEXT NOT NULL,
  besteller_email TEXT NOT NULL,
  besteller_telefon TEXT,
  zugangscode TEXT,
  bestellstatus TEXT,
  erstellt_am TEXT NOT NULL,
  empfangen_am TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  bestellung_json TEXT NOT NULL,
  ticket_json TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS weeztix_gaesteliste_bestell_id_idx
  ON weeztix_gaesteliste (bestell_id);

CREATE TABLE IF NOT EXISTS weeztix_sonstige (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ticket_datensatz_id TEXT NOT NULL UNIQUE,
  bestell_id TEXT NOT NULL,
  ticketart TEXT NOT NULL,
  ticketname TEXT,
  ticketinhaber_name TEXT NOT NULL,
  ticketinhaber_email TEXT NOT NULL,
  ticketinhaber_telefon TEXT,
  besteller_name TEXT NOT NULL,
  besteller_email TEXT NOT NULL,
  besteller_telefon TEXT,
  zugangscode TEXT,
  bestellstatus TEXT,
  erstellt_am TEXT NOT NULL,
  empfangen_am TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  bestellung_json TEXT NOT NULL,
  ticket_json TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS weeztix_sonstige_bestell_id_idx
  ON weeztix_sonstige (bestell_id);
