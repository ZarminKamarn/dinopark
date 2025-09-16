import { Repository } from "../libs/Repository";

export class AdminRepository extends Repository{
    public async findIfExists(email: string, password: string): Promise<number>{
        const query = {
            name: "fetch-attraction-by-park",
            text: `SELECT count(id) AS exist FROM administrator WHERE email = $1 AND password = $2`,
            values: [email, password],
        };

        try {
            const result = await this.pool.query(query);

            return parseInt(result.rows[0].exist);
        } catch (error) {
            return -1;
        }
    }
}