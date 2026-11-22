import Link from 'next/link';
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
    'Render synchronized 2D flight-path map overlay videos from DJI drone recordings, index local footage in a spatial archive, and expose tools to AI agents over MCP.',
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
            <p className="eyebrow">
              <span className="eyebrow-dot" aria-hidden="true" />
              <span>Open source · DJI telemetry &amp; flight maps</span>
            </p>
            <h1 id="hero-heading">
              Flight-path map overlays and spatial search for DJI drone footage.
            </h1>
            <p className="hero-lead">
              Drone Path reads telemetry from DJI recordings and renders synchronized 2D flight-path map videos, exports clean GPS tracks, indexes local footage libraries, and exposes post-flight tools over Model Context Protocol.
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

          <figure className="media-figure">
            <div className="media-frame">
              <img
                src="/images/app-main-window.jpg"
                alt="Drone Path desktop app showing an aerial forest recording beside a synchronized 2D flight map with an orange flight trail and telemetry strip"
                width={1440}
                height={900}
              />
            </div>
            <figcaption className="media-caption">
              Synchronized review and map rendering from DJI embedded CAM meta (DVTM) or .SRT sidecar telemetry.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section section-alt" aria-labelledby="surfaces-heading">
        <div className="container">
          <div className="notice" role="status" style={{ marginBottom: '32px' }}>
            <p>
              <strong>Site preview:</strong> This initial release establishes the structure and visual system for <span className="inline-code">dronepath.dev</span>. Full guides and reference tables are being reviewed for publication—use the links below or the <a href="https://github.com/MrManny/drone-path" target="_blank" rel="noopener noreferrer">GitHub repository</a> for complete documentation today.
            </p>
          </div>

          <div className="section-header">
            <p className="section-kicker">Architecture</p>
            <h2 id="surfaces-heading">Three ways to work with your flight footage</h2>
            <p>
              Use the graphical desktop app for visual review, the CLI for batch pipelines and spatial indexing, or the stdio MCP server for AI-assisted culling.
            </p>
          </div>

          <div className="card-grid-3">
            <article className="card">
              <div className="card-icon">
                <MonitorIcon />
              </div>
              <h3>Desktop app</h3>
              <p>
                Review DJI recordings beside a synchronized 2D map, toggle Picture-in-Picture, mark In–Out passages, tune map styling live, and export overlays or tracks.
              </p>
              <Link href="/desktop/" className="card-link">
                <span>Explore desktop app</span>
                <ArrowRightIcon />
              </Link>
            </article>

            <article className="card">
              <div className="card-icon">
                <TerminalIcon />
              </div>
              <h3>CLI &amp; spatial archive</h3>
              <p>
                Batch-render map videos, extract targeted keyframes, export GPX/GeoJSON/KML tracks, and search local footage by coordinates, camera gaze, or shot smoothness.
              </p>
              <Link href="/cli/" className="card-link">
                <span>Explore CLI &amp; archive</span>
                <ArrowRightIcon />
              </Link>
            </article>

            <article className="card">
              <div className="card-icon">
                <ServerIcon />
              </div>
              <h3>MCP server</h3>
              <p>
                Run a root-confined stdio JSON-RPC 2.0 server so AI agents can query flights, inspect telemetry snapshots, extract frames, and export NLE markers locally.
              </p>
              <Link href="/mcp/" className="card-link">
                <span>Explore MCP server</span>
                <ArrowRightIcon />
              </Link>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
