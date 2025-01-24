import { guestsTable } from "@/db/schema";

export type Guest = typeof guestsTable.$inferSelect
