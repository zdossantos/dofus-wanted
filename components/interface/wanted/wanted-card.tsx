// components/interface/wanted/wanted-card.tsx
'use client';

import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import DelayBadge from '@/components/ui/DelayBadge';
import { SelectWanted } from '@/lib/db';
import { useTranslation } from 'react-i18next';
import { useWantedStore } from '@/hooks/useWantedStore';

interface WantedCardProps {
	wanted: SelectWanted;
	minDelay: number;
	maxDelay: number;
}

export function WantedCard({ wanted, minDelay, maxDelay }: WantedCardProps) {
	const { t } = useTranslation();
	const setSelectedWanted = useWantedStore((state) => state.setSelectedWanted);

	const LevelBadge = ({ level }: { level: number }) => (
		<div className="absolute top-2 right-2 bg-black/80 text-white px-3 py-1 rounded-full z-10">
			<span className="font-bold">{t('common:level', { level })}</span>
		</div>
	);

	const handleClick = () => {
		setSelectedWanted(wanted);
	};

	return (
		<Card
			className="overflow-hidden hover:shadow-lg transition-shadow h-40 relative min-w-[200px] flex group"
			onClick={handleClick}
		>
			<LevelBadge level={wanted.level} />
			<div>
				<DelayBadge
					lastSeenAt={wanted.last_seen_at}
					minDelay={minDelay}
					maxDelay={maxDelay}
				/>
			</div>
			<CardContent className="p-4 flex-1 flex flex-col items-center justify-center">
				<div className="relative mb-2">
					<Image
						src={'/img/wanted/' + wanted.slug + '.png'}
						alt={wanted.slug}
						width={100}
						height={100}
						className="object-cover rounded-lg"
					/>
				</div>
				<h3 className="text-center font-medium">{t('wanteds:' + wanted.slug)}</h3>
			</CardContent>
		</Card>
	);
}