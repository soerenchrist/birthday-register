import { integer, pgTable, timestamp, varchar, boolean, uuid } from "drizzle-orm/pg-core";

export const guestsTable = pgTable("guests", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  attending: boolean().notNull(),
  count: integer().notNull(),
  updatedAt: timestamp().defaultNow(),
})
