import type { Metadata } from 'next';
import Link from 'next/link';
import { HeroContourBackdrop } from '../../components/Icons';

export const metadata: Metadata = {
  title: 'MCP server',
  description:
    'Sandboxed stdio Model Context Protocol (MCP) server exposing Drone Path archive search, telemetry inspection, keyframe extraction, and rendering to AI agents.',
  alternates: {
    canonical: '/mcp/',
  },
};

export default function McpPlaceholderPage() {
  return (
    <>
      <section className="hero" aria-labelledby="mcp-heading">
        <HeroContourBackdrop />
        <div className="container hero-grid-single">
          <p className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            <span>JSON-RPC 2.0 over stdio · --allow-root sandbox</span>
          </p>
          <h1 id="mcp-heading">
            Local-first drone footage tools for AI agents.
          </h1>
          <p className="hero-lead">
            Start a stdio Model Context Protocol server confined to explicitly allowed footage directories so AI assistants can search your flights, inspect telemetry and keyframes, export NLE markers, and render map overlays without raw video leaving disk.
          </p>
          <div className="cta-row">
            <a
              href="https://github.com/MrManny/drone-path/blob/main/docs/user/cli.md#mcp-server"
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read MCP reference on GitHub
            </a>
            <Link href="/cli/" className="btn btn-secondary">
              View CLI overview
            </Link>
          </div>
          <div className="hero-command" role="region" aria-label="Start MCP server command">
            <span className="hero-command-prompt" aria-hidden="true">$</span>
            <code>npx drone-path mcp --allow-root /path/to/footage</code>
          </div>
        </div>
      </section>

      <section className="section section-alt" aria-labelledby="mcp-highlights-heading">
        <div className="container">
          <div className="notice" role="status" style={{ marginBottom: '32px' }}>
            <p>
              <strong>Documentation in progress:</strong> Client configuration snippets, security boundary details, and the complete 9-tool reference table are staged in the content draft branch.
            </p>
          </div>

          <div className="section-header">
            <p className="section-kicker">Safety &amp; tool surface</p>
            <h2 id="mcp-highlights-heading">Designed for safe local automation</h2>
          </div>

          <div className="card-grid-2">
            <article className="card">
              <h3>Strict root confinement</h3>
              <p>
                Requires <span className="inline-code">--allow-root</span>, validates canonical <span className="inline-code">realpath</span> boundaries against symlinks and traversal, protects the SQLite archive files, and refuses file overwrites by default.
              </p>
            </article>
            <article className="card">
              <h3>Nine structured tools</h3>
              <p>
                Covers archive scanning, clip and flight queries, point-in-gaze lookups, kinematic shot listing, per-clip telemetry inspection, keyframe extraction, marker export, and bounded map rendering.
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
