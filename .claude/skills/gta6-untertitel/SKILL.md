---
name: gta6-untertitel
description: Subtitles for GTA 6 clips — download existing YouTube subtitles (.srt/.vtt), translate them (e.g. EN↔DE), or burn styled subtitles into a clip with ffmpeg for Shorts/TikTok/Reels. Use when asked for subtitles, captions-in-video or Untertitel.
---

# GTA 6 subtitles

## Ask first (if not given)
Which video or clip, and which task: download, translate or burn in. For burn-in, also ask the style (for example big centred words for short-form).

## Download existing subtitles
```bash
yt-dlp --skip-download --list-subs URL
yt-dlp --skip-download --write-subs --write-auto-subs --sub-langs "en,de" --convert-subs srt -o "subs" URL
```
Subtitles come from `www.youtube.com`, so they usually work even when video downloads are blocked. Official trailers often have no subtitles, or only auto-generated ones. Say which kind you got.

## Translate
Translate the `.srt` text block by block. Keep every index and timestamp unchanged. Keep names and places as in the game (Vice City, Leonida, Lucia, Jason).

## Write subtitles yourself
When the user gives text and times, write a valid `.srt` file:
```
1
00:00:00,000 --> 00:00:02,000
First line
```

## Burn in
```bash
# Short-form style: bold, white with black outline, a bit above the bottom
ffmpeg -i clip.mp4 -vf "subtitles=subs.srt:force_style='FontName=DejaVu Sans,FontSize=14,Bold=1,PrimaryColour=&H00FFFFFF,OutlineColour=&H00000000,BorderStyle=1,Outline=3,Alignment=2,MarginV=60'" -c:v libx264 -crf 18 -c:a copy subbed.mp4
```
For a 1080x1920 clip, check legibility with a frame grab: `ffmpeg -ss 1 -i subbed.mp4 -frames:v 1 check.png`, then look at it.

Give the user the full path of every file you produce.
