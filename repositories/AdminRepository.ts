import { Repository } from "../libs/Repository";
import { AdminRow } from "../libs/types/AdminRow";

export class AdminRepository extends Repository {
  public async findIfExists(admin: AdminRow): Promise<number> {
    const query = {
      name: "fetch-attraction-by-park",
      text: `SELECT count(id) AS exist FROM administrator WHERE email = $1 AND password = $2`,
      values: [admin.email, admin.password],
    };

    try {
      const result = await this.pool.query(query);

      return parseInt(result.rows[0].exist);
    } catch (error) {
      return -1;
    }
  }
}
