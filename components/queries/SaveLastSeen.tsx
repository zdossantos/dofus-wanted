'use server'

import { LastSeenEntry, storeLastSeen } from '@/lib/db';
export async function saveLastSeen(data: LastSeenEntry) {
	return storeLastSeen({
		wanted_id: data.wanted_id,
		server_id: data.server_id,
		last_seen_at: data.last_seen_at
	});
}