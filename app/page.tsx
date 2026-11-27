import type { Metadata } from 'next';
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
import { FaqSection, type FaqItem } from '../components/Faq';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

const homeFaq: FaqItem[] = [
  {
    question: 'Is Drone Path free?',
    answer:
      'Yes. Drone Path is free, open-source software released under the MIT license. The desktop app, the CLI, and the MCP server all run locally, with no account, subscription, or watermark.',
  },
  {
    question: 'How do I get GPS data out of a DJI video?',
    answer:
      'Run npx drone-path "my-flight.mp4" --track-out my-flight.gpx (the track is written alongside the rendered map video), or open the clip in the desktop app and choose File → Export telemetry. Drone Path reads the GPS telemetry embedded in the MP4 (DJI CAM meta / DVTM) or the matching .SRT subtitle file and writes GPX, KML, KMZ, GeoJSON, or per-frame JSON.',
  },
  {
    question: 'Which DJI drones does it work with?',
    answer:
      'Drone Path is tested with DJI Neo 2 footage. Other DJI drones that embed CAM meta (DVTM) telemetry in the MP4 or write a .SRT subtitle telemetry file should work too; please report results on GitHub. To get .SRT files, enable video captions or subtitles in the DJI Fly camera settings before you fly.',
  },
  {
    question: 'Can I use the map overlay in DaVinci Resolve, Final Cut Pro, or Premiere Pro?',
    answer:
      'Yes. Every rendered map video matches the source clip\'s exact frame rate and frame count, so it drops onto a second video track in any editor without drift. Drone Path can also export detected shots as DaVinci Resolve CSV or Final Cut Pro FCPXML timeline markers.',
  },
  {
    question: 'Does my footage get uploaded anywhere?',
    answer:
      'No. Telemetry extraction, rendering, and the footage archive all run on your own computer. Only map tiles (Esri World Imagery or OpenTopoMap) are downloaded while rendering.',
  },
];

const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Drone Path',
  softwareVersion: '1.2.0',
  applicationCategory: 'MultimediaApplication',
  operatingSystem:
    'Windows, Linux (Desktop app); Windows, Linux, macOS (CLI and MCP server)',
  isAccessibleForFree: true,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  license: 'https://opensource.org/licenses/MIT',
  url: 'https://dronepath.dev/',
  downloadUrl: 'https://github.com/MrManny/drone-path/releases',
  codeRepository: 'https://github.com/MrManny/drone-path',
  author: {
    '@type': 'Person',
    name: 'Manuel Warum',
    url: 'https://github.com/MrManny',
  },
  screenshot: [
    'https://dronepath.dev/images/app-archive-workspace.jpg',
    'https://dronepath.dev/images/app-archive-point-search.jpg',
    'https://dronepath.dev/images/app-main-window.jpg',
    'https://dronepath.dev/images/example-map-satellite.jpg',
    'https://dronepath.dev/images/example-map-topo-hud.jpg',
  ],
  featureList: [
    'Extract GPS telemetry from DJI videos: embedded CAM meta (DVTM) and .SRT subtitle files',
    'Frame-accurate satellite and topographic flight-path map overlay videos for DJI footage',
    'Convert DJI telemetry to GPX, KML, KMZ, GeoJSON, and per-frame JSON tracks',
    'Desktop Archive workspace with multi-flight map, point-in-view search, shot filters, and offline drive support',
    'FFmpeg blurdetect keyframe and clip-wide sharpness scoring cached in SQLite',
    'DaVinci Resolve CSV and Final Cut Pro FCPXML timeline marker export',
    'Local Model Context Protocol (MCP) server with 11 tools so AI assistants like Claude and Cursor can search and cull your drone footage',
  ],
  description:
    'Free, open-source tool that extracts GPS telemetry from DJI drone videos, renders synchronized flight-path map overlay videos, exports GPX/KML/GeoJSON tracks, organizes footage in a visual Desktop Archive, scores shot sharpness, and connects AI agents over Model Context Protocol.',
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareJsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <section className="hero" aria-labelledby="hero-heading">
        <HeroContourBackdrop />
        <div className="container hero-grid">
          <div>
            <h1 id="hero-heading">
              Free, open-source flight-path map overlays for DJI drone videos.
            </h1>
            <p className="hero-lead">
              Drone Path extracts the GPS telemetry embedded in your DJI videos (or their .SRT files), tested with DJI Neo 2 footage, and renders a 2D flight-path map overlay at the exact frame rate and frame count of the source recording. Browse watched folders in the Desktop Archive, export GPX, KML, or GeoJSON tracks, score shot sharpness, or connect AI assistants over MCP. MIT-licensed and runs entirely on your computer.
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
              src="/images/app-archive-workspace.jpg"
              alt="Drone Path Desktop Archive workspace displaying watched folders, flight-grouped recordings with poster thumbnails, and colored flight tracks on a multi-flight satellite map"
              width={1600}
              height={950}
            />
          </div>

          <section className={styles.whatsNew} aria-labelledby="whats-new-heading">
            <h2 id="whats-new-heading">What&apos;s new?</h2>
            <div className={styles.highlights}>
              <div className={styles.featured}>
                <h3>Desktop Archive workspace <span className={styles.version}>v1.2.0</span></h3>
                <p>
                  Add watched folders to browse flights on a multi-flight map, filter by date, shot type, or smoothness, jump to any moment with &ldquo;What filmed here?&rdquo;, and export combined tracks or HTML maps.
                </p>
              </div>
              <ul className={styles.secondary}>
                <li><strong>Sharpness scoring</strong> <span className={styles.version}>v1.2.0</span> – Score keyframes or cache clip-wide luminance sharpness timelines over CLI and MCP to surface your sharpest shots.</li>
                <li><strong>MCP server</strong> <span className={styles.version}>v1.1.0</span> – Let AI assistants search footage, inspect keyframes, check sharpness, and export markers or map overlays.</li>
              </ul>
            </div>
          </section>
        </div>
      </section>

      <section className="section section-alt" aria-labelledby="desktop-archive-heading">
        <div className="container">
          <div className="section-header">
            <p className="section-kicker">Desktop Archive</p>
            <h2 id="desktop-archive-heading">Browse every flight on one map and jump straight to the shot</h2>
            <p>
              Turn local folders or external drives into a visual, searchable flight library—sharing the same local SQLite index as the CLI and MCP server.
            </p>
          </div>

          <div className="split-block">
            <div className="split-copy">
              <h3>Multi-flight map &amp; &ldquo;What filmed here?&rdquo; search</h3>
              <p>
                Add watched folders and explore grouped flights on a fast Canvas map with automatic zoom clustering, lazy poster thumbnails, and offline drive tracking.
              </p>
              <ul className="feature-list">
                <li><strong>Point-in-view search:</strong> Click any spot on the map with <em>What filmed here?</em> to rank clips by camera footprint or track proximity and open Review at that exact second.</li>
                <li><strong>Shot &amp; telemetry filters:</strong> Narrow flights by date, folder, distance, map viewport, or kinematic shot type and smoothness score.</li>
                <li><strong>Combined exports:</strong> Save filtered flights as GPX, GeoJSON, KML, KMZ, or offline HTML maps with optional launch-area redaction.</li>
              </ul>
              <Link href="/desktop/#archive-heading" className={`card-link ${styles.archiveCta}`}>
                <span>Explore Desktop Archive</span>
                <ArrowRightIcon />
              </Link>
            </div>

            <figure className="media-figure">
              <div className="media-frame">
                <img
                  src="/images/app-archive-point-search.jpg"
                  alt="Drone Path Desktop Archive with What filmed here point-in-view search active, showing ranked clip matches in the Clips at this spot popover over the satellite map"
                  width={1600}
                  height={950}
                />
              </div>
              <figcaption className="media-caption">
                Point-in-view search: click any landmark with <strong>What filmed here?</strong> to see every clip that captured or flew past it and jump straight to that second in Review.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="telemetry-heading">
        <div className="container">
          <div className="section-header">
            <p className="section-kicker">Telemetry extraction</p>
            <h2 id="telemetry-heading">Extract GPS telemetry straight from DJI videos</h2>
            <p>
              Drone Path decodes GPS position, altitude, drone and gimbal orientation, and camera settings straight from your recordings without inventing timestamps or interpolating over telemetry dropouts.
            </p>
          </div>

          <div className="card-grid-2">
            <article className={styles.feature}>
              <h3>GPS data embedded in the MP4 (CAM meta / DVTM)</h3>
              <p>
                Reads DJI&apos;s embedded telemetry stream (protobuf CAM meta, also called DVTM) directly from the MP4 file when present—extracting GPS coordinates, absolute altitude, 3-axis body and gimbal attitude, drone yaw heading, and camera exposure settings per frame.
              </p>
            </article>

            <article className={styles.feature}>
              <h3>DJI .SRT subtitle telemetry</h3>
              <p>
                Automatically parses the matching <span className="inline-code">.SRT</span> subtitle file DJI writes next to your video when no embedded telemetry stream exists, computing heading from the GPS track and breaking lines cleanly across signal gaps.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-alt" aria-labelledby="outputs-heading">
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

      <section className="section" aria-labelledby="pillars-heading">
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
                An Electron workspace for Windows and Linux combining the new Archive browser (watched folders, multi-flight map, &ldquo;What filmed here?&rdquo;, and shot filters) with synchronized split or Picture-in-Picture review, In–Out loops, and one-click export.
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
                A scriptable command-line tool for Windows, Linux, and macOS (Node.js 24+) for batch map rendering, converting DJI telemetry to GPX or KML, keyframe and sharpness timeline analysis, and a searchable footage library.
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
                A local Model Context Protocol (MCP) server for Windows, Linux, and macOS that gives Claude Desktop, Cursor, and other AI assistants 11 tools to search your drone footage, score sharpness, inspect frames, export timeline markers, and render overlays—without uploading video.
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
              <h3>Identify top shots &amp; draft edits</h3>
              <p>
                Filter smooth-glide or orbit segments with <span className="inline-code">drone-path</span>, score keyframe and clip-wide sharpness to isolate the crispest takes, inspect extracted frames, and export DaVinci Resolve or Final Cut Pro timeline markers.
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

      <section className="section section-alt" aria-labelledby="formats-heading">
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

      <FaqSection id="faq-heading" items={homeFaq} />
    </>
  );
}
