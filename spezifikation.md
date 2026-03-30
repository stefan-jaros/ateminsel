# Ateminsel – Spezifikation

Website-Redesign fuer ateminsel.ch (Regina Mutzner, Atemtherapie Middendorf).

## Hosting & Deploy

- **Server**: jaroszewski.ch (Stefan's eigener Server, Plesk/nginx)
- **Pfad**: `httpdocs/ateminsel/`
- **Deploy**: GitHub Actions → FTP (SamKirkland/FTP-Deploy-Action)
  - Trigger: Push auf `main`, nur bei Aenderungen in `site/`
  - Secrets: `FTP_HOST`, `FTP_USER`, `FTP_PASS`
- **Domain**: www.jaroszewski.ch/ateminsel/ (Redirect ohne www → mit www)
- **Status**: `noindex, nofollow` (Testphase)
- **Cache-Buster**: `style.css?v=2` und `main.js?v=5` in allen HTML-Dateien
  - Bei jeder CSS/JS-Aenderung hochzaehlen (iPad Safari cached aggressiv)

## Seitenstruktur (Onepager)

Alle Sprachen haben die gleiche Struktur:

1. **Navigation** – Fixed top, Logo links, Links rechts, Sprachumschalter (DE/EN/FR/ES), Dark Mode Toggle
2. **Hero** – Vollbreites Hintergrundbild mit Zoom-Animation, Titel, Untertitel, 2 CTAs
3. **Zitat** – Blockquote mit Libellen-Logo
4. **Weshalb Atemtherapie** – Flexbox: Text links (max-width 550px) + YouTube-Video rechts (width 390px), darunter 8 Karten-Grid (4×2)
5. **Ueber mich** – Portrait + Text, Zwei-Spalten
6. **Angebot** – Einzeltherapie, Gruppenkurse, Beratung (3 Karten)
7. **Kurse** – Dynamisch aus `kurse.json` geladen
8. **Termin buchen** – Cal.eu Inline-Widget (cal.eu/regina-mutzner/ateminsel)
9. **Kontakt** – Formular + OpenStreetMap-Karte
10. **Karte** – Vollbreite OpenStreetMap (nur DE, EN/FR/ES haben Karte im Kontakt-Bereich)
11. **Footer** – Copyright + Impressum-Link

## Sprachen

| Datei | Sprache | Status |
|-------|---------|--------|
| `de/index.html` | Deutsch | Hauptversion, komplett |
| `en/index.html` | Englisch | Uebersetzt, Video+Layout angeglichen |
| `fr/index.html` | Franzoesisch | Uebersetzt, Video+Layout angeglichen |
| `es/index.html` | Spanisch | Uebersetzt, Video+Layout angeglichen |
| `*/impressum.html` | Alle | Impressum & Datenschutz je Sprache |

Root `index.html` leitet automatisch auf `de/` weiter.

## Technische Details

### Hero-Zoom-Animation
- Staerke: `scale(1.12)`, Dauer: 5s ease-out
- Wechselt bei jedem Seitenaufruf die Richtung (rein/raus) via `localStorage('heroDir')`
- Inline-Script im `<head>` setzt Startposition VOR dem Rendern → kein Reset-Flicker
- Logo-Klick wiederholt Animation in umgekehrter Richtung
- `prefers-reduced-motion` deaktiviert Animation

### Video-Layout (Weshalb-Sektion)
- **Layout**: Flexbox (`display: flex`), nicht Grid (Grid drueckte Video an rechten Rand)
- **Text**: `max-width: 550px`
- **Video**: `width: 390px`, `margin-top: 30px`
- **Gap**: 24px zwischen Text und Video
- **Mobil** (< 600px): Einspaltig, Video volle Breite
- **Video-Quelle**: youtube-nocookie.com/embed/lJjxyA-8mxY (AFS Atem ist Leben)

### Karte (OpenStreetMap)
- Touch-Overlay verhindert ungewolltes Scrollen auf Mobilgeraeten
- Tap aktiviert die Karte, Maus-Verlassen deaktiviert sie wieder
- CSS-Klasse `.active` blendet Overlay aus

### Scrollbar
- Auf `html` und `body` ausgeblendet (`scrollbar-width: none` + `::-webkit-scrollbar`)
- Bei Onepager mit Navigation nicht noetig
- Verhindert stoerenden duennen Strich auf iPad

### Kontaktformular
- PHP-Backend (`kontakt.php`) auf dem Server
- Spam-Schutz: Honeypot-Feld, Zeitpruefung (min. 4s), Rate-Limiting (3/h)
- Empfaenger: stefan@jaroszewski.ch (TODO: auf Regina umstellen)
- Serverseitige Validierung aller Felder

### Kurse (dynamisch)
- Daten in `kurse.json` im Root-Verzeichnis
- JS laedt JSON und rendert Kurs-Karten dynamisch
- Labels (Wann/Wo/Kosten, Plaetze frei/Ausgebucht, Anmelden) in DE/EN/FR/ES uebersetzt
- Kursinhalte bleiben Deutsch (Kurse finden in der Deutschschweiz statt)
- Bei leerer Liste: Hinweis je Sprache ("Momentan sind keine Kurse geplant" etc.)
- basePath wird via `querySelector('link[href*="style.css"]')` ermittelt (nicht erstes Stylesheet, da Google Fonts vorher kommt)

## Dateien

```
site/
├── index.html              # Redirect → de/
├── style.css               # Gesamtes Styling
├── main.js                 # Theme, Navigation, Scroll, Formulare, Kurse, Map-Overlay
├── kurse.json              # Kursdaten (manuell gepflegt)
├── kontakt.php             # Formular-Backend
├── track.php               # Statistik-Tracking (sendBeacon)
├── favicon.ico
├── apple-touch-icon.png
├── robots.txt
├── stats-data/             # Statistik-JSON pro Monat (wird vom Server erstellt)
├── verwaltung-a9afda265c225645/
│   ├── index.html          # Admin-Panel fuer Kurse
│   └── api.php             # Liest/schreibt kurse.json
├── statistik-d9f4b50c25a9c644/
│   └── index.html          # Statistik-Dashboard
├── img/
│   ├── hero-bg.jpg
│   ├── portraet.jpg
│   ├── regina-foto.jpg
│   ├── kontakt-bg.jpg
│   └── libellen-logo.png
├── de/
│   ├── index.html
│   └── impressum.html
├── en/
│   ├── index.html
│   └── impressum.html
├── fr/
│   ├── index.html
│   └── impressum.html
└── es/
    ├── index.html
    └── impressum.html
```

## Responsive Breakpoints

| Breakpoint | Aenderungen |
|------------|-------------|
| > 900px | Desktop-Layout, 4 Karten pro Reihe |
| <= 900px | 2 Karten pro Reihe, Hero zentriert, About einspaltig |
| <= 600px | Mobil: Burger-Menu, 1 Karte pro Reihe, Video unter Text |

## Offene Punkte / Geplant

### Admin-Panel fuer Kurse (umgesetzt)
Regina kann Kurse selbst verwalten ohne FTP/JSON-Kenntnisse.

**URL:** `jaroszewski.ch/ateminsel/verwaltung-a9afda265c225645/`
- Kryptische URL statt Passwort (einfacher fuer Regina, Lesezeichen setzen reicht)
- `noindex, nofollow` im HTML + `robots.txt` schliesst Pfad aus
- Formular zum Erfassen/Bearbeiten/Loeschen von Kursen (max. 3)
- Felder pro Kurs: Titel, Tag, Uhrzeit, Start, Ende, Lektionen, Ort, Kosten, Plaetze frei
- PHP-Backend (`api.php`) liest/schreibt direkt `kurse.json`
- Responsive, funktioniert auf Desktop, Tablet und Handy

### Statistik (umgesetzt)
Besucherstatistik ohne externe Dienste (kein Google Analytics, kein Cookie-Banner noetig).

**URL:** `jaroszewski.ch/ateminsel/statistik-d9f4b50c25a9c644/`
- Tracking via `track.php` + `sendBeacon` beim Verlassen der Seite
- Erfasst: Sprache, gesehene Sektionen (IntersectionObserver, 30% Sichtbarkeit)
- Daten gespeichert als JSON pro Monat in `stats-data/`
- Monatsauswahl, Balkendiagramme, Prozentanzeigen
- Zeigt Scroll-Tiefe: wie viele Besucher sehen welche Sektion
- Keine Cookies, keine personenbezogenen Daten

### Weitere offene Punkte
- [ ] Texte aller Sektionen nochmal durchgehen
- [ ] E-Mail-Empfaenger auf Regina umstellen
- [ ] `noindex` entfernen wenn Seite live geht
- [ ] Domain ateminsel.ch konfigurieren
