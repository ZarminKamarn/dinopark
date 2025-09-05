import dotenv from "dotenv";
import { Pool } from "pg";

export class Database{
    private static pool: Pool;

    public static getPool(): Pool{
        if(!Database.pool){
            dotenv.config();

            Database.pool = new Pool({
                user: process.env.PGUSER,
                password: process.env.PGPASSWORD,
                host: process.env.PGHOST,
                port: process.env.PGPORT ? parseInt(process.env.PGPORT) : undefined,
                database: process.env.PGDATABASE
            });
        }

        return Database.pool;
    }
}