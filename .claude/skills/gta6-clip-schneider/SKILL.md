---
name: gta6-clip-schneider
description: Cut clips from GTA 6 videos with ffmpeg — trim a time range, reformat to 9:16 vertical for TikTok/Shorts/Reels, 1:1 or 16:9, or export a GIF. Use when asked to cut, trim, crop or reformat a GTA 6 video clip.
---

# GTA 6 clip cutter

## Ask first (if not given)
1. **Source**: a YouTube URL/ID or an uploaded file.
2. **Range**: start and end, for example `0:15–0:30`.
3. **Format**: 9:16 vertical (default for short-form), 1:1, 16:9 or GIF.

## Getting the source
- An uploaded file is the most reliable route.
- YouTube: `yt-dlp -f "bv*[height<=1080]+ba/b" --merge-output-format mp4 -o src.mp4 URL`, or download only the section: `--download-sections "*0:15-0:30"`.
- Video files come from `*.googlevideo.com`, not `www.youtube.com`. If the proxy blocks those hosts, ask for the file to be uploaded instead. Don't try to get around the block.
- Put downloads in their own new, empty directory in the scratchpad, never in the repo.

## Commands
```bash
# Precise trim (re-encode)
ffmpeg -ss 0:15 -to 0:30 -i src.mp4 -c:v libx264 -crf 18 -preset medium -c:a aac -b:a 192k cut.mp4

# 9:16 vertical, centre crop, 1080x1920
ffmpeg -i cut.mp4 -vf "crop=ih*9/16:ih,scale=1080:1920" -c:v libx264 -crf 18 -c:a copy vertical.mp4

# 9:16 with blurred background (keeps the full 16:9 frame)
ffmpeg -i cut.mp4 -filter_complex "[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,boxblur=20[bg];[0:v]scale=1080:-2[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2" -c:v libx264 -crf 18 -c:a copy vertical_blur.mp4

# GIF (good palette)
ffmpeg -i cut.mp4 -vf "fps=15,scale=540:-1:flags=lanczos,split[a][b];[a]palettegen[p];[b][p]paletteuse" out.gif
```
Check the result with `ffprobe -v error -show_entries stream=width,height,duration -of csv=p=0 FILE`.

## Notes
- Trailer footage belongs to Rockstar. Recommend short clips with commentary or a reaction, or the user's own gameplay. Run the `gta6-regel-check` skill before publishing.
- Hand the finished file to the user and give its full path.
