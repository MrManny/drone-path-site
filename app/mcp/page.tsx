import type { Metadata } from 'next';
import Link from 'next/link';
import { HeroContourBackdrop } from '../../components/Icons';
import { FaqSection, type FaqItem } from '../../components/Faq';
import { createPageMetadata } from '../../lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'DJI MCP Server for Claude, Cursor & AI Agents',
  description:
    'Free, local Model Context Protocol (MCP) server that lets Claude Desktop, Cursor, and other AI assistants search your DJI drone footage, score shot sharpness, inspect telemetry and frames, and render map overlays.',
  path: '/mcp/',
  ogDescription:
    'Connect Claude Desktop, Cursor, and other MCP clients to local DJI drone recordings with 11 structured tools and strict --allow-root filesystem confinement. No video uploads.',
});

const mcpFaq: FaqItem[] = [
  {
    question: 'What is the Drone Path MCP server?',
    answer:
      'A free, open-source Model Context Protocol server started with npx drone-path mcp. It gives AI assistants such as Claude Desktop and Cursor 11 tools to index, search, score sharpness, and inspect your DJI drone footage and to render flight-path map overlays.',
  },
  {
    question: 'Does my drone footage get uploaded to the AI provider?',
    answer:
      'No. The server runs locally over stdio, so raw video stays on your disk. The assistant only receives the structured results it asks for, such as clip lists, telemetry summaries, or small JPEG keyframes.',
  },
  {
    question: 'Can the AI fly or control my drone?',
    answer:
      'No. Drone Path works only with recorded footage. It reads telemetry from existing video files and has no connection to the drone or controller.',
  },
  {
    question: 'How do I add it to Claude Desktop or Cursor?',
    answer:
      'Add a drone-path entry to the mcpServers section of your client configuration with the command npx and the arguments -y drone-path mcp --allow-root followed by your footage folder. The --allow-root folders are the only places the tools can read or write.',
  },
];

export default function McpPage() {
  return (
    <>
      <section className="hero" aria-labelledby="mcp-heading">
        <HeroContourBackdrop />
        <div className="container hero-grid-single">
          <h1 id="mcp-heading">
            DJI MCP server: let AI assistants search your local drone footage.
          </h1>
          <p className="hero-lead">
            <span className="inline-code">drone-path mcp</span> starts a free, local Model Context Protocol (MCP) server for Claude Desktop, Cursor, and other AI assistants. Agents search your DJI footage by location and shot type, score keyframe and clip-wide sharpness, inspect frames and telemetry, export video editor markers, and render flight-path map videos while raw 4K footage stays on your disk.
          </p>
          <div className="cta-row">
            <a
              href="https://github.com/MrManny/drone-path/blob/main/docs/user/cli.md#mcp-server"
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              MCP docs on GitHub
            </a>
            <Link href="/cli/" className="btn btn-secondary">
              Explore CLI &amp; archive
            </Link>
          </div>
          <div className="hero-command" role="region" aria-label="Start MCP server command">
            <span className="hero-command-prompt" aria-hidden="true">$</span>
            <code>npx drone-path mcp --allow-root /path/to/footage</code>
          </div>
        </div>
      </section>

      <section className="section section-alt" aria-labelledby="workflows-heading">
        <div className="container">
          <div className="section-header">
            <p className="section-kicker">Agent workflows</p>
            <h2 id="workflows-heading">What you can ask an AI assistant to do</h2>
            <p>
              Keep raw 4K video on your disk while Claude Desktop, Cursor, or any MCP client discovers landmarks, ranks your smoothest and sharpest takes, and exports edit-ready timeline markers or map overlays.
            </p>
          </div>

          <div className="card-grid-3">
            <article className="card">
              <h3>Location &amp; gaze discovery</h3>
              <p>
                &ldquo;Scan my trip folder, find every recording whose camera gaze passed over 46.62, 14.31 within 250 m, and summarize the flights.&rdquo;
              </p>
            </article>

            <article className="card">
              <h3>Automated top-shot culling</h3>
              <p>
                &ldquo;List smooth-glide shots with smoothness above 0.85, analyze clip-wide sharpness to find the sharpest windows, extract preview keyframes with sharpness scores, and export DaVinci Resolve timeline markers.&rdquo;
              </p>
            </article>

            <article className="card">
              <h3>Targeted map rendering</h3>
              <p>
                &ldquo;Render a topographic map overlay with speed and altitude HUD for the selected clip&apos;s best segment and save a GPX track beside it.&rdquo;
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="tools-heading">
        <div className="container">
          <div className="section-header">
            <p className="section-kicker">Tool catalog</p>
            <h2 id="tools-heading">Eleven tools exposed over MCP</h2>
            <p>
              Agents can index clips, search by geography or shot kinematics, analyze and query sharpness timelines, inspect telemetry and frames, and produce NLE markers or map renders.
            </p>
          </div>

          <div className="table-scroll" role="region" aria-label="MCP tool catalog" tabIndex={0}>
            <table className="spec-table">
              <caption>Tools available in drone-path mcp</caption>
              <thead>
                <tr>
                  <th scope="col">Tool</th>
                  <th scope="col">Purpose</th>
                  <th scope="col">Key arguments</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row"><code>archive_scan</code></th>
                  <td>Index MP4 folders into the SQLite archive</td>
                  <td><code>dirs</code>, <code>recurse?</code>, <code>prune?</code></td>
                </tr>
                <tr>
                  <th scope="row"><code>archive_list_clips</code></th>
                  <td>List matching indexed clips</td>
                  <td><code>bbox?</code>, <code>after?</code>/<code>afterMs?</code>, <code>before?</code>/<code>beforeMs?</code>, <code>minDistanceM?</code>, <code>availability?</code>, <code>segmentType?</code>, <code>minSmoothness?</code></td>
                </tr>
                <tr>
                  <th scope="row"><code>archive_list_flights</code></th>
                  <td>List matching clips grouped into inferred flights</td>
                  <td>Same filter fields as <code>archive_list_clips</code></td>
                </tr>
                <tr>
                  <th scope="row"><code>archive_find_at_point</code></th>
                  <td>Find clips passing near or viewing a coordinate</td>
                  <td><code>lat</code>, <code>lon</code>, <code>radiusM?</code>, <code>includeGaze?</code></td>
                </tr>
                <tr>
                  <th scope="row"><code>archive_list_segments</code></th>
                  <td>List kinematic shot segments ordered by smoothness</td>
                  <td>Same filter fields as <code>archive_list_clips</code></td>
                </tr>
                <tr>
                  <th scope="row"><code>archive_analyze_sharpness</code></th>
                  <td>Opt in to clip-wide sharpness analysis and cache the timeline in SQLite</td>
                  <td><code>videoPath</code>, <code>mode?</code> (<code>sampled</code> | <code>every-frame</code>), <code>analysisWidth?</code>, <code>minEdgeCoverage?</code>, <code>force?</code></td>
                </tr>
                <tr>
                  <th scope="row"><code>archive_get_sharpness</code></th>
                  <td>Query stored sharpness timelines offline (bounded) or export full NDJSON</td>
                  <td><code>videoPath</code>, <code>mode?</code>, <code>startSec?</code>, <code>endSec?</code>, <code>limit?</code> (1–2000), <code>offset?</code>, <code>outPath?</code></td>
                </tr>
                <tr>
                  <th scope="row"><code>clip_get_telemetry</code></th>
                  <td>Probe a clip and return telemetry summary, shot segments, and sampled track records</td>
                  <td><code>videoPath</code>, <code>includeSamples?</code>, <code>maxSamples?</code> (1–2000)</td>
                </tr>
                <tr>
                  <th scope="row"><code>clip_extract_keyframes</code></th>
                  <td>Extract JPEG keyframes, telemetry snapshots, and optional sharpness scores</td>
                  <td><code>videoPath</code>, <code>at</code> (string or array), <code>maxWidth?</code>, <code>outDir?</code>, <code>sharpness?</code></td>
                </tr>
                <tr>
                  <th scope="row"><code>export_markers</code></th>
                  <td>Write DaVinci Resolve CSV or FCPXML markers from ranges or archive filters</td>
                  <td><code>outputPath</code>, <code>ranges?</code> or <code>filters?</code></td>
                </tr>
                <tr>
                  <th scope="row"><code>render_map_video</code></th>
                  <td>Render flight-path map overlay videos and optional tracks (max 10 inputs per call)</td>
                  <td><code>inputs</code>, <code>style?</code>, <code>view?</code>, <code>zoom?</code>, <code>trailColor?</code>, <code>hud?</code>, <code>codec?</code>, <code>quality?</code>, <code>trackOut?</code>, <code>frameStart?</code>, <code>frameEnd?</code></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section section-alt" aria-labelledby="config-heading">
        <div className="container">
          <div className="section-header">
            <p className="section-kicker">Client setup</p>
            <h2 id="config-heading">Configure your MCP client</h2>
            <p>
              Add Drone Path to any MCP-compatible host (such as Claude Desktop or Cursor) and point <span className="inline-code">--allow-root</span> at the folders containing your DJI recordings. Diagnostics go to <span className="inline-code">stderr</span> with absolute filesystem paths redacted.
            </p>
          </div>

          <div className="card-grid-2">
            <pre className="code-block" aria-label="Sample mcpServers JSON configuration">
              <code>
{`{
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
}`}
              </code>
            </pre>

            <div className="table-scroll" role="region" aria-label="MCP server flags and environment variables" tabIndex={0}>
              <table className="spec-table">
                <caption>Server options and environment variables</caption>
                <thead>
                  <tr>
                    <th scope="col">Option / Env</th>
                    <th scope="col">Requirement</th>
                    <th scope="col">Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row"><code>--allow-root &lt;dir...&gt;</code></th>
                    <td>Required</td>
                    <td>One or more existing directories confining all tool inputs and outputs</td>
                  </tr>
                  <tr>
                    <th scope="row"><code>--archive-db &lt;path&gt;</code></th>
                    <td>Optional</td>
                    <td>Override the default per-user SQLite archive database path</td>
                  </tr>
                  <tr>
                    <th scope="row"><code>DRONE_PATH_MCP_ALLOW_OVERWRITE</code></th>
                    <td>Optional (<span className="inline-code">1</span> / <span className="inline-code">true</span>)</td>
                    <td>Allow <span className="inline-code">export_markers</span> and <span className="inline-code">render_map_video</span> to overwrite existing files</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="security-heading">
        <div className="container">
          <div className="section-header">
            <p className="section-kicker">Safety boundaries</p>
            <h2 id="security-heading">Strict filesystem confinement by design</h2>
            <p>
              Every file and directory argument accepted by an MCP tool is validated before any read, FFmpeg invocation, or file write occurs.
            </p>
          </div>

          <div className="card-grid-2">
            <article className="card">
              <h3>Mandatory --allow-root jail</h3>
              <p>
                You must pass at least one existing directory via <span className="inline-code">--allow-root &lt;dir...&gt;</span>. Each root is resolved canonically via <span className="inline-code">realpath</span>, and every input path, discovered clip, and planned output path is verified inside those roots after resolving symlinks and <span className="inline-code">..</span> segments.
              </p>
            </article>

            <article className="card">
              <h3>Protected state &amp; safe defaults</h3>
              <p>
                Archive queries filter results to clips inside the allowed roots. Tools cannot overwrite the archive SQLite database (or its <span className="inline-code">-wal</span>, <span className="inline-code">-shm</span>, and <span className="inline-code">-journal</span> files), <span className="inline-code">export_markers</span> and <span className="inline-code">render_map_video</span> refuse to overwrite existing files unless <span className="inline-code">DRONE_PATH_MCP_ALLOW_OVERWRITE=1</span> is set, <span className="inline-code">archive_get_sharpness</span> (<span className="inline-code">outPath</span>) never overwrites existing files, and <span className="inline-code">render_map_video</span> caps calls at 10 recordings.
              </p>
            </article>
          </div>
        </div>
      </section>

      <FaqSection id="mcp-faq-heading" items={mcpFaq} alt />
    </>
  );
}
