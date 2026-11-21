#!/usr/bin/env python3
"""Setzt die Arbeit der Agenten zu dist/ zusammen.

- Ersetzt Texte in Elementen mit data-copy="key" durch Werte aus copy/de.json
- Setzt Attribute aus data-copy-attr="attr:key[;attr2:key2]"
- <title> und <meta name=description> aus meta.title / meta.description
- Kopiert css/, js/, img/ nach dist/
Meldet fehlende/ungenutzte Keys und fehlende Bilddateien.
"""
import json
import shutil
import sys
from pathlib import Path

from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parent
DIST = ROOT / "dist"


def main() -> int:
    copy = json.loads((ROOT / "copy" / "de.json").read_text(encoding="utf-8"))
    soup = BeautifulSoup((ROOT / "index.html").read_text(encoding="utf-8"), "html.parser")
    used, missing = set(), []

    for el in soup.select("[data-copy]"):
        key = el["data-copy"]
        if key in copy:
            el.string = copy[key]
            used.add(key)
        else:
            missing.append(key)

    for el in soup.select("[data-copy-attr]"):
        for pair in el["data-copy-attr"].split(";"):
            if ":" not in pair:
                continue
            attr, key = (p.strip() for p in pair.split(":", 1))
            if key in copy:
                el[attr] = copy[key]
                used.add(key)
            else:
                missing.append(key)

    if "meta.title" in copy and soup.title:
        soup.title.string = copy["meta.title"]
        used.add("meta.title")
    desc = soup.find("meta", attrs={"name": "description"})
    if "meta.description" in copy:
        if desc is None and soup.head:
            desc = soup.new_tag("meta", attrs={"name": "description"})
            soup.head.append(desc)
        if desc is not None:
            desc["content"] = copy["meta.description"]
            used.add("meta.description")

    if DIST.exists():
        shutil.rmtree(DIST)
    DIST.mkdir()
    for d in ("css", "js", "img"):
        if (ROOT / d).exists():
            shutil.copytree(ROOT / d, DIST / d, ignore=shutil.ignore_patterns("MANIFEST.md"))
    (DIST / "index.html").write_text(str(soup), encoding="utf-8")

    missing_imgs = sorted(
        {
            src
            for tag in soup.select("img[src], source[srcset]")
            for src in [tag.get("src") or tag.get("srcset").split()[0]]
            if not src.startswith(("http", "data:")) and not (DIST / src).exists()
        }
    )
    unused = sorted(set(copy) - used)
    print(f"Texte ersetzt: {len(used)} | fehlende Keys: {sorted(set(missing)) or '-'}")
    print(f"Ungenutzte Keys: {unused or '-'}")
    print(f"Fehlende Bilder: {missing_imgs or '-'}")
    return 1 if (missing or missing_imgs) else 0


if __name__ == "__main__":
    sys.exit(main())
