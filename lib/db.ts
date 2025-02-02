import 'server-only';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import {
  pgTable,
  text,
  numeric,
  integer,
  timestamp,
  pgEnum,
  serial, boolean
} from 'drizzle-orm/pg-core';
import { count, eq, ilike } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';

export const db = drizzle(neon(process.env.POSTGRES_URL!));

export const statusEnum = pgEnum('status', ['active', 'inactive', 'archived']);

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  imageUrl: text('image_url').notNull(),
  name: text('name').notNull(),
  status: statusEnum('status').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  stock: integer('stock').notNull(),
  availableAt: timestamp('available_at').notNull()
});

export type SelectProduct = typeof products.$inferSelect;

export const servers = pgTable('servers', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull(),
  img_slug: text('img_slug').notNull(),
  mono: boolean('mono').notNull().default(false),
});

export async function getProducts(
  search: string,
  offset: number
): Promise<{
  products: SelectProduct[];
  newOffset: number | null;
  totalProducts: number;
}> {
  // Always search the full table, not per page
  if (search) {
    return {
      products: await db
        .select()
        .from(products)
        .where(ilike(products.name, `%${search}%`))
        .limit(1000),
      newOffset: null,
      totalProducts: 0
    };
  }

  if (offset === null) {
    return { products: [], newOffset: null, totalProducts: 0 };
  }

  let totalProducts = await db.select({ count: count() }).from(products);
  let moreProducts = await db.select().from(products).limit(5).offset(offset);
  let newOffset = moreProducts.length >= 5 ? offset + 5 : null;

  return {
    products: moreProducts,
    newOffset,
    totalProducts: totalProducts[0].count
  };
}

export async function deleteProductById(id: number) {
  await db.delete(products).where(eq(products.id, id));
}


export interface SelectServer {
  slug: string;
  img_slug: string;
  mono: boolean;
}

export async function getServers(
  search: string,
  offset: number
): Promise<{
  servers: SelectServer[];
  newOffset: number | null;
  totalServers: number;
}> {
  if (search) {
    return {
      servers: await db
        .select()
        .from(servers)
        .where(ilike(servers.slug, `%${search}%`))
        .orderBy(servers.slug)
        .limit(100),
      newOffset: null,
      totalServers: 0
    };
  }

  if (offset === null) {
    return { servers: [], newOffset: null, totalServers: 0 };
  }

  let totalServers = await db.select({ count: count() }).from(servers);
  let moreServers = await db
    .select()
    .from(servers)
    .orderBy(servers.slug)
    .limit(100)
    .offset(offset);

  let newOffset = moreServers.length >= 5 ? offset + 5 : null;

  return {
    servers: moreServers,
    newOffset,
    totalServers: totalServers[0].count
  };
}