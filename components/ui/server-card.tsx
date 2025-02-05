'use client';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { SelectServer } from '@/lib/db';
import Link from 'next/link';
import { useTranslation } from "next-i18next";

export const ServerCard = (props: { server: SelectServer }) => {
	const getServerName = (serverSlug:string) => {
		const { t, i18n } = useTranslation('servers');
		const fullServerKey = `${serverSlug}`;
		const isFullKeyExists = i18n.exists(fullServerKey);

		if (isFullKeyExists) {
			return t(fullServerKey);
		}
		const [baseName, suffix] = serverSlug.split('-');
		const baseTranslation = t(baseName);
		return `${baseTranslation} ${suffix}`;
	};

	const server_name = getServerName(props.server.slug);

	return (
		<Link href={`/${props.server.id}`}>
			<Card className="overflow-hidden hover:shadow-lg transition-shadow relative h-60  group cursor-pointer">
				<Image
					src={'/img/servers/' + props.server.img_slug + '.webp'}
					alt={server_name}
					width={200}
					height={200}
					className="object-cover rounded-lg absolute mb-2 size-full group-hover:scale-105 transition"
				/>
				<CardContent
					className="flex flex-col items-center justify-center  rounded-t-lg absolute bottom-0 w-full px-4 backdrop-blur text-xl font-bold h-12 p-0 bg-background/50">
					<h3 className="text-center font-medium">{server_name}</h3>
				</CardContent>
			</Card>
		</Link>
	);
};