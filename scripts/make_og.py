"""Draws public/og.png, the 1200x630 card shown when a page is shared.

Run from site/:  python3 scripts/make_og.py
Needs Pillow and two TTF fonts; edit FONT_* if your system keeps them elsewhere.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

FONT_SANS = "/usr/share/fonts/truetype/lato/Lato-Semibold.ttf"
FONT_MONO = "/usr/share/fonts/truetype/liberation/LiberationMono-Regular.ttf"
OUT = Path(__file__).resolve().parent.parent / "public" / "og.png"

BG, FG, MUTED, LINE, ACCENT = "#0a0c0f", "#f1f3f5", "#98a2ad", "#232a31", "#f5a524"
W, H = 1200, 630

img = Image.new("RGB", (W, H), BG)
d = ImageDraw.Draw(img)
for x in range(0, W, 56):
    d.line([(x, 0), (x, H)], fill="#12161b")
for y in range(0, H, 56):
    d.line([(0, y), (W, y)], fill="#12161b")

# diamond mark
cx, cy, r = 96, 96, 22
d.polygon([(cx, cy - r), (cx + r, cy), (cx, cy + r), (cx - r, cy)], fill=ACCENT)
d.text((138, 74), "Claimstone", font=ImageFont.truetype(FONT_SANS, 40), fill=FG)

title = ImageFont.truetype(FONT_SANS, 78)
lines = [("A reading machine that", FG), ("refuses to overstate", ACCENT), ("what it read.", FG)]
y = 190
for text, colour in lines:
    d.text((80, y), text, font=title, fill=colour)
    y += 92

mono = ImageFont.truetype(FONT_MONO, 26)
d.text((80, H - 80), "every claim has a verified quote  ·  open source  ·  Apache-2.0", font=mono, fill=MUTED)

img.save(OUT, optimize=True)
print("wrote", OUT)
