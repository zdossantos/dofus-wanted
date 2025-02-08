import 'server-only';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { boolean, integer, pgTable, serial, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core';
import { and, asc, count, desc, eq, ilike } from 'drizzle-orm';

export const db = drizzle(neon(process.env.POSTGRES_URL!));

export const servers = pgTable('servers', {
	id: serial('id').primaryKey(),
	slug: text('slug').notNull(),
	img_slug: text('img_slug').notNull(),
	mono: boolean('mono').notNull().default(false)
});

export const wanteds = pgTable('wanteds', {
	id: serial('id').primaryKey(),
	slug: text('slug').notNull(),
	level: integer('level').notNull(),
	min_delay: integer('min_delay').notNull(),
	max_delay: integer('max_delay').notNull()
});

export const lastSeenAt = pgTable('last_seen_at', {
	id: serial('id').primaryKey(),
	wanted_id: integer('wanted_id')
		.notNull()
		.references(() => wanteds.id),
	server_id: integer('server_id')
		.notNull()
		.references(() => servers.id),
	last_seen_at: timestamp('last_seen_at').notNull()
}, (table) => ({
	unique_wanted_server: uniqueIndex('unique_wanted_server').on(table.wanted_id, table.server_id)
}));

export type SortBy = 'asc' | 'desc';

export interface SelectServer {
	id: number;
	slug: string;
	img_slug: string;
	mono: boolean;
}

export interface SelectWanted {
	id: number;
	slug: string;
	level: number;
	min_delay: number;
	max_delay: number;
	last_seen_at: Date | null;
}

export interface LastSeenEntry {
	wanted_id: number;
	server_id: number;
	last_seen_at: Date;
}


export async function getServers(
	search: string
): Promise<{
	servers: SelectServer[];
	totalServers: number;
}> {
	if (search) {
		return {
			servers: await db
				.select()
				.from(servers)
				.where(ilike(servers.slug, `%${search}%`))
				.orderBy(servers.slug),
			totalServers: 0
		};
	}

	let totalServers = await db.select({ count: count() }).from(servers);
	let moreServers = await db
		.select()
		.from(servers)
		.orderBy(servers.slug);
	return {
		servers: moreServers,
		totalServers: totalServers[0].count
	};
}

export async function getWanteds(
	search: string,
	serverId: number,
	orderBy?: SortBy
): Promise<{
	wanteds: SelectWanted[];
	totalWanteds: number;
}> {
	const baseQuery = db
			.select({
				id: wanteds.id,
				slug: wanteds.slug,
				level: wanteds.level,
				min_delay: wanteds.min_delay,
				max_delay: wanteds.max_delay,
				last_seen_at: lastSeenAt.last_seen_at,
			})
			.from(wanteds)
			.leftJoin(
				lastSeenAt,
				and(
					eq(lastSeenAt.wanted_id, wanteds.id),
					eq(lastSeenAt.server_id, serverId)
				)
			)

	if (search) {
		const results = await baseQuery
			.where(ilike(wanteds.slug, `%${search}%`))
			.orderBy(orderBy === 'desc' ? desc(wanteds.slug) : asc(wanteds.slug));

		return {
			wanteds: results,
			totalWanteds: 0
		};
	}

	let totalWanteds = await db.select({ count: count() }).from(wanteds);
	const results = await baseQuery.orderBy(wanteds.slug);
	return {
		wanteds: results,
		totalWanteds: totalWanteds[0].count
	};
}

export async function storeLastSeen(entry: LastSeenEntry): Promise<void> {
	await db
		.insert(lastSeenAt)
		.values({
			wanted_id: entry.wanted_id,     // Modifier ici
			server_id: entry.server_id,     // Modifier ici
			last_seen_at: entry.last_seen_at
		})
		.onConflictDoUpdate({
			target: [lastSeenAt.wanted_id, lastSeenAt.server_id],
			set: {
				last_seen_at: entry.last_seen_at
			}
		});
}