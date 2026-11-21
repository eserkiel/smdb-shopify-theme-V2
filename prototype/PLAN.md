# Maison Norel – Startseiten-Prototyp (gemeinsamer Plan für alle Agenten)

Basis: `../briefing.md`. Inspiration: `../bilder/inspo/*.png` (Maison Gatoré – NUR Struktur/Anmutung übernehmen, keine Texte, Bilder, Namen oder Logos kopieren).
Ziel: statische Startseite `prototype/index.html`, die später ins Shopify-Theme „Nine“ (Rad) übertragen wird. Sprache: Deutsch.

## Design-Tokens (verbindlich, in `css/layout.css` als CSS-Variablen auf `:root`)
```
--mn-cream:     #F6F0E8   /* Seitenhintergrund */
--mn-ivory:     #FBF8F3   /* Karten/Header */
--mn-stone:     #D9D0C3   /* Flächen, Linien */
--mn-espresso:  #3B2A20   /* Text, Announcement-Bar */
--mn-gold:      #C9A97A   /* Akzent */
--mn-ink:       #1A1613   /* tiefe Flächen (Footer) */
--mn-serif: "Cormorant Garamond", Georgia, serif;   /* Überschriften */
--mn-sans:  "Jost", system-ui, sans-serif;          /* Fließtext, Labels */
```
Google Fonts: Cormorant Garamond (400, 500, 400 italic) + Jost (300, 400, 500).
Labels/Navigation: Versalien, letter-spacing .2em, Jost 400, ~12–13px. Radius: 0. Viel Weißraum.
Breakpoints: Mobil < 750px, Tablet 750–989px, Desktop ≥ 990px. Seitenrand: 16px mobil, 40px desktop. Max-Breite Inhalt 1440px.

## Dateien & Zuständigkeiten (jede Datei hat genau EINEN Besitzer)
| Agent | schreibt NUR |
|---|---|
| Layout | `index.html`, `css/layout.css` |
| Text | `copy/de.json` |
| Bild | `img/*`, `img/MANIFEST.md` |
| Animation | `css/motion.css`, `js/motion.js` |
| Hauptagent (Zusammenbau) | `build.py`, `dist/` |

## Verträge zwischen den Agenten
- **Texte:** Jedes Element mit Text bekommt `data-copy="<key>"` (Layout setzt einen kurzen Platzhalter, der Zusammenbau ersetzt ihn mit dem Wert aus `copy/de.json`). Für Attribute: `data-copy-attr="placeholder:<key>"` bzw. `aria-label:<key>`.
- **Bilder:** `<img src="img/<datei>" ...>` mit genau den Dateinamen unten, immer mit `width`/`height`, `alt` über `data-copy-attr="alt:<key>"`.
- **Animation:** Layout setzt `data-reveal` an Elemente, die einblenden sollen (Werte: `fade`, `up`, `zoom`), `data-reveal-stagger` an Container, deren Kinder versetzt erscheinen, `data-parallax` am Hero-Bild. Header bekommt `id="site-header"` (Animation fügt beim Scrollen `.is-scrolled` hinzu). Layout bindet `css/motion.css` und `js/motion.js` (defer) ein. Ohne JS muss alles sichtbar sein (motion.js setzt `html.js-motion`, erst dann wird versteckt).
- **Mobile Navigation:** Layout baut Burger-Button `#nav-toggle` + Panel `#mobile-nav` inkl. eigenem kleinem Inline-Skript für Öffnen/Schließen (aria-expanded, Escape, Fokus). Animation kümmert sich nicht darum.

## Abschnitte (Reihenfolge, IDs, Bilder, Text-Keys)
0. **Announcement-Bar** `#announcement` – Espresso-Fläche, heller Text, kursiv; 3 rotierende Meldungen (Animation rotiert `.announcement__item`, ohne JS nur die erste).
   Keys: `announcement.1`, `announcement.2`, `announcement.3`
1. **Header** `#site-header` (sticky) – Desktop: Navigation links (4 Links), Logo mittig, rechts Suche/Konto/Warenkorb-Icons (inline SVG, 1.5px Strich). Mobil: Burger links, Logo Mitte, Warenkorb rechts.
   Logo: `img/logo-mn.png` (Monogramm+Schriftzug, transparent, espresso) – Header-Höhe des Logos ~44px desktop / 36px mobil.
   Keys: `nav.duefte`, `nav.flakon`, `nav.haus`, `nav.kontakt`, `nav.search`, `nav.account`, `nav.cart`, `nav.menu`, `nav.close`, `logo.alt`
2. **Hero** `#hero` – Vollbild (min-height 88svh desktop, 78svh mobil), Bild `img/hero.jpg` (Desktop 16:9) und `img/hero-mobile.jpg` (4:5) via `<picture>`. Text unten links auf dezentem Verlauf, hell: Titel (Serif, groß), Unterzeile, Button.
   Keys: `hero.title`, `hero.text`, `hero.cta`, `hero.alt`
3. **Versprechen** `#versprechen` – 4 Spalten (mobil 2×2), je feines Gold-Linien-Icon (inline SVG), Titel (Versalien, Jost 500), 1–2 Zeilen Text.
   Keys: `usp.1.title`, `usp.1.text` … `usp.4.title`, `usp.4.text`
4. **Die Düfte** `#duefte` – Überschrift + kurzer Satz, 3 Produktkarten (mobil horizontal scrollbar, scroll-snap). Karte: Bild 4:5 (`img/duft-1.jpg`, `img/duft-2.jpg`, `img/duft-3.jpg`), Name (Serif), Duftfamilie (Label), Preis „ab …“, Link „Entdecken“. Ein Badge möglich (`duft.2.badge`).
   Keys: `duefte.title`, `duefte.text`, `duft.N.name`, `duft.N.family`, `duft.N.price`, `duft.N.alt`, `duft.2.badge`, `duefte.card_cta`, `duefte.all`
5. **Der Flakon** `#flakon` – Split 50/50: links Bild `img/flakon-detail.jpg` (4:5), rechts Titel, 2 kurze Absätze, Liste mit 3 Merkmalen, Größen-Zeile „30 · 50 · 100 ml“. Zweites kleines Bild `img/flakon-muster.jpg` (1:1) versetzt überlappend (nur Desktop).
   Keys: `flakon.title`, `flakon.text.1`, `flakon.text.2`, `flakon.feature.1..3`, `flakon.sizes`, `flakon.alt`, `flakon.muster.alt`
6. **Über Maison Norel** `#haus` – Stein-Hintergrund (`img/stein-textur.jpg` als Hintergrund), zentriert: Monogramm, großes Zitat/Manifest (Serif kursiv), kurzer Text, Signatur.
   Keys: `haus.title`, `haus.quote`, `haus.text`, `haus.signature`
7. **Stimmen** `#stimmen` – 3 Zitat-Karten (Sterne in Gold, Zitat, Name, „Verifizierte Käuferin/Käufer“). Bis zum Launch als Platzhalter gekennzeichnet.
   Keys: `stimmen.title`, `stimme.N.quote`, `stimme.N.name`, `stimmen.label`
8. **Service** `#service` – 4 Spalten wie Versprechen, kleiner: Versand, Rückgabe, Kundenservice, Sichere Bezahlung.
   Keys: `service.N.title`, `service.N.text` (N=1..4)
9. **Footer** `#kontakt` – Ink-Hintergrund, Creme-Text. 4 Spalten (mobil gestapelt/Accordion optional): Newsletter (Text + E-Mail-Feld + Pfeil-Button), Rechtliches (Impressum, Datenschutz, AGB, Widerrufsrecht, Versand), Service (Kontakt, Versand & Rückgabe, FAQ, Sendungsverfolgung), Kontakt (Adresse-Platzhalter, E-Mail). Unten: Logo hell `img/logo-mn-hell.png`, © Zeile, Social (Instagram, TikTok).
   Keys: `footer.newsletter.title`, `footer.newsletter.text`, `footer.newsletter.placeholder`, `footer.newsletter.button`, `footer.legal.title`, `footer.legal.1..5`, `footer.service.title`, `footer.service.1..4`, `footer.contact.title`, `footer.contact.text`, `footer.contact.email`, `footer.copyright`, `footer.social.instagram`, `footer.social.tiktok`

Zusätzlich: `meta.title`, `meta.description`.

## Bildliste (Bild-Agent; Quellen in `../bilder/`)
| Datei | Quelle | Format |
|---|---|---|
| `img/hero.jpg` | flakon-mit-box.jpg | 16:9, 2400px breit, Flakon rechts im Bild lassen |
| `img/hero-mobile.jpg` | flakon-mit-box.jpg | 4:5, 1080×1350 |
| `img/duft-1.jpg`..`duft-3.jpg` | Flakon-Freisteller/Crops (siehe Hinweis) | 4:5, 1000×1250, einheitlicher Creme-Hintergrund |
| `img/flakon-detail.jpg` | flakon-mit-box.jpg (Nahaufnahme Kappe/Facetten) | 4:5, 1200×1500 |
| `img/flakon-muster.jpg` | flakon-muster-*.jpg (bestes Standbild mit Gold-MN-Druck) | 1:1, 900×900 |
| `img/stein-textur.jpg` | wortmarke-stein.png (Textur ohne Schrift, z. B. Randbereich hochskaliert / Schrift entfernt) | 2000×1200 |
| `img/logo-mn.png` | logo-braun-creme.webp → freigestellt, transparent, espresso #3B2A20 | Höhe ~300px |
| `img/logo-mn-hell.png` | dasselbe in Creme #F6F0E8, transparent | Höhe ~300px |
| `img/monogramm.png` | nur „MN“ ohne Schriftzug, transparent, gold #C9A97A | Höhe ~300px |
WICHTIG: `flakon-varianten.jpg` trägt das Lieferanten-Logo „DERUN GLASS“ – darf auf der Seite NICHT erkennbar erscheinen.
