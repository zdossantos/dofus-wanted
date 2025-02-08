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
	title: "Dofus Wanted",
	description: "Un outil pour trouver les avis de recherche de Dofus",
};

export function generateStaticParams() {
	return i18nConfig.locales.map((locale) => ({ locale }));
}
const i18nNamespaces = ['servers','wanteds','common'];
export default async function RootLayout({
									   children, params: {locale}
								   }: Readonly<{
	children: React.ReactNode;
	params: {locale: string}
}>) {
	const { resources } = await initTranslations(locale, i18nNamespaces);
	return (
		<html lang={locale} className={"dark"} suppressHydrationWarning>
		<TranslationProvider locale={locale} resources={resources} namespaces={i18nNamespaces}>
		<body className={inter.className} suppressHydrationWarning>{children}</body>
		<Analytics/>
		</TranslationProvider>
		</html>
	);
}