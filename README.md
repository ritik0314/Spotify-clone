# Spotify Clone

A front-end music player project inspired by Spotify, built with plain HTML, CSS, and JavaScript.

This project focuses on a clean streaming-style UI, artist-focused browsing, and in-browser audio playback with controls.

## Overview

The app provides a home dashboard with artist cards and song cards, plus dedicated artist playlist views.
Users can:

- Browse featured artists
- Play songs directly from the home page
- Open artist pages inside the same layout
- Search across artists and songs
- Control playback with play/pause, next/previous, and seek bar

## Features

- Spotify-inspired responsive interface
- Global search with live filtering
- Collapsible song sections (`Show more` / `Show less`)
- Artist navigation in an embedded right panel (`iframe`)
- Artist playlist page with dynamic metadata and track list
- Audio controls include `Play/Pause`, `Next/Previous`, and a progress/seek slider
- Auto-play next track when current track ends
- Visual state updates for currently playing song

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript (no framework)
- Font Awesome (icons)

## Main Pages

- `index.html`: Main app dashboard (library, songs, player controls)
- `artist.html`: Dynamic artist playlist page (`artist` query parameter based)
- `artists-about.html`: Artist spotlight cards with short descriptions
- `artists.html`: Compact all-artists listing page

## How To Run Locally

1. Clone the repository:

```bash
git clone https://github.com/ritik0314/Spotify-clone.git
```

2. Open the project folder in VS Code.
3. Run `index.html` in a browser.

Recommended options:
- Use VS Code Live Server extension for better local file serving.
- Or open `index.html` directly using your browser.

## Project Highlights

- Artist and song metadata are handled through JavaScript objects in `artist.js`.
- Home-page interactions (search, panel switching, and audio player behavior) are managed in `script.js`.
- Styling is separated into `style.css` (main dashboard) and `artist.css` (artist playlist UI)

## Future Improvements

- Add volume controls and mute toggle
- Add playlist queue and shuffle/repeat modes
- Persist last played track with `localStorage`
- Improve accessibility (keyboard-first controls + ARIA labels)
- Integrate a backend/API for dynamic music and artist data

## Author

Ritik Singh Baghel

