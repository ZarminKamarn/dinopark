import { Repository } from "../libs/Repository";
import { CustomerRow } from "../libs/types/CustomerRow";

export class CustomerRepository extends Repository {
  public async createCustomer(row: CustomerRow): Promise<number> {
    const query = {
      name: "insert-customer",
      text: `INSERT INTO customer (first_name, last_name, email) VALUES ($1, $2, $3) RETURNING id`,
      values: [row.first_name, row.last_name, row.email],
    };

    try {
      const result = await this.pool.query(query);

      return parseInt(result.rows[0].id);
    } catch (error) {
      return -1;
    }
  }
}
