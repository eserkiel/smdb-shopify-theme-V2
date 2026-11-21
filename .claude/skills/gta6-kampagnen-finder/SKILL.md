---
name: gta6-kampagnen-finder
description: Find GTA 6 (Grand Theft Auto VI) video campaigns on YouTube — official Rockstar trailers, regional uploads, platform/partner campaigns (PlayStation, NBA 2K crossovers), creator promos and coverage of the marketing. Use when asked to find, list or track GTA 6 campaign videos, trailers or ads.
---

# GTA 6 campaign finder

Search YouTube with yt-dlp and sort the results into official, partner and fan content.

## Requirements
- `yt-dlp` (`pip install -q yt-dlp` if `yt-dlp --version` fails).
- Network access to `www.youtube.com`. In a cloud session, a proxy 403 means the host must be added to the environment's allowed hosts.

## Steps
1. Work in the scratchpad (or a temp dir), never inside the repo.
2. Run several searches (12 results each is enough):
   ```bash
   for q in "GTA 6 official trailer Rockstar" "GTA VI marketing campaign" "GTA 6 ad commercial" "GTA 6 promo"; do
     echo "=== $q"
     yt-dlp --flat-playlist --print "%(id)s|%(title)s|%(channel)s|%(view_count)s|%(duration)s" "ytsearch12:$q" 2>&1 | grep -v WARNING
   done | tee results.txt
   ```
3. List Rockstar's own channel (the most reliable source for official material):
   ```bash
   yt-dlp --flat-playlist --print "%(id)s|%(title)s|%(view_count)s" "https://www.youtube.com/@RockstarGames/videos" -I 1:30
   ```
4. Get upload dates for the important videos (metadata only):
   ```bash
   yt-dlp --skip-download --ignore-no-formats-error --print "%(id)s|%(upload_date)s|%(title)s" "https://www.youtube.com/watch?v=ID"
   ```
5. Deduplicate by video ID and sort into groups:
   - **Official Rockstar** (channel "Rockstar Games" and its regional channels), in date order.
   - **Partners and platforms** (PlayStation, Xbox, IGN-hosted crossovers, TV spots).
   - **Creator promos** (streamer events; say they are not Rockstar ads).
   - **Coverage of the marketing** (creators analysing the campaign).
   - **Probably not official**: fan "Trailer 3" concepts, fan "TV commercials", fan sites. Judge by the channel, and say that it is a judgement.

## Output
A table per group: date, linked title (`https://youtu.be/ID`), views. Give view counts as of today. Never present a fan video as official. Leave a date blank rather than guessing it. Save the raw results and give their path.
