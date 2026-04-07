import { sql } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const shortShareUrls = sqliteTable('short_share_url', {
  id: text('id').primaryKey(),
  data: text('data').notNull(),
  created_at: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
  expires_at: text('expires_at').default(sql`(datetime('now', '+6 months'))`),
});
