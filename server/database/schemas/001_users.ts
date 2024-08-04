import { Kysely } from "kysely";
import { sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .createTable("users")
        .addColumn("id", "uuid", (col) =>
            col.primaryKey().defaultTo(sql`gen_random_uuid()`)
        )
        .addColumn("username", "text", (col) => col.unique().notNull())
        .addColumn("imageUrl", "text", (col) => col.notNull())
        .addColumn("externalUserId", "text", (col) => col.unique().notNull())
        .addColumn("bio", "text")
        .addColumn("created_at", "timestamp", (col) =>
            col.defaultTo(sql`now()`).notNull()
        )
        .addColumn("updated_at", "timestamp", (col) =>
            col.defaultTo(sql`now()`).notNull()
        )
        .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable("users").execute();
}
