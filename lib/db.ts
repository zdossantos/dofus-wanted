import 'server-only';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import {
  pgTable,
  text,
  serial, boolean, integer
} from 'drizzle-orm/pg-core';
import { asc, count, desc, ilike } from 'drizzle-orm';
export const db = drizzle(neon(process.env.POSTGRES_URL!));

export const servers = pgTable('servers', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull(),
  img_slug: text('img_slug').notNull(),
  mono: boolean('mono').notNull().default(false),
});

export const wanteds = pgTable('wanteds', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull(),
  level: integer('level').notNull(),
  min_delay: integer('min_delay').notNull(),
  max_delay: integer('max_delay').notNull()
});

export type SortBy = "asc" | "desc";

export interface SelectServer {
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
}

export async function getServers(
  search: string,
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
  orderBy?: SortBy
): Promise<{
  wanteds: SelectWanted[];
  totalWanteds: number;
}> {
  if (search) {
    return {
      wanteds: await db
        .select()
        .from(wanteds)
        .where(ilike(wanteds.slug, `%${search}%`))
        .orderBy(orderBy === "desc" ? desc(wanteds.slug) : asc(wanteds.slug)),
      totalWanteds: 0
    };
  }

  let totalWanteds = await db.select({ count: count() }).from(wanteds);
  let moreWanteds = await db
    .select()
    .from(wanteds)
    .orderBy(wanteds.slug);

  return {
    wanteds: moreWanteds,
    totalWanteds: totalWanteds[0].count
  };
}

