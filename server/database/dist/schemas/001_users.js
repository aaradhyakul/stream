import { sql } from "kysely";
export async function up(db) {
    await db.schema
        .createTable("user")
        .addColumn("id", "uuid", (col) => col.primaryKey().defaultTo(sql `gen_random_uuid()`))
        .addColumn("username", "text", (col) => col.unique().notNull())
        .addColumn("image_url", "text", (col) => col.notNull())
        .addColumn("external_user_id", "text", (col) => col.unique().notNull())
        .addColumn("bio", "text")
        .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql `now()`).notNull())
        .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql `now()`).notNull())
        .execute();
}
export async function down(db) {
    await db.schema.dropTable("user").execute();
}
