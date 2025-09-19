import { BookingRow } from "./BookingRow";
import { CustomerRow } from "./CustomerRow";
import { TicketBookingRow } from "./TicketBookingRow";

declare module "express-session" {
  interface Session {
    booking?: BookingRow;
    customer?: CustomerRow;
    tickets: Array<TicketBookingRow>;
  }
}
