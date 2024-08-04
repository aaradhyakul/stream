import { Migrator, FileMigrationProvider } from "kysely";
import fs from "fs/promises";
import path from "path";
import { Kysely, PostgresDialect } from "kysely";
import { DB } from "kysely-codegen";
import pg from "pg";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const db = new Kysely<DB>({
    dialect: new PostgresDialect({
        pool: new pg.Pool({
            connectionString: process.env.DATABASE_URL,
        }),
    }),
});

const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
        fs,
        path,
        migrationFolder: path.join(__dirname, "schemas"),
    }),
});

async function runMigrations() {
    const { results, error } = await migrator.migrateToLatest();
    if (results) {
        results.forEach((result) => {
            if (result.status === "Success") {
                console.log(`Migration ${result.migrationName} succesfull`);
            } else if (result.status === "Error") {
                console.log(`Migration ${result.migrationName} failed`);
            }
        });
    }
    if (error) {
        console.log("Migration failed: ", error);
    }
}
runMigrations().catch((e) => console.log(e));
