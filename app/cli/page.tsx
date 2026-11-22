import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRightIcon, HeroContourBackdrop } from '../../components/Icons';

export const metadata: Metadata = {
  title: 'CLI & spatial archive',
  description:
    'Command-line tool for rendering flight-path map videos, extracting keyframes, exporting GPS tracks, and querying a local SQLite spatial archive.',
  alternates: {
    canonical: '/cli/',
  },
};

export default function CliPlaceholderPage() {
  return (
    <>
      <section className="hero" aria-labelledby="cli-heading">
        <HeroContourBackdrop />
        <div className="container hero-grid-single">
          <p className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            <span>Node.js 24+ · npm package drone-path</span>
          </p>
          <h1 id="cli-heading">
            Scriptable map rendering, track export, and spatial archive search.
          </h1>
          <p className="hero-lead">
            Drive Drone Path from shell scripts or CI pipelines to render flight-path videos, extract targeted keyframes, and index local MP4 libraries into a searchable SQLite database.
          </p>
          <div className="cta-row">
            <a
              href="https://github.com/MrManny/drone-path/blob/main/docs/user/cli.md"
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read CLI manual on GitHub
            </a>
            <Link href="/mcp/" className="btn btn-secondary">
              Explore MCP server
            </Link>
          </div>
          <div className="hero-command" role="region" aria-label="Example CLI command">
            <span className="hero-command-prompt" aria-hidden="true">$</span>
            <code>npx drone-path &quot;flight.mp4&quot; --style topo --hud heading,alt,speed</code>
          </div>
        </div>
      </section>

      <section className="section section-alt" aria-labelledby="cli-highlights-heading">
        <div className="container">
          <div className="notice" role="status" style={{ marginBottom: '32px' }}>
            <p>
              <strong>Documentation in progress:</strong> Full option tables, archive query recipes, and NLE marker export guides are staged in the content draft branch.
            </p>
          </div>

          <div className="section-header">
            <p className="section-kicker">Core capabilities</p>
            <h2 id="cli-highlights-heading">Command groups in drone-path</h2>
          </div>

          <div className="card-grid-3">
            <article className="card">
              <h3>Map rendering</h3>
              <p>
                Render <span className="inline-code">satellite</span> or <span className="inline-code">topo</span> overlays at exact source frame rates with configurable HUD chips, camera modes, and GPX/GeoJSON/KML/KMZ/JSON side outputs.
              </p>
            </article>
            <article className="card">
              <h3>Spatial archive</h3>
              <p>
                Scan footage folders into a local <span className="inline-code">node:sqlite</span> index, infer logical flights, detect kinematic shot segments, and search by point proximity or camera gaze.
              </p>
            </article>
            <article className="card">
              <h3>Keyframes &amp; NLE markers</h3>
              <p>
                Extract fast GOP-seeked JPEG keyframes with telemetry snapshots and export DaVinci Resolve CSV or Final Cut Pro FCPXML markers.
              </p>
              <Link href="/mcp/" className="card-link">
                <span>Automate with MCP</span>
                <ArrowRightIcon />
              </Link>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
