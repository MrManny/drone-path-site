import type { Metadata } from 'next';
import Link from 'next/link';
import { HeroContourBackdrop } from '../../components/Icons';
import { FaqSection, type FaqItem } from '../../components/Faq';
import { createPageMetadata } from '../../lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'DJI Telemetry Overlay App for Windows & Linux (Free)',
  description:
    'Free, open-source desktop app that plays DJI drone footage beside a synchronized flight-path map and exports map overlay videos and GPX, KML, or GeoJSON tracks.',
  path: '/desktop/',
  ogDescription:
    'Review DJI drone recordings beside a synchronized flight map, mark passages, customize map styling live, and export H.264/H.265 overlays or GPX/KML tracks. Free for Windows and Linux.',
  image: {
    url: '/images/app-review-split.jpg',
    width: 1440,
    height: 900,
    alt: 'Drone Path desktop review workspace showing drone footage on the left and a synchronized 2D flight map with speed, altitude, and zoom strip on the right',
  },
});

const desktopFaq: FaqItem[] = [
  {
    question: 'Is the desktop app free?',
    answer:
      'Yes. The Drone Path desktop app is free and open source under the MIT license. Download the Windows installer, Windows portable build, or Linux AppImage from GitHub Releases.',
  },
  {
    question: 'Does it work with DJI Neo 2 footage?',
    answer:
      'Yes. The desktop app is tested with DJI Neo 2 recordings: open a clip to see its GPS flight path on a synchronized map, then export a map overlay video or GPX, KML, or GeoJSON track. Other DJI drones that embed CAM meta (DVTM) telemetry or write .SRT subtitle files should work too.',
  },
  {
    question: 'Which operating systems are supported?',
    answer:
      'Windows (NSIS installer or portable build) and Linux (AppImage). On macOS, use the drone-path CLI, which renders the same map overlays and track exports.',
  },
  {
    question: 'Do I need to install FFmpeg?',
    answer:
      'No. The desktop app ships with FFmpeg and FFprobe. Map video export uses your installed Google Chrome or Microsoft Edge.',
  },
  {
    question: 'How do I add the flight map to my edit?',
    answer:
      'Choose File → Export video to render an H.264 or H.265 map video with the same frame rate and frame count as your clip, then place it on a track above your footage in DaVinci Resolve, Final Cut Pro, or Premiere Pro. It stays in sync without manual alignment.',
  },
];

export default function DesktopPage() {
  return (
    <>
      <section className="hero" aria-labelledby="desktop-heading">
        <HeroContourBackdrop />
        <div className="container hero-grid">
          <div>
            <h1 id="desktop-heading">
              Free DJI telemetry overlay app: review flights beside a synchronized map.
            </h1>
            <p className="hero-lead">
              The free, open-source Drone Path desktop app for Windows and Linux puts your DJI recording beside a synchronized 2D flight-path map. Open any clip, scrub frame by frame without waiting for tile warm-up, mark an In–Out passage, tune the map look live, and export a map overlay video or GPX, KML, and GeoJSON tracks.
            </p>
            <div className="cta-row">
              <a
                href="https://github.com/MrManny/drone-path/releases"
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download from GitHub Releases
              </a>
              <Link href="/cli/" className="btn btn-secondary">
                Compare with CLI
              </Link>
            </div>
            <div className="hero-command" role="region" aria-label="Run desktop app from source">
              <span className="hero-command-prompt" aria-hidden="true">$</span>
              <code>npm run build &amp;&amp; npm run app</code>
            </div>
          </div>

          <figure className="media-figure">
            <div className="media-frame">
              <img
                src="/images/app-review-split.jpg"
                alt="Drone Path desktop review workspace showing drone footage on the left and a synchronized 2D flight map with speed, altitude, and zoom strip on the right"
                width={1440}
                height={900}
              />
            </div>
            <figcaption className="media-caption">
              Split review workspace: video preview, synchronized flight map, transport controls, and filmstrip timeline.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section section-alt" aria-labelledby="review-views-heading">
        <div className="container">
          <div className="section-header">
            <p className="section-kicker">Review workspace</p>
            <h2 id="review-views-heading">Instant open, split view, and Picture-in-Picture</h2>
            <p>
              As soon as a recording&apos;s telemetry is decoded, the flight trail draws immediately while map tiles stream on demand—playback never stalls waiting for tiles.
            </p>
          </div>

          <div className="split-block" style={{ marginBottom: '40px' }}>
            <div className="split-copy">
              <h3>Full-frame footage with corner map overlay</h3>
              <p>
                Press <kbd className="kbd">P</kbd> or choose <strong>View → Picture in picture</strong> to collapse the map into a compact corner card over your drone footage. Play, pause, and scrubbing drive both panes from the same timeline so the footage and map never drift apart.
              </p>
              <ul className="feature-list">
                <li><strong>Compact readout strip:</strong> Displays live Speed, Altitude, and the Zoom stepper (<span className="inline-code">auto-fit</span> or pinned levels <span className="inline-code">2</span>–<span className="inline-code">19</span>).</li>
                <li><strong>Compact window support:</strong> Every workspace and dialog fits cleanly down to <span className="inline-code">1024×600</span>.</li>
                <li><strong>Bundled FFmpeg:</strong> Ships with FFmpeg and FFprobe; video export uses system Google Chrome or Microsoft Edge.</li>
              </ul>
            </div>

            <figure className="media-figure">
              <div className="media-frame">
                <img
                  src="/images/app-review-overlay.jpg"
                  alt="Drone Path Picture-in-Picture mode showing full-frame aerial video with a square flight map overlaid in the bottom-right corner"
                  width={1440}
                  height={900}
                />
              </div>
              <figcaption className="media-caption">
                Picture-in-Picture layout (<kbd className="kbd">P</kbd>): full-frame recording with live corner map card.
              </figcaption>
            </figure>
          </div>

          <div className="split-block split-block-reverse">
            <figure className="media-figure">
              <div className="media-frame">
                <img
                  src="/images/app-loop-points.jpg"
                  alt="Filmstrip timeline showing marked In and Out loop handles in warm cream highlighting a passage of the flight"
                  width={1440}
                  height={900}
                />
              </div>
              <figcaption className="media-caption">
                In and Out points marked on the filmstrip timeline; the selected passage plays on repeat and pre-selects the export range.
              </figcaption>
            </figure>

            <div className="split-copy">
              <h3>Mark In–Out passages for looping and export</h3>
              <p>
                Press <kbd className="kbd">I</kbd> to set an in point and <kbd className="kbd">O</kbd> to set an out point—or drag the handles directly on the filmstrip. A single point marks a passage to the end or from the start of the clip.
              </p>
              <p>
                Marked passages repeat automatically during review and carry straight into both <strong>Export video…</strong> and <strong>Export telemetry…</strong>, so you only render or save the exact segment you need.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="appearance-heading">
        <div className="container">
          <div className="section-header">
            <p className="section-kicker">Customization</p>
            <h2 id="appearance-heading">Live map appearance and deterministic export</h2>
            <p>
              Tune map styles, camera behavior, HUD readouts, and easing beside a live 16:9 export preview before encoding.
            </p>
          </div>

          <div className="card-grid-2">
            <figure className="media-figure">
              <div className="media-frame">
                <img
                  src="/images/app-review-map-appearance.jpg"
                  alt="Map appearance dialog showing a live 16:9 preview beside grouped controls for Satellite or Topographic style, trail color swatches, camera mode, HUD chips, and intro/outro duration"
                  width={1584}
                  height={911}
                />
              </div>
              <figcaption className="media-caption">
                <strong>View → Map appearance…:</strong> Switch between Satellite and Topographic tiles, pick trail color presets or custom RGBA hex, toggle Overview vs. Follow camera, select <span className="inline-code">HDG</span>/<span className="inline-code">ALT</span>/<span className="inline-code">SPD</span> chips, and set intro/outro camera easing.
              </figcaption>
            </figure>

            <figure className="media-figure">
              <div className="media-frame">
                <img
                  src="/images/app-export-form.jpg"
                  alt="Export video dialog showing an output preview on the left and range, resolution, codec, quality, and preset options on the right"
                  width={1440}
                  height={900}
                />
              </div>
              <figcaption className="media-caption">
                <strong>File → Export video… &amp; Export telemetry…:</strong> Encode H.264 or H.265 map videos at your chosen resolution and quality, or export <span className="inline-code">.gpx</span>, <span className="inline-code">.geojson</span>, <span className="inline-code">.kml</span>, <span className="inline-code">.kmz</span>, or <span className="inline-code">.telemetry.json</span> files byte-identical to the CLI.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section section-alt" aria-labelledby="shortcuts-heading">
        <div className="container">
          <div className="section-header">
            <p className="section-kicker">Keyboard &amp; accessibility</p>
            <h2 id="shortcuts-heading">Full keyboard control across player and menu bar</h2>
            <p>
              Every transport command, timeline marker, zoom step, and menu item is reachable from the keyboard, paired with an offline user manual under <strong>Help → User manual</strong> and automatic updates for packaged releases.
            </p>
          </div>

          <div className="table-scroll" role="region" aria-label="Desktop app keyboard shortcuts" tabIndex={0}>
            <table className="spec-table">
              <caption>Review player and menu bar keyboard shortcuts</caption>
              <thead>
                <tr>
                  <th scope="col">Keys</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row"><kbd className="kbd">Space</kbd> / <kbd className="kbd">K</kbd></th>
                  <td>Play or pause playback</td>
                </tr>
                <tr>
                  <th scope="row"><kbd className="kbd">1</kbd> <kbd className="kbd">2</kbd> <kbd className="kbd">3</kbd> <kbd className="kbd">4</kbd></th>
                  <td>Set playback speed to 1x, 2x, 3x, or 4x</td>
                </tr>
                <tr>
                  <th scope="row"><kbd className="kbd">Left</kbd> / <kbd className="kbd">Right</kbd></th>
                  <td>Step backward or forward one frame</td>
                </tr>
                <tr>
                  <th scope="row"><kbd className="kbd">Shift+Left</kbd> / <kbd className="kbd">Shift+Right</kbd></th>
                  <td>Jump backward or forward one second</td>
                </tr>
                <tr>
                  <th scope="row"><kbd className="kbd">Home</kbd> / <kbd className="kbd">End</kbd></th>
                  <td>Jump to the start or end of the recording</td>
                </tr>
                <tr>
                  <th scope="row"><kbd className="kbd">I</kbd> / <kbd className="kbd">O</kbd></th>
                  <td>Set the in point or out point</td>
                </tr>
                <tr>
                  <th scope="row"><kbd className="kbd">Esc</kbd></th>
                  <td>Close an open menu or dialog, or clear in and out points</td>
                </tr>
                <tr>
                  <th scope="row"><kbd className="kbd">P</kbd></th>
                  <td>Toggle Picture-in-Picture corner map overlay</td>
                </tr>
                <tr>
                  <th scope="row"><kbd className="kbd">+</kbd> / <kbd className="kbd">-</kbd></th>
                  <td>Step map zoom in or out one level (levels 2 to 19)</td>
                </tr>
                <tr>
                  <th scope="row"><kbd className="kbd">Ctrl+O</kbd></th>
                  <td>Open a drone recording (works even in empty workspace or while typing)</td>
                </tr>
                <tr>
                  <th scope="row"><kbd className="kbd">Alt</kbd>, <kbd className="kbd">Alt+F</kbd>, <kbd className="kbd">Alt+V</kbd>, <kbd className="kbd">Alt+H</kbd></th>
                  <td>Open the menu bar or jump directly to File, View, or Help</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <FaqSection id="desktop-faq-heading" items={desktopFaq} />
    </>
  );
}
