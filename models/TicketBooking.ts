import { TicketBookingRow } from "../libs/types/TicketBookingRow";

export class TicketBooking {
  private ticket_id: number;
  private booking_id: number | null;
  private quantity: number;

  constructor(ticket_id: number, booking_id: number | null, quantity: number) {
    this.ticket_id = ticket_id;
    this.booking_id = booking_id;
    this.quantity = quantity;
  }

  public static fromRow(row: TicketBookingRow): TicketBooking {
    return new TicketBooking(row.ticket_id, row.booking_id, row.quantity);
  }

  public getTicketId(): number {
    return this.ticket_id;
  }

  public getBookingId(): number | null {
    return this.booking_id;
  }

  public getQuantity(): number {
    return this.quantity;
  }
}
