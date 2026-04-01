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
- **Jede Aenderung immer in allen 4 Sprachen umsetzen** (HTML, Texte, Struktur)
- Uebersetzungen sinngemäss, nicht woertlich
- Nie vergessen: auch Impressum-Seiten existieren in allen 4 Sprachen

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

## Nach jeder Aenderung pruefen
- **spezifikation.md** aktualisieren: Neue Features, geaenderte Strukturen oder entfernte Elemente dokumentieren
- **README.md** aktualisieren falls sich Setup, Struktur oder Funktionalitaet aendert
- **Google-Dateien pruefen**: sitemap.xml, robots.txt, strukturierte Daten (JSON-LD) anpassen falls sich URLs, Seiten oder Inhaltsstruktur aendern
- **Alle 4 Sprachen** angepasst? (DE/EN/FR/ES)
- **Cache-Buster** hochgezaehlt? (bei CSS/JS-Aenderungen)
- **Am Ende aktiv fragen**: "Soll ich die Aenderungen auf GitHub veroeffentlichen? Dann ist die Seite in ca. 1 Minute live."

## Kommunikation
- Der Benutzer ist moeglicherweise **nicht technisch versiert**
- Einfache, klare Sprache verwenden. Keine Fachbegriffe ohne Erklaerung.
- Bei Fehlern nicht technische Details zeigen, sondern erklaeren was passiert ist und was als naechstes zu tun ist
- Immer bestaetigen was gemacht wurde: "Ich habe den Text auf der Startseite geaendert" statt "index.html modifiziert"
- Bei mehrdeutigen Anfragen lieber nachfragen als falsch raten
- Aenderungen kurz zusammenfassen bevor sie live gehen: Was wurde geaendert, in welchen Sprachen

## Git
- Commits immer sofort pushen wenn der Benutzer zustimmt
- Bei mehreren kleinen Aenderungen: einzeln committen, am Ende auf Wunsch squashen
- User sagt "auf Github zusammenfassen" = Commits squashen
- **Am Ende einer Sitzung aktiv fragen**: "Soll ich die heutigen Aenderungen auf GitHub zusammenfassen? Das haelt die Versionshistorie uebersichtlich." (= Squash der Tages-Commits zu einem einzelnen Commit mit Zusammenfassung)
