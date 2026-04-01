# Ateminsel - Regina Mutzner

Website fuer die Atemtherapie-Praxis von Regina Mutzner in Reinach AG.

**Live:** [jaroszewski.ch/ateminsel](https://jaroszewski.ch/ateminsel/)

## Features

- Mehrsprachig (DE, EN, FR, ES)
- Dark Mode
- Terminbuchung via Cal.com
- Kontaktformular (PHP)
- Kursverwaltung (Admin-Panel)
- Besucherstatistik (eigenes Tracking, keine Cookies)
- SEO vorbereitet (OG-Tags, JSON-LD, Hreflang, Sitemap)
- Responsive Design

## Struktur

```
site/
  index.html          # Redirect auf /de/
  style.css           # Globales Stylesheet
  main.js             # Theme Toggle, Navigation, Kurse
  kontakt.php         # Formular-Backend
  kurse.json          # Kursdaten
  sitemap.xml         # SEO Sitemap
  robots.txt          # Crawling-Regeln
  de/                 # Deutsche Version
  en/                 # English
  fr/                 # Francais
  es/                 # Espanol
  img/                # Bilder (inkl. og-image.jpg fuer Social Sharing)
original/             # Archiv der alten WordPress-Seite
```

## Deployment

Automatisch via GitHub Actions bei Push auf `main` (nur bei Aenderungen in `site/`). FTP-Deploy auf `jaroszewski.ch/ateminsel/`.

## Anleitung fuer die Bearbeitung

Die Webseite wird ueber Claude Code bearbeitet. Einfach in normaler Sprache sagen was geaendert werden soll. Claude uebernimmt alles Technische automatisch.

### So geht's

1. Claude Code oeffnen (im Terminal: `claude` eingeben)
2. Beschreiben was geaendert werden soll
3. Claude fragt am Ende ob die Aenderungen veroeffentlicht werden sollen
4. Mit "ja" bestaetigen, die Seite ist dann in ca. 1 Minute live

### Beispiele was man sagen kann

**Texte aendern:**
- "Aendere die Telefonnummer auf 079 123 45 67"
- "Der neue Praxisname ist Ateminsel Reinach"
- "Ersetze den Text unter Ueber mich mit: ..."

**Kurse:**
- "Fuege einen neuen Kurs hinzu: Atemkurs Mittwoch 18:00 bis 19:00"
- "Loesche den Kurs am Donnerstag"
- "Aendere die Uhrzeit vom Montagskurs auf 17:30"

**Bilder:**
- "Tausche das Foto auf der Startseite aus" (Bild muss im img-Ordner liegen)

**Sonstiges:**
- "Aendere die Oeffnungszeiten auf Mo-Fr 9-17 Uhr"
- "Fuege eine neue E-Mail-Adresse ins Kontaktformular ein"

### Wichtig

- Aenderungen werden immer in allen 4 Sprachen (DE, EN, FR, ES) gemacht
- Am Ende einer Sitzung fragt Claude ob die Versionen zusammengefasst werden sollen, das mit "ja" bestaetigen
