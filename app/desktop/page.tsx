import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRightIcon, HeroContourBackdrop } from '../../components/Icons';

export const metadata: Metadata = {
  title: 'Desktop app',
  description:
    'Synchronized video and 2D flight map review player for Windows and Linux with In–Out loop marking, live map styling, and video or track export.',
  alternates: {
    canonical: '/desktop/',
  },
};

export default function DesktopPlaceholderPage() {
  return (
    <>
      <section className="hero" aria-labelledby="desktop-heading">
        <HeroContourBackdrop />
        <div className="container hero-grid-single">
          <p className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            <span>Windows &amp; Linux · Electron desktop app</span>
          </p>
          <h1 id="desktop-heading">
            Review recordings beside a synchronized flight map.
          </h1>
          <p className="hero-lead">
            Open a DJI drone recording and immediately scrub video and map in lockstep, mark passages for export, customize satellite or topographic styles, and save GPX, GeoJSON, KML, or telemetry JSON files.
          </p>
          <div className="cta-row">
            <a
              href="https://github.com/MrManny/drone-path/releases"
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download desktop app
            </a>
            <Link href="/" className="btn btn-secondary">
              Back to overview
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-alt" aria-labelledby="desktop-highlights-heading">
        <div className="container">
          <div className="notice" role="status" style={{ marginBottom: '32px' }}>
            <p>
              <strong>Documentation in progress:</strong> Screenshots, live appearance previews, and the full keyboard shortcut reference for this page are prepared for review. Packaged installers are available on{' '}
              <a href="https://github.com/MrManny/drone-path/releases" target="_blank" rel="noopener noreferrer">
                GitHub Releases
              </a>.
            </p>
          </div>

          <div className="section-header">
            <p className="section-kicker">Planned sections</p>
            <h2 id="desktop-highlights-heading">What the desktop app covers</h2>
          </div>

          <div className="card-grid-2">
            <article className="card">
              <h3>Split view &amp; Picture-in-Picture</h3>
              <p>
                Review the source footage side by side with the flight map or toggle a corner overlay on one shared timeline with live speed, altitude, and zoom readouts.
              </p>
            </article>
            <article className="card">
              <h3>Live map appearance &amp; export</h3>
              <p>
                Switch between Satellite and Topographic tiles, adjust trail color and HUD chips, mark In–Out segments, and export H.264/H.265 map videos or byte-identical tracks.
              </p>
              <Link href="/cli/" className="card-link">
                <span>See CLI track formats</span>
                <ArrowRightIcon />
              </Link>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
