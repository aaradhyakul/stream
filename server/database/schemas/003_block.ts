import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
    db.schema
        .createTable("block")
        .addColumn("id", "uuid", (col) =>
            col.primaryKey().defaultTo(sql`gen_random_uuid()`)
        )
        .addColumn("blocker_id", "uuid", (col) =>
            col.references("user.id").notNull().onDelete("cascade")
        )
        .addColumn("blocked_id", "uuid", (col) =>
            col.references("user.id").notNull().onDelete("cascade")
        )
        .addUniqueConstraint("blocker_id_blocked_id_unique", [
            "blocked_id",
            "blocker_id",
        ])
        .execute();
    db.schema
        .createIndex("blocker_id_index")
        .on("block")
        .column("blocker_id")
        .execute();
    db.schema
        .createIndex("blocked_id_index")
        .on("block")
        .column("blocked_id")
        .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
    db.schema.dropTable("block").execute();
}
