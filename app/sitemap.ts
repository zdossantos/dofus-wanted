import { allServers } from "../lib/servers";

const baseUrl = process.env.APP_URL || 'https://dofus-wanted.zdossantos.fr';

type SitemapEntry = {
  url: string;
  lastModified: Date;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
};

export default async function sitemap(): Promise<SitemapEntry[]> {
  // Pages statiques
  const staticPages: SitemapEntry[] = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Pages dynamiques (serveurs)
  const serverPages: SitemapEntry[] = allServers.map((server) => ({
    url: `${baseUrl}/${server.id}`,
    lastModified: new Date(),
    changeFrequency: 'hourly' as const,
    priority: 0.9,
  }));

  // Combinez toutes les URLs
  return [...staticPages, ...serverPages];
}