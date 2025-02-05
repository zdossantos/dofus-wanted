'use client';

import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import DelayBadge from '@/components/ui/DelayBadge';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { SelectWanted } from '@/lib/db';
import { useTranslation } from 'react-i18next';

interface WantedCardProps {
	wanted: SelectWanted;
	minDelay: number;
	maxDelay: number;
	serverId: number;
	onSubmit: (date: Date) => void;
}

const LevelBadge = ({ level }: { level: number }) => (
	<div className="absolute top-2 right-2 bg-black/80 text-white px-3 py-1 rounded-full z-10">
		<span className="font-bold">Niv. {level}</span>
	</div>
);

export function WantedCard({ wanted, minDelay, maxDelay,onSubmit }: WantedCardProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [date, setDate] = useState(new Date(Date.now()));
	const { t } = useTranslation('wanteds');

	return (
		<Card className="overflow-hidden hover:shadow-lg transition-shadow h-40 relative min-w-[200px] flex">
			<LevelBadge level={wanted.level} />
			<div className={'relative group'}>
				<Button
					variant="outline"
					size="sm"
					onClick={() => setIsEditing(true)}
					className={`absolute  left-2 z-50 top-2 gap-2 invisible group-hover:visible`}
				>
					<Pencil size={16} />
					Modifier
				</Button>
				<div>
					<DelayBadge
						lastSeenAt={wanted.last_seen_at}
						minDelay={minDelay}
						maxDelay={maxDelay}
					/>
				</div>
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
				<h3 className="text-center font-medium">{t(wanted.slug)}</h3>

				{isEditing && (
					<div
						className="absolute z-50 inset-0 backdrop-blur p-2 flex flex-col items-center justify-end gap-2">
						<Input
							type="datetime-local"
							placeholder="Heure de la journée"
							value={date.toLocaleString('sv').slice(0, 16)}
							onChange={(e) => setDate(new Date(e.target.value))}
							className="[color-scheme:light] dark:[color-scheme:dark] flex justify-center"
						/>
						<div className={'inline-flex gap-1 items-center'}>
							<Button
								variant="outline"
								size="sm"
								onClick={() => setIsEditing(false)}
								className="mt-2"
							>
								Annuler
							</Button>
							<Button
								variant="default"
								size="sm"
								onClick={() => {
									onSubmit(date);
									setIsEditing(false);
								}}
								className="mt-2"
							>
								Valider
							</Button>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
}