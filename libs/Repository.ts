import { Pool } from "pg";
import { Database } from "./Database";

export abstract class Repository {
    protected pool: Pool;

    constructor(){
        this.pool = Database.getPool();
    }

    public async findAll<T>(table: string): Promise<Array<T>>{
        const query = {
            name: `fetch-all-${table}`,
            text: `select * from ${table}`
        }

        try {
            const result = this.pool.query(query);
            return [];
        } catch (error) {
            return [];
        }
    }

    public async findById<T>(table: string, id: string): Promise<Array<T>>{
        const query = {
            name: `find-${table}-by-id`,
            text: `select * from ${table} where id = $1`,
            values: [id]
        }

        try {
            const result = this.pool.query(query);
            return [];
        } catch (error) {
            return [];
        }
    }
}