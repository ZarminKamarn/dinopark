import { Repository } from "../libs/Repository";
import { BookingRow } from "../libs/types/BookingRow";

export class BookingRepository extends Repository{
    public async createBooking(row: BookingRow, customer_id: number): Promise<number>{
        const query = {
            name: "insert-booking",
            text: `INSERT INTO booking (booking_date, purchase_date, park_id, customer_id) VALUES ($1, $2, $3, $4) RETURNING id`,
            values: [row.booking_date, row.purchase_date, row.park_id, customer_id],
        };

        try {
            const result = await this.pool.query(query);

            return parseInt(result.rows[0].id);
        } catch (error) {
            return -1;
        }
    }
}