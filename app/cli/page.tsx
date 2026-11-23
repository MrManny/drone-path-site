import type { Metadata } from 'next';
import Link from 'next/link';
import { HeroContourBackdrop } from '../../components/Icons';
import { createPageMetadata } from '../../lib/metadata';
import { TerminalDemo, type TerminalExample } from './TerminalDemo';
import styles from './page.module.css';

export const metadata: Metadata = createPageMetadata({
  title: 'CLI & spatial archive',
  description:
    'Command-line reference for drone-path: batch map video rendering, GPX/GeoJSON/KML/JSON track export, fast keyframe extraction, and the local SQLite spatial archive.',
  path: '/cli/',
  ogDescription:
    'Render flight-path map overlays, extract keyframes with telemetry snapshots, search recordings by coordinates or camera gaze, and export NLE markers.',
  image: {
    url: '/images/example-map-topo-hud.jpg',
    width: 768,
    height: 768,
    alt: 'Rendered topographic map video frame with heading, altitude, and speed HUD readout chips along the bottom',
  },
});

const quickStart: TerminalExample[] = [
  {
    command: 'npx drone-path "my-flight.mp4" --style topo --hud heading,alt,speed',
    processing: 'Reading DJI telemetry and rendering map frames…',
    result: 'Wrote out/my-flight_map.mp4',
  },
];

const renderExamples: TerminalExample[] = [
  {
    note: 'Satellite map with a growing trail',
    command: 'drone-path "flight.mp4"',
    processing: 'Rendering satellite map frames…',
    result: 'Wrote out/flight_map.mp4',
  },
  {
    note: 'Topographic map with HUD chips and a custom trail color',
    command: 'drone-path "flight.mp4" --style topo --hud heading,alt,speed --trail-color "#e63946cc"',
    processing: 'Rendering topographic map and HUD…',
    result: 'Wrote out/flight_map.mp4',
  },
  {
    note: 'Incremental batch render with NDJSON output',
    command: 'drone-path ./footage --recurse --skip-existing --json',
    processing: 'Scanning footage and rendering new clips…',
    result: 'Batch render complete',
  },
];

const keyframeExample: TerminalExample[] = [
  {
    command: 'drone-path extract-frame "flight.mp4" --at 2.5,f90 --max-width 640 --json',
    processing: 'Seeking to 2.5 s and frame 90…',
    result: 'Extracted 2 JPEGs with telemetry snapshots',
  },
];

const archiveExamples: TerminalExample[] = [
  {
    note: 'Index footage recursively, skipping unchanged files and *_map.mp4 outputs',
    command: 'drone-path archive scan /path/to/footage --recurse --json',
    processing: 'Reading telemetry from new and changed clips…',
    result: 'Archive index updated',
  },
  {
    note: 'Group clips into inferred flights',
    command: 'drone-path archive list --group-by flight',
    processing: 'Grouping clips by flight…',
    result: 'Found 3 flights',
  },
  {
    note: 'Find smooth-glide shots',
    command: 'drone-path archive list --segment-type smooth-glide --min-smoothness 0.8 --json',
    processing: 'Filtering shots by type and smoothness…',
    result: 'Found 5 matching shots',
  },
  {
    note: 'Find clips that passed near or looked toward a coordinate',
    command: 'drone-path archive near 46.62,14.31 --radius 250 --include-gaze --json',
    processing: 'Checking flight tracks and camera footprints…',
    result: 'Found 4 matching clips',
  },
  {
    note: 'Export editor markers',
    command: 'drone-path archive export-markers shots.csv --segment-type smooth-glide',
    processing: 'Collecting smooth-glide segments…',
    result: 'Wrote shots.csv',
  },
  {
    note: 'Export a standalone map with camera gaze and launch redaction',
    command: 'drone-path archive export-map flights.html --include-gaze --redact-launch 150',
    processing: 'Building map and redacting launch zones…',
    result: 'Wrote flights.html',
  },
  {
    note: 'Export combined tracks with launch redaction',
    command: 'drone-path archive export-tracks flights.gpx --redact-launch 150',
    processing: 'Combining tracks and redacting launch zones…',
    result: 'Wrote flights.gpx',
  },
];

export default function CliPage() {
  return (
    <>
      <section className="hero" aria-labelledby="cli-heading">
        <HeroContourBackdrop />
        <div className="container hero-grid-single">
          <h1 id="cli-heading">
            Scriptable rendering, track exports, and spatial library search.
          </h1>
          <p className="hero-lead">
            The <span className="inline-code">drone-path</span> CLI powers batch video rendering, targeted keyframe extraction, deterministic track exports, and a local <span className="inline-code">node:sqlite</span> archive that lets you query hours of DJI footage in milliseconds.
          </p>
          <div className="cta-row">
            <a
              href="https://github.com/MrManny/drone-path/blob/main/docs/user/cli.md"
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Full CLI manual on GitHub
            </a>
            <Link href="/mcp/" className="btn btn-secondary">
              Expose tools via MCP
            </Link>
          </div>
          <TerminalDemo label="Run CLI with npx" examples={quickStart} />
        </div>
      </section>

      <section className="section section-alt" aria-labelledby="render-heading">
        <div className="container">
          <div className="section-header">
            <p className="section-kicker">Map video rendering</p>
            <h2 id="render-heading">Render flight-path overlays in batch or single runs</h2>
            <p>
              Pass individual <span className="inline-code">.mp4</span> files or folders (with <span className="inline-code">--recurse</span>). Options can also live in a <span className="inline-code">.dronepath.json</span> config file discovered upward from the working directory.
            </p>
          </div>

          <div className={styles.demoSpacing}>
            <TerminalDemo label="CLI render examples" examples={renderExamples} />
          </div>

          <div className="table-scroll" role="region" aria-label="Common CLI render options" tabIndex={0}>
            <table className="spec-table">
              <caption>Selected CLI flags and defaults (run npx drone-path --help for all options)</caption>
              <thead>
                <tr>
                  <th scope="col">CLI flag</th>
                  <th scope="col">Default</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row"><code>--out-dir</code>, <code>--out-suffix</code></th>
                  <td><code>out</code>, <code>_map</code></td>
                  <td>Output directory and filename suffix (<span className="inline-code">&lt;basename&gt;_map.mp4</span>)</td>
                </tr>
                <tr>
                  <th scope="row"><code>--width</code>, <code>--height</code></th>
                  <td><code>768</code> × <code>768</code></td>
                  <td>Output canvas dimensions in pixels (rounded down to even)</td>
                </tr>
                <tr>
                  <th scope="row"><code>--style</code>, <code>--trail-color</code></th>
                  <td><code>satellite</code></td>
                  <td>Map tiles (<span className="inline-code">satellite</span> or <span className="inline-code">topo</span>) and RGB/RGBA hex trail color</td>
                </tr>
                <tr>
                  <th scope="row"><code>--view</code>, <code>--zoom</code>, <code>--zoom-out</code></th>
                  <td><code>follow</code>, <code>0</code>, <code>1</code></td>
                  <td>Camera mode (<span className="inline-code">follow</span> or <span className="inline-code">overview</span>), fixed zoom (<span className="inline-code">0</span> = auto-fit), and pull-back</td>
                </tr>
                <tr>
                  <th scope="row"><code>--hud</code></th>
                  <td><code>heading</code></td>
                  <td>Comma-separated HUD chips (<span className="inline-code">heading,alt,speed</span>) or <span className="inline-code">none</span></td>
                </tr>
                <tr>
                  <th scope="row"><code>--codec</code>, <code>--quality</code>, <code>--preset</code></th>
                  <td><code>h264</code>, <code>high</code>, <code>medium</code></td>
                  <td>Encoder (<span className="inline-code">h264</span>/<span className="inline-code">h265</span>), quality (<span className="inline-code">near-lossless</span> to <span className="inline-code">low</span>), and speed</td>
                </tr>
                <tr>
                  <th scope="row"><code>--track-out &lt;file&gt;</code></th>
                  <td>—</td>
                  <td>Write a flight track alongside the render (<span className="inline-code">.gpx</span>, <span className="inline-code">.geojson</span>, <span className="inline-code">.kml</span>, <span className="inline-code">.kmz</span>, or <span className="inline-code">.json</span>)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="tracks-heading">
        <div className="container">
          <div className="section-header">
            <p className="section-kicker">Tracks &amp; keyframes</p>
            <h2 id="tracks-heading">Truthful track exports and fast keyframe extraction</h2>
            <p>
              Track vertices sit only at decoded GPS fixes—telemetry gaps break lines into separate segments, altitude uses absolute GPS meters above mean sea level, and timestamps are never invented.
            </p>
          </div>

          <div className="card-grid-2">
            <div className="table-scroll" role="region" aria-label="Track export formats" tabIndex={0}>
              <table className="spec-table">
                <caption>Formats selected by --track-out extension</caption>
                <thead>
                  <tr>
                    <th scope="col">Extension</th>
                    <th scope="col">Format</th>
                    <th scope="col">Best used in</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row"><code>.gpx</code></th>
                    <td>GPX 1.1 track</td>
                    <td>Google Earth, QGIS, mapping tools</td>
                  </tr>
                  <tr>
                    <th scope="row"><code>.geojson</code></th>
                    <td>GeoJSON MultiLineString</td>
                    <td>QGIS, web maps, spatial scripts</td>
                  </tr>
                  <tr>
                    <th scope="row"><code>.kml</code> / <code>.kmz</code></th>
                    <td>KML 2.2 / zipped KML</td>
                    <td>Google Earth</td>
                  </tr>
                  <tr>
                    <th scope="row"><code>.json</code></th>
                    <td>Per-frame telemetry document</td>
                    <td>Downstream analysis (<span className="inline-code">telemetry-json.schema.json</span>)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="card">
              <h3>Extract targeted keyframes</h3>
              <p>
                Pull JPEG frames at exact seconds (<span className="inline-code">2.5</span>) or 0-based frame numbers (<span className="inline-code">f90</span>) using fast input seeking without decoding preceding GOPs. With <span className="inline-code">--json</span>, each entry returns dimensions and the nearest telemetry snapshot (<span className="inline-code">lat</span>, <span className="inline-code">lon</span>, <span className="inline-code">altRelM</span>, <span className="inline-code">altAbsM</span>, <span className="inline-code">speedMps</span>, <span className="inline-code">headingDeg</span>, gimbal angles, ISO, and shutter).
              </p>
              <TerminalDemo label="Extract keyframes example" examples={keyframeExample} />
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt" aria-labelledby="archive-heading">
        <div className="container">
          <div className="section-header">
            <p className="section-kicker">Spatial archive</p>
            <h2 id="archive-heading">Index, search, and export your entire recording library</h2>
            <p>
              Backed by Node 24&apos;s built-in <span className="inline-code">node:sqlite</span> with zero native addons, <span className="inline-code">drone-path archive</span> indexes clips incrementally and remembers footage even when external drives are disconnected (<span className="inline-code">offline</span> vs. <span className="inline-code">online</span>).
            </p>
          </div>

          <div className={styles.demoSpacing}>
            <TerminalDemo label="Spatial archive command examples" examples={archiveExamples} />
          </div>

          <div className={`card-grid-3 ${styles.archiveFeatures}`}>
            <article>
              <h3>Kinematic shot segmentation</h3>
              <p>
                Deterministically classifies flight segments into <span className="inline-code">takeoff</span>, <span className="inline-code">landing</span>, <span className="inline-code">hover</span>, <span className="inline-code">smooth-glide</span>, <span className="inline-code">orbit</span>, <span className="inline-code">gimbal-reveal</span>, and <span className="inline-code">reposition</span> with smoothness scores from 0 to 1.
              </p>
            </article>

            <article>
              <h3>3D camera gaze search</h3>
              <p>
                Projects an approximate 75°×50° ground footprint from DVTM gimbal yaw and attitude so <span className="inline-code">archive near --include-gaze</span> finds clips that looked at a landmark even when the drone flew past it.
              </p>
            </article>

            <article>
              <h3>NLE markers &amp; privacy redaction</h3>
              <p>
                Export shot segments as DaVinci Resolve CSV (<span className="inline-code">.csv</span>) or Final Cut Pro XML 1.10 (<span className="inline-code">.fcpxml</span>) markers, or strip launch/landing geometry from shared maps with <span className="inline-code">--redact-launch &lt;m&gt;</span>.
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
