// hooks/useWantedDelay.ts
import { useMemo } from 'react';
import {
	addMinutes,
	format,
	isToday,
	isTomorrow,
	isBefore,
	isAfter,
	endOfTomorrow
} from 'date-fns';
import { fr } from 'date-fns/locale';

interface WantedTimingInfo {
	lastSeenFormatted: string | null;
	nextMinAppearance: string;
	nextMaxAppearance: string;
	isInCooldown: boolean;
	canAppearNow: boolean;
	isExpired: boolean;
	displayValue: string; // Nouvelle propriété pour l'affichage du badge
}

const DEFAULT_RESPONSE: WantedTimingInfo = {
	lastSeenFormatted: null,
	nextMinAppearance: 'Pas d\'information',
	nextMaxAppearance: 'Pas d\'information',
	isInCooldown: false,
	canAppearNow: false,
	isExpired: false,
	displayValue: '?'
};

export function useWantedDelay(
	lastSeenAt: Date | null,
	minDelayMinutes: number,
	maxDelayMinutes: number
): WantedTimingInfo {
	return useMemo(() => {
		if (!lastSeenAt) {
			return DEFAULT_RESPONSE;
		}

		const now = new Date();
		const minDate = addMinutes(lastSeenAt, minDelayMinutes);
		const maxDate = addMinutes(lastSeenAt, maxDelayMinutes);
		const tomorrow = endOfTomorrow();

		// Si la date minimum ou maximum dépasse demain, on retourne comme si on n'avait pas d'info
		if (isAfter(minDate, tomorrow) || isAfter(maxDate, tomorrow)) {
			return DEFAULT_RESPONSE;
		}

		const formatDate = (date: Date) => {
			if (isToday(date)) {
				return format(date, 'HH:mm', { locale: fr });
			}
			if (isTomorrow(date)) {
				return `Demain à ${format(date, 'HH:mm', { locale: fr })}`;
			}
			return format(date, "'Le' dd MMMM yyyy 'à' HH:mm", { locale: fr });
		};

		const isInCooldown = isBefore(now, minDate);
		const isExpired = isAfter(now, maxDate);
		const canAppearNow = !isInCooldown && !isExpired;

		// Définir la valeur d'affichage pour le badge
		let displayValue = '?';
		if (!isExpired) {
			if (isInCooldown) {
				displayValue = formatDate(minDate);
			} else {
				displayValue = formatDate(maxDate);
			}
		}

		return {
			lastSeenFormatted: formatDate(lastSeenAt),
			nextMinAppearance: formatDate(minDate),
			nextMaxAppearance: formatDate(maxDate),
			isInCooldown,
			canAppearNow,
			isExpired,
			displayValue
		};
	}, [lastSeenAt, minDelayMinutes, maxDelayMinutes]);
}