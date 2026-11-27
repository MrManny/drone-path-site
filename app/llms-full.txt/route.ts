export const dynamic = 'force-static';

const LLMS_FULL_TXT = `# Drone Path — Full Documentation Summary

> Local-first flight-path map overlays, spatial SQLite archive, and stdio Model Context Protocol (MCP) server for DJI drone recordings. MIT-licensed open-source software by Manuel Warum.

Website: https://dronepath.dev/
Repository: https://github.com/MrManny/drone-path
Releases: https://github.com/MrManny/drone-path/releases
Full CLI Manual: https://github.com/MrManny/drone-path/blob/main/docs/user/cli.md

---

## Overview & Telemetry Extraction

Drone Path turns embedded DJI telemetry into synchronized 2D flight-path map overlays at the exact frame rate and frame count of the source recording, without inventing timestamps or interpolating over telemetry dropouts.

- **Embedded CAM meta (DVTM):** Reads DJI's protobuf telemetry stream directly from the MP4 container when present—extracting GPS coordinates, absolute altitude, 3-axis body and gimbal attitude, drone yaw heading, and camera exposure settings per frame.
- **.SRT sidecar telemetry:** Automatically parses an adjacent \`.SRT\` subtitle telemetry file when no embedded CAM meta stream exists, computing heading from the GPS track and breaking lines cleanly across signal gaps.

### Platform Support

- **Desktop app:** Windows (NSIS / portable) and Linux (AppImage). Ships with bundled FFmpeg and FFprobe; video export uses system Google Chrome or Microsoft Edge.
- **CLI & spatial archive:** Windows, Linux, and macOS on Node.js 24 or 26 with bundled FFmpeg & FFprobe.
- **MCP server:** Windows, Linux, and macOS over stdio JSON-RPC 2.0.

### Supported Output & Export Formats

- \`.mp4\`: H.264 or H.265 flight-path map overlay videos matched to source frame rate
- \`.gpx\`: GPX 1.1 flight tracks for mapping and GIS software
- \`.geojson\`: GeoJSON MultiLineString tracks for web maps and spatial scripts
- \`.kml\` / \`.kmz\`: KML 2.2 and compressed KMZ tracks for Google Earth
- \`.json\`: Per-frame telemetry documents covering position, attitude, and exposure (\`telemetry-json.schema.json\`)
- \`.html\`: Standalone offline Leaflet archive maps with optional launch-zone redaction
- \`.csv\`: DaVinci Resolve timeline markers generated from detected shot segments
- \`.fcpxml\`: Final Cut Pro 1.10 XML timeline markers and asset clips

---

## Desktop App (https://dronepath.dev/desktop/)

Archive and synchronized flight-map review player for Windows and Linux:

- **Archive workspace (New in v1.2.0):** Add watched folders (\`File → Open folder…\`) to browse grouped flights on a Canvas-rendered Satellite or Topographic multi-flight map with zoom clustering, lazy poster thumbnails, date/folder/flight/distance/viewport/shot-type/smoothness filters, offline drive badges, **What filmed here?** point-in-view search that jumps straight into Review at the matching second, and combined GPX, GeoJSON, KML, KMZ, or offline HTML map exports with optional launch-area redaction.
- **Split view & Picture-in-Picture (\`P\`):** Play, pause, and frame-by-frame scrubbing drive both footage and map from one timeline without waiting for tile warm-up.
- **Compact readout strip:** Live Speed, Altitude, and Zoom stepper (\`auto-fit\` or pinned levels \`2\`–\`19\`). Fits windows down to \`1024×600\`.
- **In–Out loop marking (\`I\` / \`O\`):** Mark passages on the filmstrip timeline for repeat playback and pre-selected video or telemetry export ranges.
- **Live map appearance preview:** Switch between Satellite (Esri World Imagery) and Topographic (OpenTopoMap) tiles, trail color presets or custom RGBA hex, Overview vs. Follow camera, \`HDG\`/\`ALT\`/\`SPD\` HUD chips, and intro/outro camera easing.
- **Keyboard shortcuts:** \`Space\`/\`K\` (play/pause), \`1\`–\`4\` (1x–4x speed), \`Left\`/\`Right\` (1 frame), \`Shift+Left\`/\`Shift+Right\` (1 second), \`Home\`/\`End\`, \`I\`/\`O\` (in/out), \`Esc\` (close/clear), \`P\` (PiP), \`+\`/\`-\` (zoom 2–19), \`Ctrl+O\` (open), \`Alt\`/\`Alt+F\`/\`Alt+V\`/\`Alt+H\` (menu bar), plus \`Up\`/\`Down\`/\`Enter\` in the Archive list and \`Left\`/\`Right\`/\`Home\`/\`End\` on the **Archive | Review** header tabs.

---

## CLI & Spatial Archive (https://dronepath.dev/cli/)

Quick start:
\`\`\`sh
npx drone-path "my-flight.mp4" --style topo --hud heading,alt,speed
\`\`\`

### Render Examples

\`\`\`sh
# Default render: satellite map, growing trail, writes out/flight_map.mp4
drone-path "flight.mp4"

# Topographic map with heading, altitude, and speed HUD chips + custom RGBA trail
drone-path "flight.mp4" --style topo --hud heading,alt,speed --trail-color "#e63946cc"

# Batch render a folder incrementally with NDJSON machine output
drone-path ./footage --recurse --skip-existing --json
\`\`\`

Options can also live in a \`.dronepath.json\` config file discovered upward from the working directory.

### Selected CLI Flags and Defaults

- \`--out-dir\`, \`--out-suffix\` (defaults: \`out\`, \`_map\`): Output directory and filename suffix (\`<basename>_map.mp4\`)
- \`--width\`, \`--height\` (defaults: \`768\` × \`768\`): Output canvas dimensions in pixels (rounded down to even)
- \`--style\`, \`--trail-color\` (default: \`satellite\`): Map tiles (\`satellite\` or \`topo\`) and RGB/RGBA hex trail color
- \`--view\`, \`--zoom\`, \`--zoom-out\` (defaults: \`follow\`, \`0\`, \`1\`): Camera mode (\`follow\` or \`overview\`), fixed zoom (\`0\` = auto-fit), and pull-back
- \`--hud\` (default: \`heading\`): Comma-separated HUD chips (\`heading,alt,speed\`) or \`none\`
- \`--codec\`, \`--quality\`, \`--preset\` (defaults: \`h264\`, \`high\`, \`medium\`): Encoder (\`h264\`/\`h265\`), quality (\`near-lossless\` to \`low\`), and speed
- \`--track-out <file>\`: Write a flight track alongside the render (\`.gpx\`, \`.geojson\`, \`.kml\`, \`.kmz\`, or \`.json\`)

### Keyframe Extraction & Sharpness Scoring

\`\`\`sh
drone-path extract-frame "flight.mp4" --at 2.5,f90 --max-width 640 --sharpness --json
\`\`\`

Extracts JPEG frames at exact seconds (\`2.5\`) or 0-based frame numbers (\`f90\`) using fast input seeking. With \`--json\`, each entry returns dimensions and the nearest telemetry snapshot (\`lat\`, \`lon\`, \`altRelM\`, \`altAbsM\`, \`speedMps\`, \`headingDeg\`, gimbal angles, ISO, and shutter). Adding \`--sharpness\` scores decoded grayscale luminance via FFmpeg \`blurdetect\` before JPEG encoding (\`sharpnessScore\`, \`edgeCoverage\`, \`analyzer\`).

### Spatial Archive (\`node:sqlite\`)

\`\`\`sh
# 1. Index a footage folder recursively (skips unchanged files and *_map.mp4 outputs)
drone-path archive scan /path/to/footage --recurse --json

# 2. Query clips grouped into inferred flights or ranked by kinematic shot smoothness
drone-path archive list --group-by flight
drone-path archive list --segment-type smooth-glide --min-smoothness 0.8 --json

# 3. Opt in to clip-wide sharpness timeline analysis and query offline
drone-path archive analyze-sharpness "flight.mp4" --json
drone-path archive sharpness "flight.mp4" --start-sec 5 --end-sec 20 --json

# 4. Find clips passing within 250 m of a coordinate or viewing it in camera gaze
drone-path archive near 46.62,14.31 --radius 250 --include-gaze --json

# 5. Export NLE markers, standalone HTML maps, or launch-redacted combined tracks
drone-path archive export-markers shots.csv --segment-type smooth-glide
drone-path archive export-map flights.html --include-gaze --redact-launch 150
drone-path archive export-tracks flights.gpx --redact-launch 150
\`\`\`

- **Kinematic shot segmentation:** Classifies segments into \`takeoff\`, \`landing\`, \`hover\`, \`smooth-glide\`, \`orbit\`, \`gimbal-reveal\`, and \`reposition\` with smoothness scores from 0 to 1.
- **Sharpness timelines:** \`archive analyze-sharpness\` caches FFmpeg \`blurdetect\` scores (\`sampled\` 1/sec or \`every-frame\`) in SQLite; \`archive sharpness\` queries ranges offline or exports full NDJSON timelines.
- **3D camera gaze search:** Projects an approximate 75°×50° ground footprint from DVTM gimbal yaw and attitude.
- **Offline drive tracking:** Remembers indexed clips even when external drives are disconnected (\`offline\` vs. \`online\`).

---

## MCP Server (https://dronepath.dev/mcp/)

Local stdio JSON-RPC 2.0 Model Context Protocol server so raw 4K footage stays on disk.

### Sample Client Configuration

\`\`\`json
{
  "mcpServers": {
    "drone-path": {
      "command": "npx",
      "args": [
        "-y",
        "drone-path",
        "mcp",
        "--allow-root",
        "/path/to/drone-footage"
      ]
    }
  }
}
\`\`\`

### Server Options & Environment Variables

- \`--allow-root <dir...>\` (Required): One or more existing directories confining all tool inputs and outputs (verified canonically via \`realpath\` after resolving symlinks and \`..\` segments)
- \`--archive-db <path>\` (Optional): Override the default per-user SQLite archive database path
- \`DRONE_PATH_MCP_ALLOW_OVERWRITE\` (Optional: \`1\` / \`true\`): Allow \`export_markers\` and \`render_map_video\` to overwrite existing files

### Safety Boundaries

- Archive queries filter results to clips inside the allowed roots.
- Tools cannot overwrite the archive SQLite database (or its \`-wal\`, \`-shm\`, and \`-journal\` files), and \`archive_get_sharpness\` (\`outPath\`) never overwrites existing files.
- \`render_map_video\` caps calls at 10 recordings.
- Diagnostics go to \`stderr\` with absolute filesystem paths redacted.

### Eleven Exposed MCP Tools

1. \`archive_scan\`: Index MP4 folders into the SQLite archive (\`dirs\`, \`recurse?\`, \`prune?\`)
2. \`archive_list_clips\`: List matching indexed clips (\`bbox?\`, \`after?\`/\`afterMs?\`, \`before?\`/\`beforeMs?\`, \`minDistanceM?\`, \`availability?\`, \`segmentType?\`, \`minSmoothness?\`)
3. \`archive_list_flights\`: List matching clips grouped into inferred flights (same filter fields as \`archive_list_clips\`)
4. \`archive_find_at_point\`: Find clips passing near or viewing a coordinate (\`lat\`, \`lon\`, \`radiusM?\`, \`includeGaze?\`)
5. \`archive_list_segments\`: List kinematic shot segments ordered by smoothness (same filter fields as \`archive_list_clips\`)
6. \`archive_analyze_sharpness\`: Opt in to clip-wide sharpness analysis and cache the timeline in SQLite (\`videoPath\`, \`mode?\`, \`analysisWidth?\`, \`minEdgeCoverage?\`, \`force?\`)
7. \`archive_get_sharpness\`: Query stored sharpness timelines offline (bounded) or export full NDJSON (\`videoPath\`, \`mode?\`, \`startSec?\`, \`endSec?\`, \`limit?\`, \`offset?\`, \`outPath?\`)
8. \`clip_get_telemetry\`: Probe a clip and return telemetry summary, shot segments, and sampled track records (\`videoPath\`, \`includeSamples?\`, \`maxSamples?\` 1–2000)
9. \`clip_extract_keyframes\`: Extract JPEG keyframes, telemetry snapshots, and optional sharpness scores (\`videoPath\`, \`at\`, \`maxWidth?\`, \`outDir?\`, \`sharpness?\`)
10. \`export_markers\`: Write DaVinci Resolve CSV or FCPXML markers from explicit ranges or archive filters (\`outputPath\`, \`ranges?\` or \`filters?\`)
11. \`render_map_video\`: Render flight-path map overlay videos and optional tracks, max 10 inputs per call (\`inputs\`, \`style?\`, \`view?\`, \`zoom?\`, \`trailColor?\`, \`hud?\`, \`codec?\`, \`quality?\`, \`trackOut?\`, \`frameStart?\`, \`frameEnd?\`)
`;

export function GET() {
  return new Response(LLMS_FULL_TXT, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
}
