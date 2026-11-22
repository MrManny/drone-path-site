'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DronePathLogo, GitHubIcon } from './Icons';

const NAV_ITEMS = [
  { href: '/', label: 'Overview' },
  { href: '/desktop/', label: 'Desktop app' },
  { href: '/cli/', label: 'CLI' },
  { href: '/mcp/', label: 'MCP server' },
] as const;

function normalizePath(pathname: string): string {
  if (pathname === '/' || pathname === '') return '/';
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

export function SiteHeader() {
  const pathname = normalizePath(usePathname() ?? '/');

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <header className="site-header">
        <div className="container site-header-inner">
          <Link href="/" className="brand-link" aria-label="Drone Path home">
            <DronePathLogo size={30} />
            <span className="brand-wordmark">
              <span>drone</span>
              <span className="brand-light">&nbsp;/ path</span>
            </span>
          </Link>

          <nav aria-label="Primary" className="primary-nav">
            <ul className="nav-list">
              {NAV_ITEMS.map((item) => {
                const isCurrent = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="nav-link"
                      aria-current={isCurrent ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="header-actions">
            <a
              href="https://github.com/MrManny/drone-path"
              className="header-repo-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Drone Path on GitHub (opens in a new tab)"
            >
              <GitHubIcon size={16} />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
