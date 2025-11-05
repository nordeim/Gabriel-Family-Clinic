/**
 * Robots.txt Configuration
 * Defines search engine crawling directives
 */

import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://gabrielfamilyclinic.com';
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',           // Block API endpoints
          '/_next/',         // Block Next.js internals
          '/admin/',         // Block admin area (if added later)
        ],
      },
      {
        userAgent: 'GPTBot',
        disallow: ['/'],     // Block OpenAI crawler (healthcare privacy)
      },
      {
        userAgent: 'CCBot',
        disallow: ['/'],     // Block Common Crawl (healthcare privacy)
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
