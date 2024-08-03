import { boolean, pgTable, serial, text } from 'drizzle-orm/pg-core';

export const task = pgTable('task', {
  id: serial('id').primaryKey(),
  item: text('item').notNull(),
  checked: boolean('checked').notNull(),
});
