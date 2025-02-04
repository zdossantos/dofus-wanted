import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';
import NumberFlow from '@number-flow/react';

interface DelayBadgeProps {
	lastSeenAt: Date | null;
	minDelay: number;
	maxDelay: number;
}

const formatTime = (date: Date) => {
	return date.toLocaleTimeString('fr-FR', {
		hour: '2-digit',
		minute: '2-digit'
	});
};
const DelayBadge = ({ lastSeenAt, minDelay, maxDelay }: DelayBadgeProps) => {
	if (!lastSeenAt) {
		return (
			<div className="absolute top-2 left-2 bg-black/80 px-3 py-1 rounded-full z-10">
				<span className="font-bold text-gray-500">?</span>
			</div>
		);
	}

	const now = Date.now();
	const timeSinceLastSeen = (now - lastSeenAt.getTime()) / (1000 * 60);
	const timeUntilMinReappear = minDelay - timeSinceLastSeen;
	const timeUntilMaxReappear = maxDelay - timeSinceLastSeen;
	const minReappearTime = new Date(lastSeenAt.getTime() + minDelay * 60 * 1000);
	const maxReappearTime = new Date(lastSeenAt.getTime() + maxDelay * 60 * 1000);

	const getTimeDisplay = (minutes: number) => {
		const hours = Math.floor(minutes / 60);
		const mins = Math.floor(minutes % 60);

		return (
			<span className={'inline-flex items-center'}>
        {hours > 0 && <NumberFlow value={hours} prefix="~" suffix={'h'} />}
				{(mins > 0 || hours === 0) && (
					<NumberFlow value={mins} prefix={hours > 0 ? '' : '~'} suffix={'m'} />
				)}
      </span>
		);
	};

	const getDelayDisplay = () => {
		if (timeSinceLastSeen > maxDelay) return '?';
		if (timeSinceLastSeen < minDelay) {
			return getTimeDisplay(timeUntilMinReappear);
		}
		return getTimeDisplay(timeUntilMaxReappear);
	};

	const getDelayColor = () => {
		if (timeSinceLastSeen > maxDelay) return 'text-gray-500';
		return timeSinceLastSeen < minDelay ? 'text-red-500' : 'text-green-500';
	};

	const getTooltipText = () => {
		const baseText = `Dernière apparition : ${formatTime(lastSeenAt)}`;

		if (timeSinceLastSeen > maxDelay) {
			return `${baseText}\nPeut réapparaître à tout moment`;
		}

		if (timeSinceLastSeen < minDelay) {
			return `${baseText}\nRéapparition possible à partir de ${formatTime(minReappearTime)}`;
		}

		return `${baseText}\nRéapparition possible jusqu'à ${formatTime(maxReappearTime)}`;
	};

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<div className="absolute top-2 left-2 bg-black/80 px-3 py-1 rounded-full z-10">
            <span className={`font-bold ${getDelayColor()}`}>
              {getDelayDisplay()}
            </span>
					</div>
				</TooltipTrigger>
				<TooltipContent>
					<p className="whitespace-pre-line">{getTooltipText()}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default DelayBadge;