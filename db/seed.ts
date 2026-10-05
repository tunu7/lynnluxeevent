/**
 * Copies the original content/*.ts entries into the database. Safe to re-run:
 * existing rows (matched by slug) are left untouched.
 *
 *   npm run db:seed
 */
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { events as seedEvents } from "../content/events";
import { services as seedServices } from "../content/services";
import { events, services } from "./schema";

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL });
  const db = drizzle(pool);

  const insertedEvents = await db
    .insert(events)
    .values(seedEvents.map((event, position) => ({ ...event, position })))
    .onConflictDoNothing({ target: events.slug })
    .returning({ slug: events.slug });

  const insertedServices = await db
    .insert(services)
    .values(seedServices.map((service, position) => ({ ...service, position })))
    .onConflictDoNothing({ target: services.slug })
    .returning({ slug: services.slug });

  console.log(`Seeded ${insertedEvents.length} events and ${insertedServices.length} services.`);
  await pool.end();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
