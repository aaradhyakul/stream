import { sql } from "kysely";
export async function up(db) {
    await db.schema
        .createTable("follow")
        .addColumn("id", "uuid", (col) => col.primaryKey().defaultTo(sql `gen_random_uuid()`))
        .addColumn("following_id", "uuid", (col) => col.references("user.id").onDelete("cascade").notNull())
        .addColumn("follower_id", "uuid", (col) => col.references("user.id").onDelete("cascade").notNull())
        .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql `now()`).notNull())
        .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql `now()`).notNull())
        .addUniqueConstraint("follower_id following_id", [
        "follower_id",
        "following_id",
    ])
        .execute();
    await db.schema
        .createIndex("follower_id_index")
        .on("follow")
        .column("follower_id")
        .execute();
    await db.schema
        .createIndex("following_id_index")
        .on("follow")
        .column("following_id")
        .execute();
}
export async function down(db) {
    await db.schema.dropTable("follow").execute();
}
