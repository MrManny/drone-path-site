import type { Metadata } from 'next';

export const SITE_URL = 'https://dronepath.dev';
export const SITE_NAME = 'Drone Path';

export interface OgImageSpec {
  url: string;
  width: number;
  height: number;
  alt: string;
}

export const DEFAULT_OG_IMAGE: OgImageSpec = {
  url: '/images/app-main-window.jpg',
  width: 1440,
  height: 900,
  alt: 'Drone Path desktop app displaying a drone recording beside a synchronized 2D flight map',
};

interface PageMetadataOptions {
  title?: string;
  description: string;
  path: '/' | '/desktop/' | '/cli/' | '/mcp/';
  ogTitle?: string;
  ogDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  image?: OgImageSpec;
}

export function createPageMetadata({
  title,
  description,
  path,
  ogTitle,
  ogDescription,
  twitterTitle,
  twitterDescription,
  image = DEFAULT_OG_IMAGE,
}: PageMetadataOptions): Metadata {
  const resolvedOgTitle =
    ogTitle ?? (title ? `${title} · ${SITE_NAME}` : SITE_NAME);
  const resolvedOgDescription = ogDescription ?? description;
  const pageUrl = new URL(path, SITE_URL).toString();

  return {
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: pageUrl,
      siteName: SITE_NAME,
      title: resolvedOgTitle,
      description: resolvedOgDescription,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: twitterTitle ?? resolvedOgTitle,
      description: twitterDescription ?? resolvedOgDescription,
      images: [image.url],
    },
  };
}
