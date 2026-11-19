# Zepei Lin — Robotics

Personal website featuring the MSRA robotic server-handling project.

- `index.html`: biography, the featured project, and education.
- `server-robot.html`: demonstration and technical explanation.
- `demo.js`: sequential playback and timestamp navigation.
- `assets/video/`: MP4 segments and playback manifest.
- `CONTENT_NOTES.md`: content attribution and media provenance.

The demo preserves the original HEVC video and AAC audio streams without
re-encoding. Segments stay below GitHub's single-file limit. HEVC playback
requires a compatible browser or media player.

Serve over HTTP for local preview; the video manifest is loaded with `fetch`.
The site uses relative asset paths and can be deployed from the repository root
with GitHub Pages. No build step is required.
 a personal website
