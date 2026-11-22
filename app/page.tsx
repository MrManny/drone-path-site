import Link from 'next/link';
import styles from './page.module.css';
import {
  ArrowRightIcon,
  GitHubIcon,
  HeroContourBackdrop,
  MonitorIcon,
  ServerIcon,
  TerminalIcon,
} from '../components/Icons';

const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Drone Path',
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'Windows, Linux, macOS',
  license: 'https://opensource.org/licenses/MIT',
  url: 'https://dronepath.dev/',
  codeRepository: 'https://github.com/MrManny/drone-path',
  description:
    'Render synchronized 2D flight-path map overlay videos from DJI drone recordings, index local footage in a spatial archive, and expose tools to AI agents over Model Context Protocol.',
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />

      <section className="hero" aria-labelledby="hero-heading">
        <HeroContourBackdrop />
        <div className="container hero-grid">
          <div>
            <h1 id="hero-heading">
              Render synchronized flight-path map videos from DJI drone footage.
            </h1>
            <p className="hero-lead">
              Drone Path turns embedded DJI telemetry into 2D flight-path map overlays at the exact frame rate and frame count of your source recording. Index local footage by location and camera gaze, review flights on one timeline, or connect AI agents over Model Context Protocol.
            </p>
            <div className="cta-row">
              <a
                href="https://github.com/MrManny/drone-path/releases"
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download latest release
              </a>
              <a
                href="https://github.com/MrManny/drone-path"
                className="btn btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon size={17} />
                <span>View on GitHub</span>
              </a>
            </div>
            <div className="hero-command" role="region" aria-label="Quick start command">
              <span className="hero-command-prompt" aria-hidden="true">$</span>
              <code>npx drone-path &quot;my-flight.mp4&quot;</code>
            </div>
          </div>

          <div className={`media-figure ${styles.heroScreenshot}`}>
            <img
              src="/images/app-main-window.jpg"
              alt="Drone Path desktop app displaying a drone recording over an autumn forest beside a synchronized satellite flight map, orange flight trail, and live telemetry readout strip"
              width={1440}
              height={900}
            />
          </div>

          <section className={styles.whatsNew} aria-labelledby="whats-new-heading">
            <h2 id="whats-new-heading">What&apos;s new?</h2>
            <div className={styles.highlights}>
              <div className={styles.featured}>
                <h3>Automatic shot detection <span className={styles.version}>v1.1.0</span></h3>
                <p>
                  Find smooth shots using flight telemetry, pull JPEG keyframes with telemetry snapshots, and export shot markers to DaVinci Resolve or Final Cut Pro.
                </p>
              </div>
              <ul className={styles.secondary}>
                <li><strong>MCP server</strong> <span className={styles.version}>v1.1.0</span> – Let AI assistants search footage, inspect keyframes, and render map overlays.</li>
                <li><strong>Searchable flight archive</strong> <span className={styles.version}>v1.0.0</span> – Index local clips, find footage by where the drone flew or pointed its camera, and export grouped flights.</li>
              </ul>
            </div>
          </section>
        </div>
      </section>

      <section className="section section-alt" aria-labelledby="telemetry-heading">
        <div className="container">
          <div className="section-header">
            <p className="section-kicker">Telemetry extraction</p>
            <h2 id="telemetry-heading">Built directly on DJI flight metadata</h2>
            <p>
              Drone Path decodes positioning, attitude, and camera metadata straight from your recordings without inventing timestamps or interpolating over telemetry dropouts.
            </p>
          </div>

          <div className="card-grid-2">
            <article className={styles.feature}>
              <h3>Embedded CAM meta (DVTM)</h3>
              <p>
                Reads DJI&apos;s protobuf telemetry stream directly from the MP4 container when present—extracting GPS coordinates, absolute altitude, 3-axis body and gimbal attitude, drone yaw heading, and camera exposure settings per frame.
              </p>
            </article>

            <article className={styles.feature}>
              <h3>.SRT sidecar telemetry</h3>
              <p>
                Automatically parses an adjacent <span className="inline-code">.SRT</span> subtitle telemetry file when no embedded CAM meta stream exists, computing heading from the GPS track and breaking lines cleanly across signal gaps.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="outputs-heading">
        <div className="container">
          <div className="section-header">
            <p className="section-kicker">Map rendering</p>
            <h2 id="outputs-heading">Frame-accurate map overlays ready for your timeline</h2>
            <p>
              Every exported map video matches the source recording&apos;s exact frame count and frame rate so overlays drop straight onto a second video track without drift.
            </p>
          </div>

          <div className="card-grid-2">
            <figure className="media-figure">
              <div className="media-frame">
                <img
                  src="/images/example-map-satellite.jpg"
                  alt="Rendered 768 by 768 satellite map video frame showing the growing coral flight trail and drone heading arrow"
                  width={768}
                  height={768}
                />
              </div>
              <figcaption className="media-caption">
                Default satellite output: Esri World Imagery map, growing flight trail, and heading arrow.
              </figcaption>
            </figure>

            <figure className="media-figure">
              <div className="media-frame">
                <img
                  src="/images/example-map-topo-hud.jpg"
                  alt="Rendered topographic map video frame with heading, altitude, and speed HUD readout chips along the bottom"
                  width={768}
                  height={768}
                />
              </div>
              <figcaption className="media-caption">
                Topographic style: OpenTopoMap contours with live telemetry chips.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section section-alt" aria-labelledby="pillars-heading">
        <div className="container">
          <div className="section-header">
            <p className="section-kicker">Three interfaces, one core</p>
            <h2 id="pillars-heading">Review, script, or connect to AI agents</h2>
            <p>
              All three interfaces share the same deterministic telemetry parser, spatial math, and video rendering engine.
            </p>
          </div>

          <div className="card-grid-3">
            <article className={styles.feature}>
              <div className={styles.featureIcon} aria-hidden="true">
                <MonitorIcon />
              </div>
              <h3>Desktop app</h3>
              <p>
                An Electron review workspace for Windows and Linux with synchronized split or Picture-in-Picture playback, In–Out loop marking, live map appearance previews, and one-click video or track export.
              </p>
              <Link href="/desktop/" className="card-link">
                <span>Explore desktop app</span>
                <ArrowRightIcon />
              </Link>
            </article>

            <article className={styles.feature}>
              <div className={styles.featureIcon} aria-hidden="true">
                <TerminalIcon />
              </div>
              <h3>CLI &amp; spatial archive</h3>
              <p>
                A scriptable command-line tool for batch map rendering, fast keyframe extraction, and indexing local recordings into a searchable archive with camera gaze search and shot segmentation.
              </p>
              <Link href="/cli/" className="card-link">
                <span>Explore CLI &amp; archive</span>
                <ArrowRightIcon />
              </Link>
            </article>

            <article className={styles.feature}>
              <div className={styles.featureIcon} aria-hidden="true">
                <ServerIcon />
              </div>
              <h3>MCP server</h3>
              <p>
                A root-confined stdio JSON-RPC 2.0 server giving Claude Desktop, Cursor, and other MCP clients 9 structured tools to search flights, inspect frames, export video editor timeline markers, and render overlays locally.
              </p>
              <Link href="/mcp/" className="card-link">
                <span>Explore MCP server</span>
                <ArrowRightIcon />
              </Link>
            </article>
          </div>

          <h3 className="subsection-heading">Example AI workflows</h3>
          <div className="card-grid-2">
            <article className={styles.feature}>
              <h3>Draft social &amp; YouTube edits</h3>
              <p>
                Automatically detect smooth, scenic shots near a location with <span className="inline-code">drone-path</span>, inspect extracted keyframes, and export timeline markers to assemble a rough cut for YouTube or social media.
              </p>
            </article>

            <article className={styles.feature}>
              <h3>Open-data &amp; OpenStreetMap checks</h3>
              <p>
                Cross-reference objects and landmarks captured from multiple angles across flights to spot missing details or potential open-data improvements for OpenStreetMap and similar mapping projects.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="formats-heading">
        <div className="container">
          <div className="section-header">
            <p className="section-kicker">Open standards</p>
            <h2 id="formats-heading">Interoperable tracks, maps, and editor timelines</h2>
            <p>
              Export deterministic, byte-identical files from either the desktop app or the CLI for GIS tools, web viewers, and non-linear video editors.
            </p>
          </div>

          <ul className="format-list" aria-label="Supported output and export formats">
            <li>
              <span className="format-ext">.mp4</span>
              <span>H.264 or H.265 flight-path map overlay videos matched to source frame rate</span>
            </li>
            <li>
              <span className="format-ext">.gpx</span>
              <span>GPX 1.1 flight tracks for mapping and GIS software</span>
            </li>
            <li>
              <span className="format-ext">.geojson</span>
              <span>GeoJSON MultiLineString tracks for web maps and spatial scripts</span>
            </li>
            <li>
              <span className="format-ext">.kml / .kmz</span>
              <span>KML 2.2 and compressed KMZ tracks for Google Earth</span>
            </li>
            <li>
              <span className="format-ext">.json</span>
              <span>Per-frame telemetry documents covering position, attitude, and exposure</span>
            </li>
            <li>
              <span className="format-ext">.html</span>
              <span>Standalone offline Leaflet archive maps with optional launch-zone redaction</span>
            </li>
            <li>
              <span className="format-ext">.csv</span>
              <span>DaVinci Resolve timeline markers generated from detected shot segments</span>
            </li>
            <li>
              <span className="format-ext">.fcpxml</span>
              <span>Final Cut Pro 1.10 XML timeline markers and asset clips</span>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
