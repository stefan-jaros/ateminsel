# Ateminsel - Projektregeln

## Deployment
- Site deployed automatisch via **GitHub Actions** bei Push auf `main` (nur bei Aenderungen in `site/`)
- FTP-Deploy auf jaroszewski.ch/ateminsel/ (SamKirkland/FTP-Deploy-Action)
- **Immer pushen** nach Aenderungen. Niemals manuellen Upload oder Server-Pull vorschlagen.
- Aenderungen sind ca. 1 Minute nach Push live.

## Cache-Buster
- Bei jeder Aenderung an `style.css` oder `main.js` den Cache-Buster Parameter (?v=N) in **allen 4 index.html** (de/en/fr/es) hochzaehlen.
- iPad Safari cached extrem aggressiv. Farbige Debug-Raender (rot/blau/gruen) helfen beim Verifizieren.
- Impressum-Dateien haben ebenfalls Cache-Buster auf CSS und JS.

## Sprachen
- 4 Sprachen: DE (Hauptversion), EN, FR, ES
- Aenderungen immer in **allen 4 Sprachen** umsetzen
- Uebersetzungen sinngemäss, nicht woertlich

## Frontend / Styling
- **Flexbox** bevorzugen, nicht CSS Grid fuer Positionierung (Grid hat bei Video-Layout nicht funktioniert)
- Wenn ein CSS-Ansatz 2x fehlschlaegt, Strategie wechseln
- Keine Gedankenstriche in Texten (wirkt KI-generiert)

## Backend / Server
- Server: Plesk/nginx auf jaroszewski.ch
- **PHP 7.x kompatibel** schreiben. Keine PHP 8+ Features (named arguments, match expressions).
- basePath in main.js: `querySelector('link[href*="style.css"]')` verwenden (nicht erstes Stylesheet, da Google Fonts vorher kommt)

## Schreibstil
- Kein Bla-Bla, keine Floskeln
- Nicht esoterisch, nicht werblich
- Ruhig, klar, hochwertig, serioes
- Keine leeren Begriffe wie "ganzheitlich", "Koerper Geist und Seele", "sanft und nachhaltig"
- Keine Gedankenstriche
- Passend fuer eine echte Praxis-Webseite

## Versteckte Seiten
- Kursverwaltung: `/ateminsel/verwaltung-a9afda265c225645/`
- Statistik: `/ateminsel/statistik-d9f4b50c25a9c644/`
- Beide via robots.txt und noindex ausgeschlossen

## Spezifikation
- Bei groesseren Aenderungen die `spezifikation.md` aktualisieren
- Neue Features, geaenderte Strukturen oder entfernte Elemente dokumentieren

## Git
- Commits immer sofort pushen
- Bei mehreren kleinen Aenderungen: einzeln committen, am Ende auf Wunsch squashen
- User sagt "auf Github zusammenfassen" = Commits squashen
