# Ateminsel - Regina Mutzner

Website fuer die Atemtherapie-Praxis von Regina Mutzner in Reinach AG.

**Live:** [jaroszewski.ch/ateminsel](https://jaroszewski.ch/ateminsel/)

## Features

- Mehrsprachig (DE, EN, FR, ES)
- Dark Mode
- Terminbuchung via Cal.com
- Kontaktformular (PHP)
- Kursverwaltung via `kurse.json`
- Responsive Design

## Struktur

```
site/
  index.html          # Redirect auf /de/
  style.css           # Globales Stylesheet
  main.js             # Theme Toggle, Navigation, Kurse
  kontakt.php         # Formular-Backend
  kurse.json          # Kursdaten
  de/                 # Deutsche Version
  en/                 # English
  fr/                 # Francais
  es/                 # Espanol
  img/                # Bilder
original/             # Archiv der alten WordPress-Seite
```

## Deployment

Die Seite wird per FTP auf `jaroszewski.ch/ateminsel/` deployed. Zugangsdaten liegen lokal in `FTP-ZUGANGSDATEN.md` (nicht im Repo).
