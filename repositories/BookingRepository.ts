import { Repository } from "../libs/Repository";
import { BookingRow } from "../libs/types/BookingRow";
import { Booking } from "../models/Booking";

export class BookingRepository extends Repository {
  public async createBooking(
    row: BookingRow,
    customer_id: number
  ): Promise<number> {
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

  public async findBookingsSinceDate(
    date: string,
    today: string
  ): Promise<Array<Booking>> {
    const query = {
      name: `fetch-booking-since-date`,
      text: `SELECT * FROM booking WHERE booking_date > $1 AND booking_date <= $2`,
      values: [date, today],
    };

    try {
      const result = await this.pool.query(query);

      const bookings = result.rows.map((row) => {
        return Booking.fromRow(row);
      });
      return bookings;
    } catch (error) {
      return [];
    }
  }
}
