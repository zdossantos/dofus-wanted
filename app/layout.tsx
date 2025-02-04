import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import QueryProvider from '@/components/QueryProvider';
import '../i18n/i18n'
import  i18n from 'i18next';
export const metadata = {
	title: 'Next.js App Router + NextAuth + Tailwind CSS',
	description:
		'A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, and Prettier.'
};

export default function RootLayout({
									   children
								   }: {
	children: React.ReactNode;
}) {

	return (
		<html lang={i18n.language} className={'dark'}>
		<QueryProvider>
			<body className="flex min-h-screen w-full flex-col">{children}</body>
			<Analytics />
		</QueryProvider>
		</html>
	);
}
