// components/interface/wanted/wanted-update-modal.tsx
import { Button } from '@/components/ui/button';
import {
	Credenza,
	CredenzaContent,
	CredenzaDescription,
	CredenzaFooter,
	CredenzaHeader,
	CredenzaTitle
} from '@/components/ui/credenza';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useWantedStore } from '@/hooks/useWantedStore';
import Image from 'next/image';
import { useWantedDelay } from '@/hooks/useWantedDelay';
import { formatDistanceToNow, addMinutes } from 'date-fns';
import { fr } from 'date-fns/locale';
import { saveLastSeen } from '@/components/queries/SaveLastSeen';

export function WantedUpdateModal(props: { serverId: number }) {
	const { t } = useTranslation();
	const [date, setDate] = useState(new Date());
	const { selectedWanted, setSelectedWanted } = useWantedStore();
	const timing = useWantedDelay(
		selectedWanted?.last_seen_at ?? null,
		selectedWanted?.min_delay ?? 0,
		selectedWanted?.max_delay ?? 0
	);

	const handleSubmit = (date: Date) => {
		if (!selectedWanted) return;
		saveLastSeen({
			wanted_id: selectedWanted.id,
			server_id: props.serverId,
			last_seen_at: new Date(date)
		});
	};

	if (!selectedWanted) return null;

	const getStatusInfo = () => {
		if (!timing.lastSeenFormatted) {
			return [{
				label: t('common:apparition.status'),
				value: t('common:apparition.unknown'),
				color: 'text-gray-500'
			}];
		}

		if (timing.isExpired) {
			return [{
				label: t('common:apparition.status'),
				value: '?',  // Changé ici pour juste afficher ? au lieu du texte "disponible"
				color: 'text-gray-500'
			}];
		}

		if (timing.isInCooldown) {
			return [{
				label: t('common:apparition.next_appearance'),
				value: timing.nextMinAppearance,
				color: 'text-red-500'
			}];
		}

		return [
			{
				label: t('common:apparition.available_until'),
				value: timing.nextMaxAppearance,
				color: 'text-green-500'
			},
			{
				label: t('common:apparition.duration'),
				value: t('common:apparition.available_since', {
					time: formatDistanceToNow(
						addMinutes(selectedWanted.last_seen_at!, selectedWanted.min_delay),
						{ locale: fr, includeSeconds: false, addSuffix: false }
					)
				}),
				color: 'text-green-500'
			}
		];
	};

	return (
		<Credenza
			open={!!selectedWanted}
			onOpenChange={(open) => !open && setSelectedWanted(null)}
		>
			<CredenzaContent>
				<CredenzaHeader>
					<CredenzaTitle>
						{t('common:update_wanted', { wanted: selectedWanted.slug })}
					</CredenzaTitle>
					<CredenzaDescription>
						{t('common:enter_found_date')}
						{t('wanteds:' + selectedWanted.slug)}
					</CredenzaDescription>
				</CredenzaHeader>

				<div className="flex flex-col items-center space-y-4 mb-6">
					<div className="relative w-32 h-32">
						<Image
							src={'/img/wanted/' + selectedWanted.slug + '.png'}
							alt={selectedWanted.slug}
							fill
							className="object-contain"
						/>
					</div>
					<h3 className="font-medium text-lg">
						{t('wanteds:' + selectedWanted.slug)}
					</h3>

					<div className="w-full max-w-sm mx-auto bg-secondary/50 rounded-lg p-4 space-y-2">
						{timing.lastSeenFormatted && (
							<div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">
                  {t('common:apparition.last_seen')}:
                </span>
								<span className="font-medium">
                  {timing.lastSeenFormatted}
                </span>
							</div>
						)}

						{getStatusInfo().map((info, index) => (
							<div
								key={index}
								className="flex justify-between items-center text-sm"
							>
                <span className="text-muted-foreground">
                  {info.label}:
                </span>
								<span className={`font-medium ${info.color}  text-end`}>
                  {info.value}
                </span>
							</div>
						))}
					</div>
				</div>

				<div className="space-y-2 flex flex-col items-center justify-center">
					<label className="text-sm text-muted-foreground">
						{t('common:apparition.new_appearance')}:
					</label>
					<Input
						type="datetime-local"
						placeholder={t('common:day_time')}
						value={date.toLocaleString('sv').slice(0, 16)}
						onChange={(e) => setDate(new Date(e.target.value))}
						className="[color-scheme:light] dark:[color-scheme:dark] w-fit"
					/>
				</div>

				<CredenzaFooter>
					<Button variant="outline" onClick={() => setSelectedWanted(null)}>
						{t('common:cancel')}
					</Button>
					<Button
						onClick={() => {
							handleSubmit(date);
							setSelectedWanted(null);
						}}
					>
						{t('common:validate')}
					</Button>
				</CredenzaFooter>
			</CredenzaContent>
		</Credenza>
	);
}