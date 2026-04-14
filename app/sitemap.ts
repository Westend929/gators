import { MetadataRoute } from 'next';

const baseUrl = 'https://gatorstoursandsafaris.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/safaris`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/itineraries`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
    },
  ];
}
