import { db } from "@/db";
import { guestsTable } from "@/db/schema";
import { sql } from "drizzle-orm";

export async function fetchGuestCount() {
  const sum = await db.select({
    sum: sql<number>`SUM(${guestsTable.count})`
  }).from(guestsTable)

  if (sum.length === 0) return 0;
  return sum[0].sum ?? 0;
}
