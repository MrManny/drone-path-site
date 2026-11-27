import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const LAST_MODIFIED = '2026-11-27';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dronepath.dev';

  return [
    {
      url: `${baseUrl}/`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 1.0,
      images: [
        `${baseUrl}/images/app-main-window.jpg`,
        `${baseUrl}/images/example-map-satellite.jpg`,
        `${baseUrl}/images/example-map-topo-hud.jpg`,
      ],
    },
    {
      url: `${baseUrl}/desktop/`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.9,
      images: [
        `${baseUrl}/images/app-review-split.jpg`,
        `${baseUrl}/images/app-review-overlay.jpg`,
        `${baseUrl}/images/app-loop-points.jpg`,
        `${baseUrl}/images/app-review-map-appearance.jpg`,
        `${baseUrl}/images/app-export-form.jpg`,
      ],
    },
    {
      url: `${baseUrl}/cli/`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.9,
      images: [
        `${baseUrl}/images/example-map-topo-hud.jpg`,
        `${baseUrl}/images/example-map-satellite.jpg`,
      ],
    },
    {
      url: `${baseUrl}/mcp/`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.9,
      images: [`${baseUrl}/images/app-main-window.jpg`],
    },
  ];
}
