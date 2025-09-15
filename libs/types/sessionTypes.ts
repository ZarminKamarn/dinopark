import { Booking } from "../../models/Booking";
import { Customer } from "../../models/Customer";
import { TicketBooking } from "../../models/TicketBooking";

declare module "express-session" {
    interface Session {
        booking?: Booking,
        customer?: Customer,
        tickets: Array<TicketBooking>
    }
}