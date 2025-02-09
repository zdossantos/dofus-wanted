// utils/delay-calculations.ts
interface TimeValues {
	hours: number;
	minutes: number;
}

export interface DelayInfo {
	timeSinceLastSeen: number;
	timeUntilMinReappear: number;
	timeUntilMaxReappear: number;
	minReappearTime: Date | null;
	maxReappearTime: Date | null;
	isExpired: boolean;
	isInCooldown: boolean;
	remainingTime: TimeValues;
	statusColor: string;
	formattedLastSeen: string | null;
}

export function wantedCalculateDelay(lastSeenAt: Date | null, minDelay: number, maxDelay: number): DelayInfo {
	if (!lastSeenAt) {
		return {
			timeSinceLastSeen: 0,
			timeUntilMinReappear: 0,
			timeUntilMaxReappear: 0,
			minReappearTime: null,
			maxReappearTime: null,
			isExpired: false,
			isInCooldown: false,
			remainingTime: { hours: 0, minutes: 0 },
			statusColor: 'text-gray-500',
			formattedLastSeen: null
		};
	}

	const now = new Date().getTime();
	const lastSeenTime = lastSeenAt.getTime();

	// Conversion en minutes avec arrondi pour éviter les décimales
	const timeSinceLastSeen = Math.floor((now - lastSeenTime) / (1000 * 60));

	// Calcul des délais restants (ne peut pas être négatif)
	const timeUntilMinReappear = Math.max(0, minDelay - timeSinceLastSeen);
	const timeUntilMaxReappear = Math.max(0, maxDelay - timeSinceLastSeen);

	// Calcul des temps de réapparition
	const minReappearTime = new Date(lastSeenTime + minDelay * 60 * 1000);
	const maxReappearTime = new Date(lastSeenTime + maxDelay * 60 * 1000);

	const isExpired = timeSinceLastSeen >= maxDelay;
	const isInCooldown = timeSinceLastSeen < minDelay;

	// Utiliser le temps approprié selon l'état
	const relevantTime = isInCooldown ? timeUntilMinReappear : timeUntilMaxReappear;

	const remainingTime = {
		hours: Math.floor(Math.max(0, relevantTime) / 60),
		minutes: Math.floor(Math.max(0, relevantTime) % 60)
	};

	const formattedLastSeen = lastSeenAt.toLocaleTimeString('fr-FR', {
		hour: '2-digit',
		minute: '2-digit'
	});

	const statusColor = isExpired ? 'text-gray-500' : (isInCooldown ? 'text-red-500' : 'text-green-500');

	return {
		timeSinceLastSeen,
		timeUntilMinReappear,
		timeUntilMaxReappear,
		minReappearTime,
		maxReappearTime,
		isExpired,
		isInCooldown,
		remainingTime,
		statusColor,
		formattedLastSeen
	};
}