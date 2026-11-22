import Link from 'next/link';
import { DronePathLogo } from './Icons';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link href="/" className="brand-link" aria-label="Drone Path home">
            <DronePathLogo size={26} />
            <span className="brand-wordmark">
              <span>drone</span>
              <span className="brand-light">&nbsp;/ path</span>
            </span>
          </Link>
          <p className="footer-summary">
            Local-first flight-path map rendering, spatial library indexing, and Model Context Protocol tools for DJI drone recordings.
          </p>
          <p className="footer-license">
            Open-source software licensed under the MIT License.
          </p>
        </div>

        <nav aria-label="Site sections">
          <h2 className="footer-heading">Documentation</h2>
          <ul className="footer-links">
            <li>
              <Link href="/">Overview</Link>
            </li>
            <li>
              <Link href="/desktop/">Desktop app</Link>
            </li>
            <li>
              <Link href="/cli/">CLI &amp; spatial archive</Link>
            </li>
            <li>
              <Link href="/mcp/">MCP server</Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="footer-heading">Project</h2>
          <ul className="footer-links">
            <li>
              <a
                href="https://github.com/MrManny/drone-path"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub repository
              </a>
            </li>
            <li>
              <a
                href="https://github.com/MrManny/drone-path/releases"
                target="_blank"
                rel="noopener noreferrer"
              >
                Releases &amp; downloads
              </a>
            </li>
            <li>
              <a
                href="https://github.com/MrManny/drone-path/issues"
                target="_blank"
                rel="noopener noreferrer"
              >
                Issue tracker
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
