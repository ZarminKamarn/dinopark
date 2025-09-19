import { Repository } from "../libs/Repository";
import { TicketBookingRow } from "../libs/types/TicketBookingRow";
import { TicketBooking } from "../models/TicketBooking";

export class TicketBookingRepository extends Repository {
  public async createTicketBooking(
    row: TicketBookingRow,
    booking_id: number
  ): Promise<boolean> {
    const query = {
      name: "insert-ticket-booking",
      text: `INSERT INTO ticket_booking (ticket_id, quantity, booking_id) VALUES ($1, $2, $3)`,
      values: [row.ticket_id, row.quantity, booking_id],
    };

    try {
      return true;
    } catch (error) {
      return false;
    }
  }
}
