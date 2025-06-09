import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from 'react';
import "./globals.css";
import './i18n';
import i18nConfig from '../app/i18nConfig';
import { Analytics } from '@vercel/analytics/react';
import initTranslations from '@/app/i18n';
import TranslationProvider from '@/components/TranslationProvider';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Dofus Wanted - Suivi des avis de recherche Dofus en temps réel",
	description: "Suivez et gérez les avis de recherche Dofus sur tous les serveurs. Trouvez leur temps de réapparition. Outil essentiel pour les chasseurs d'avis de recherche.",
	keywords: [
    	"Dofus", "avis de recherche", "wanted", "rechercher joueur", "chasse aux primes", "Dofus tracker", "avis Dofus", "recherche Dofus", 
    	"joueurs recherchés", "suivi avis", "Dofus outil", "Dofus chasseur", "prime Dofus", "chasse prime Dofus", "avis recherche Dofus", "temps avis Dofus"
  	],
	openGraph: {
    	title: "Dofus Wanted - Suivi des avis de recherche Dofus en temps réel",
    	description: "Suivez et gérez les avis de recherche Dofus sur tous les serveurs. Outil essentiel pour les chasseurs de primes.",
    	url: "https://dofus-wanted.zdossantos.fr",
    	siteName: "Dofus Wanted",
    	images: [
      	{
        	url: "/android-icon-192x192.png",
        	width: 192,
        	height: 192,
        	alt: "Dofus Wanted Logo",
      	},
    	],
    	locale: 'fr_FR',
    	type: 'website',
  	},
  	twitter: {
    	card: 'summary_large_image',
    	title: 'Dofus Wanted - Suivi des avis de recherche Dofus',
    	description: 'Suivez les avis de recherche Dofus en temps réel sur tous les serveurs',
    	images: ['/android-icon-192x192.png'],
  	},
  	robots: {
    	index: true,
    	follow: true,
    	nocache: true,
    	googleBot: {
      	index: true,
      	follow: true,
      	noimageindex: true,
      	'max-video-preview': -1,
      	'max-image-preview': 'large',
      	'max-snippet': -1,
    	},
  	},
  	verification: {
    	google: 'AKgIx9bxdB_uJ7h2DyJmHSRsBguhPl3Kh4SE84DXEu8',
  	},
  	category: 'jeu vidéo',
  	applicationName: 'Dofus Wanted',
  	creator: 'Dofus Wanted',
  	publisher: 'Dofus Wanted',
  	formatDetection: {
    	email: false,
    	address: false,
    	telephone: false,
  	},
};

export function generateStaticParams() {
	return i18nConfig.locales.map((locale) => ({ locale }));
}
const i18nNamespaces = ['servers','wanteds','common'];

type Params = Promise<{ locale: string, server_id: number }>
export default async function RootLayout({
									   children, params
								   }: Readonly<{
	children: React.ReactNode;
	params: Params
}>) {
	const params_ = await params;
	const { resources } = await initTranslations(params_.locale, i18nNamespaces);
	return (
		<html lang={params_.locale} className={"dark"} suppressHydrationWarning>
		<head>
			<link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
			<link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
			<link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
			<link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
			<link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
			<link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
			<link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
			<link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
			<link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
			<link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
			<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
			<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
			<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
		</head>
		<TranslationProvider locale={params_.locale} resources={resources} namespaces={i18nNamespaces}>
			<body className={inter.className} suppressHydrationWarning>{children}</body>
			<Analytics />
		</TranslationProvider>
		</html>
	);
}