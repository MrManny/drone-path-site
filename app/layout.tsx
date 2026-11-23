import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { SiteFooter } from '../components/SiteFooter';
import { SiteHeader } from '../components/SiteHeader';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#232323',
  colorScheme: 'dark',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://dronepath.dev'),
  title: {
    default: 'Drone Path — Flight-path map overlays, spatial archive, and MCP server for DJI footage',
    template: '%s · Drone Path',
  },
  description:
    'Render synchronized 2D flight-path map videos from DJI drone recordings, index local footage in a spatial SQLite archive, and expose tools to AI agents via MCP.',
  keywords: [
    'Drone Path',
    'drone-path',
    'DJI Neo 2',
    'DVTM',
    'flight path map overlay',
    'drone telemetry',
    'GPX export',
    'spatial archive',
    'MCP server',
    'Model Context Protocol',
  ],
  authors: [{ name: 'Manuel Warum', url: 'https://github.com/MrManny' }],
  creator: 'Manuel Warum',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dronepath.dev/',
    siteName: 'Drone Path',
    title: 'Drone Path — Flight-path map overlays, spatial archive, and MCP server for DJI footage',
    description:
      'Turn embedded DJI telemetry into synchronized flight-path map overlays, searchable local archives, and agent-ready MCP tools.',
    images: [
      {
        url: '/images/app-main-window.jpg',
        width: 1440,
        height: 900,
        alt: 'Drone Path desktop app displaying a drone recording beside a synchronized 2D flight map',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Drone Path — Flight-path map overlays for DJI drone footage',
    description:
      'Desktop review app, CLI renderer with spatial SQLite archive, and stdio MCP server for DJI drone recordings.',
    images: ['/images/app-main-window.jpg'],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main id="main-content" className="site-main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
