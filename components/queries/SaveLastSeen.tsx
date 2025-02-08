'use server'

import { LastSeenEntry, storeLastSeen } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function saveLastSeen(data: LastSeenEntry) {
	await storeLastSeen({
		wanted_id: data.wanted_id,
		server_id: data.server_id,
		last_seen_at: data.last_seen_at
	});

	// Revalidate the page
	revalidatePath(`/${data.server_id}`);
}