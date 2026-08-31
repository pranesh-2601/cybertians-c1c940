import { jsonb, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const demoEvents = pgTable('demo_events', {
  id: serial().primaryKey(),
  type: text().notNull(),
  payload: jsonb().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
