export const dynamic = 'force-static';

const LLMS_TXT = `# Drone Path

> Local-first flight-path map overlays, spatial SQLite archive, and stdio Model Context Protocol (MCP) server for DJI drone recordings. MIT-licensed open-source software by Manuel Warum.

Drone Path decodes embedded DJI CAM meta (DVTM protobuf) and \`.SRT\` sidecar telemetry directly from MP4 recordings without inventing timestamps or interpolating over signal dropouts. Every exported map video matches the source recording's exact frame count and frame rate.

- **Latest highlighted release:** v1.2.0 (Desktop Archive workspace with multi-flight map and "What filmed here?" search, FFmpeg \`blurdetect\` keyframe & clip-wide sharpness scoring, and 11 MCP tools)
- **Quick start (CLI):** \`npx drone-path "my-flight.mp4"\`
- **Quick start (MCP):** \`npx drone-path mcp --allow-root /path/to/footage\`

## Site Pages

- [Overview](https://dronepath.dev/): Project overview, Desktop Archive spotlight, DJI telemetry extraction (DVTM and \`.SRT\`), map rendering styles, supported export formats, and release highlights.
- [Desktop app](https://dronepath.dev/desktop/): Electron app for Windows (NSIS / portable) and Linux (AppImage) featuring the Archive workspace (watched folders, multi-flight map, "What filmed here?", shot filters, combined exports) and synchronized Review workspace (split/PiP playback, In–Out loops, live map appearance preview, video/track export).
- [CLI & spatial archive](https://dronepath.dev/cli/): Command-line reference for Windows, Linux, and macOS (Node.js 24 or 26) covering batch map rendering, track exports, keyframe extraction with \`--sharpness\`, clip-wide sharpness timelines, and the \`node:sqlite\` spatial archive.
- [MCP server](https://dronepath.dev/mcp/): Root-confined stdio JSON-RPC 2.0 Model Context Protocol server exposing 11 structured tools for AI agents (Claude Desktop, Cursor, and other MCP hosts).

## Machine-Readable & Source Links

- [Full plain-text documentation](https://dronepath.dev/llms-full.txt): Consolidated Markdown reference of Desktop Archive features, CLI flags, archive commands, MCP configuration, and all 11 MCP tools.
- [Sitemap](https://dronepath.dev/sitemap.xml): XML sitemap of all pages and screenshots.
- [GitHub repository](https://github.com/MrManny/drone-path): Source code, issue tracker, and full CLI manual (\`docs/user/cli.md\`).
- [Releases](https://github.com/MrManny/drone-path/releases): Packaged desktop downloads and release notes.
`;

export function GET() {
  return new Response(LLMS_TXT, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
}
