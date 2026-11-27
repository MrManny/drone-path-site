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
    default: 'Drone Path – Free DJI Flight Path Map Overlay & GPS Telemetry Extractor',
    template: '%s · Drone Path',
  },
  description:
    'Free, open-source tool that extracts GPS telemetry from DJI drone videos and renders flight-path map overlays. Export GPX, KML, or GeoJSON and search footage by location.',
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
    title: 'Drone Path – Free DJI Flight Path Map Overlay & GPS Telemetry Extractor',
    description:
      'Turn the GPS data in your DJI drone videos into synchronized flight-path map overlays, GPX/KML tracks, a searchable footage library, and AI-ready MCP tools. Free and open source.',
    images: [
      {
        url: '/images/app-archive-workspace.jpg',
        width: 1600,
        height: 950,
        alt: 'Drone Path Desktop Archive workspace displaying watched folders, flight-grouped recordings, and colored flight tracks on a multi-flight satellite map',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Drone Path – Free flight path map overlays for DJI drone videos',
    description:
      'Free, open-source desktop app, CLI, and MCP server that turn DJI drone telemetry into map overlay videos and GPX/KML tracks.',
    images: ['/images/app-archive-workspace.jpg'],
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
