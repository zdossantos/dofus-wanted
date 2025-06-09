import Head from 'next/head';
import { useTranslation } from 'react-i18next';

interface CustomHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  locale?: string;
}

export const CustomHead = ({
  title: customTitle,
  description: customDescription,
  keywords: customKeywords = [],
  image = '/android-icon-192x192.png',
  url: customUrl,
  type = 'website',
  locale = 'fr_FR',
}: CustomHeadProps) => {
  const { t } = useTranslation('common');
  
  const siteName = 'Dofus Wanted';
  const defaultDescription = t('seo.defaultDescription', 'Suivez et gérez les avis de recherche Dofus sur tous les serveurs. Outil essentiel pour les chasseurs de primes.');
  const defaultTitle = t('seo.defaultTitle', 'Dofus Wanted - Suivi des avis de recherche en temps réel');
  
  const title = customTitle ? `${customTitle} | ${siteName}` : defaultTitle;
  const description = customDescription || defaultDescription;
  const url = customUrl || 'https://dofus-wanted.zdossantos.fr';
  
  const defaultKeywords = [
    'Dofus', 'avis de recherche', 'wanted', 'rechercher joueur', 'chasse aux primes',
    'Dofus tracker', 'avis Dofus', 'recherche Dofus', 'joueurs recherchés',
    'suivi avis', 'Dofus outil', 'Dofus chasseur', 'prime Dofus'
  ];
  
  //@ts-ignore
  const keywords = [...new Set([...defaultKeywords, ...customKeywords])].join(', ');

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
  );
};

export default CustomHead;
