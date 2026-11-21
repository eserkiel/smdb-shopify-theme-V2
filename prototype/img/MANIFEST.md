# Bild-Manifest – Startseiten-Prototyp Maison Norel

Alle JPGs: sRGB, progressiv, Qualität 82, Metadaten entfernt (`-strip`). PNGs: RGBA, transparent.
Quellen: `../../bilder/`. Arbeitsskripte lagen im Scratchpad des Bild-Agenten (nicht Teil des Projekts).

| Datei | Quelle | Zuschnitt / Bearbeitung | Maße | Größe | Hinweise |
|---|---|---|---|---|---|
| `hero.jpg` | flakon-mit-box.jpg | Leinwand links um 560 px erweitert (Wand-/Steinverlauf aus dem linken Bildrand fortgesetzt, synthetische Körnung, weicher Übergang), dann 16:9-Ausschnitt y 145–1165, auf 2400 px hochskaliert (Lanczos + leichtes Schärfen). Flakon rechts, komplett mit Kappe; linkes Drittel ruhig für Text. | 2400×1350 | 273 KB | Quelle nur 1254 px breit, also etwa 1,9-fach hochskaliert: auf großen Monitoren leicht weich. Die linke Erweiterung ist eine Retusche und kein echtes Foto; bei genauem Hinsehen ist die Steinkante dort gleichförmiger. Für Text links einen leichten Creme-/Dunkel-Verlauf per CSS darüberlegen. |
| `hero-mobile.jpg` | flakon-mit-box.jpg | 4:5-Ausschnitt x 232–1196, y 30–1235 (Box-Schriftzug „EAU DE PARFUM“ bleibt vollständig), auf 1080×1350 skaliert (1,12×). | 1080×1350 | 151 KB | Gute Qualität. Flakon mittig-rechts, oben Luft für Logo/Navigation. |
| `duft-1.jpg` | flakon-mit-box.jpg | Flakon per Hand-Maske freigestellt (Kugel, Hals, facettierter Körper, Kante 1,2 px weich), leicht warm abgestimmt, auf Creme `#F3ECE3` mit leichtem Verlauf und weichem Kontaktschatten. Variante **Champagner** (Originalton). | 1000×1250 | 66 KB | Platzhalter, keine echten Produktfotos. Durch das Glas sieht man noch die grauen Töne des Originalhintergrunds (Box/Wand), wirkt aber als Glasreflex. Auf dem Flakon steht „EAU DE PARFUM 50ml“ und kein Duftname. |
| `duft-2.jpg` | wie duft-1 | gleiche Freistellung; Körper (nicht die Kappe) in **Bernstein** umgefärbt (Luminanz → Bernsteinton, Glanzlichter erhalten). | 1000×1250 | 71 KB | Farbvariante per Bildbearbeitung erzeugt, kein echter Bernsteinflakon. |
| `duft-3.jpg` | wie duft-1 | gleiche Freistellung; Körper entsättigt und aufgehellt als Variante **klar** (Glas ohne Tönung). | 1000×1250 | 63 KB | Erzeugte Variante; wirkt etwas silbrig/kühl. |
| `flakon-detail.jpg` | flakon-mit-box.jpg | Ausschnitt x 545–1065, y 190–840: Kugelkappe vollständig, Kragen, Schulterfacetten, Etikett „EAU DE PARFUM“, auf 1200×1500 hochskaliert (≈2,3×) + Schärfen. | 1200×1500 | 139 KB | Durch die starke Vergrößerung sichtbar weich; nicht größer als etwa 600 CSS-px anzeigen. Ein echtes Makrofoto ist nötig. |
| `flakon-muster.jpg` | flakon-muster-3s.jpg | 1:1-Ausschnitt x 445–915, y 150–620 (Flakon in der Hand vor Holztür), auf 900×900 hochskaliert (≈1,9×). Kleiner Goldrest des Fremd-Drucks am linken Glasrand wegretuschiert. | 900×900 | 69 KB | **Wichtig:** Die Muster-Standbilder zeigen **keinen MN-Druck**, sondern den Fremd-Aufdruck „DR parfume“ (Goldrahmen, Initialen DR, Flammen-/Flügel-Emblem). Deshalb wurde das Bild aus Sekunde 3 genommen: Rückansicht, der Druck ist dort nicht lesbar. Eine Retusche von „DR“ zu „MN“ wurde versucht und verworfen, weil sie sichtbar unecht wirkte. Handyfoto aus einem Video (720p): weich, warmes Kunstlicht. Bildtext auf der Seite nicht mit „MN-Druck“ betiteln, sondern z. B. „Erstes Muster“. |
| `stein-textur.jpg` | wortmarke-stein.png | Schriftfreie Bereiche oben (y 8–360) und unten (y 615–1016) verwendet, mit weichem Übergang von 80 px gestapelt, großflächige Helligkeit ausgeglichen, auf 2000 px Breite hochskaliert (≈1,95×), Mitte auf 1200 px Höhe beschnitten. | 2000×1200 | 279 KB | Keine Schrift enthalten. Durch die Vergrößerung weich, als Hintergrundfläche aber passend. Mittlerer Ton ≈ `#C0B4A4`. |
| `logo-mn.png` | logo-braun-creme.webp | Hintergrund über die Luminanz entfernt (Rampe zwischen Creme und Tinte, Smoothstep, weiche Kanten), auf den Inhalt beschnitten (Monogramm + Schriftzug), auf 300 px Höhe skaliert, 6 px Rand. Volltonfarbe `#3B2A20` + Alpha. | 882×312 | 34 KB | Auf Creme und Fast-Schwarz geprüft: keine Säume, Haarlinien erhalten. Die Pixel-Vorlage stammt aus einem Bitmap-Logo; für die Live-Seite besser ein echtes SVG (Vektor-Nachzeichnung) einsetzen. |
| `logo-mn-hell.png` | logo-braun-creme.webp | wie oben, Farbe `#F6F0E8` | 882×312 | 34 KB | Für dunkle Flächen und über dem Hero. |
| `monogramm.png` | logo-braun-creme.webp | nur das MN-Monogramm (Zeilen oberhalb des Schriftzugs, y 181–520 im Original), Farbe `#C9A97A`, 300 px Höhe + 6 px Rand | 456×312 | 19 KB | Auf hellem und dunklem Grund geprüft. |

## Nicht verwendet
- `flakon-varianten.jpg`: nicht verwendet. Das Lieferanten-Logo „DERUN GLASS“ steht groß im Bild und auf allen drei Flakons, dazu Marmor- und Deko-Hintergrund. Es ließ sich nicht sicher und sauber entfernen.
- `logo-schwarz.webp`, `logo-champagner.webp`: nicht nötig. Die braun-creme-Vorlage hat feinere Haarlinien und einen gleichmäßigen Hintergrund.

## Was noch gebraucht wird (Profi-Fotos)
1. **Produktfotos je Duft** (freigestellt oder auf einheitlichem Creme-Hintergrund, mindestens 2000 px hoch) mit dem finalen Flakon, MN-Druck und Duftnamen. Sie ersetzen `duft-1..3.jpg`, die nur Platzhalter sind.
2. **Hero-Motiv im Querformat** (mindestens 3000 px breit), mit Freiraum links für Text, ohne die Erweiterungs-Retusche.
3. **Makro-Detail** von Kappe und Facetten (ersetzt `flakon-detail.jpg`).
4. **Foto des echten MN-Golddrucks** auf dem Glas. Bisher gibt es keins, denn das Muster trägt den Druck „DR parfume“.
5. Optional: Fotos der Glasfarben (klar, schwarz, bernstein) mit eigenem Branding statt der DERUN-GLASS-Lieferantenbilder.
6. Logo als **SVG**.
