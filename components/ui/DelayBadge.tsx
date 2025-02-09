// components/ui/DelayBadge.tsx
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';
import { useMediaQuery } from '@uidotdev/usehooks';
import { useWantedDelay } from '@/hooks/useWantedDelay';
import { useTranslation } from 'react-i18next';
import { formatDistanceToNow, addMinutes } from 'date-fns';
import { fr } from 'date-fns/locale';

interface DelayBadgeProps {
	lastSeenAt: Date | null;
	minDelay: number;
	maxDelay: number;
}


const DelayBadge = ({ lastSeenAt, minDelay, maxDelay }: DelayBadgeProps) => {
	const isDesktop = useMediaQuery("(min-width: 768px)");
	const timing = useWantedDelay(lastSeenAt, minDelay, maxDelay);
	const { t } = useTranslation();

	const getStatusColor = () => {
		if (!timing.lastSeenFormatted || timing.isExpired) return 'text-gray-500';
		if (timing.isInCooldown) return 'text-red-500';
		return 'text-green-500';
	};

	const content = (
		<div className="absolute top-2 left-2 bg-black/80 px-3 py-1 rounded-full z-10">
      <span className={`font-bold ${getStatusColor()}`}>
        {timing.displayValue}
      </span>
		</div>
	);


	// Si pas d'info ou pas en desktop, on retourne juste le badge
	if (!isDesktop || !timing.lastSeenFormatted || !lastSeenAt) return content;

	let tooltipText = `${t('common:apparition.last_seen_at', { time: timing.lastSeenFormatted })}\n`;

	if (timing.isExpired && timing.canAppearNow) {
		tooltipText += t('common:apparition.any_time');
	} else if (timing.isInCooldown) {
		tooltipText += t('common:apparition.min_delay', { time: timing.nextMinAppearance });
	} else {
		const availableSince = addMinutes(lastSeenAt, minDelay);
		tooltipText += `${t('common:apparition.max_delay', { time: timing.nextMaxAppearance })}\n${t('common:apparition.available_since', {
			time: formatDistanceToNow(availableSince, {
				locale: fr,
				includeSeconds: false,
				addSuffix: false 
			})
		})}`;
	}

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>{content}</TooltipTrigger>
				<TooltipContent>
					<p className="whitespace-pre-line">{tooltipText}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default DelayBadge;