import z from "zod";
import { Controller } from "../libs/Controller";
import { BookingRow } from "../libs/types/BookingRow";
import { CustomerRow } from "../libs/types/CustomerRow";
import { TicketBookingRow } from "../libs/types/TicketBookingRow";
import { paymentSchema } from "../libs/validation/bookingSchema";
import { Booking } from "../models/Booking";
import { Customer } from "../models/Customer";
import { Park } from "../models/Park";
import { Ticket } from "../models/Ticket";
import { TicketBooking } from "../models/TicketBooking";
import { BookingRepository } from "../repositories/BookingRepository";
import { CustomerRepository } from "../repositories/CustomerRepository";
import { ParkRepository } from "../repositories/ParkRepository"
import { TicketBookingRepository } from "../repositories/TicketBookingRepository";
import { TicketRepository } from "../repositories/TicketRepository"

export class BookingController extends Controller {
    public async booking(){
        const parkRepository = new ParkRepository();
        const parks: Array<Park> = await parkRepository.findAll<Park>("park");

        const ticketRepository = new TicketRepository();
        const tickets: Array<Ticket> = await ticketRepository.findAll<Ticket>("ticket");
        
        this.response.render("pages/booking", { parks, tickets });
    }

    public bookingReceived(){
        const booking: BookingRow = {
            id: null,
            booking_date: new Date().toString(),
            purchase_date: this.request.body.bookingDate,
            park_id: this.request.body.park,
            customer_id: null
        };

        const customer: CustomerRow = {
            id: null,
            first_name: this.request.body.firstName,
            last_name: this.request.body.lastName,
            email: this.request.body.email
        }

        const tickets: Array<TicketBookingRow> = this.request.body.ticket.map((ticketNumber: string, id: number): TicketBookingRow => {
            return {ticket_id: id+1 , booking_id: null, quantity: parseInt(ticketNumber)};
        });

        this.request.session.booking = booking;
        this.request.session.customer = customer;
        this.request.session.tickets = tickets;

        this.response.redirect("/booking/payment");
    }

    public async payment(){
        const tickets: Array<TicketBooking> = this.request.session.tickets.map((ticket) => {
            return TicketBooking.fromRow(ticket);
        });
        const price = await this.calculateTicketsPrice(tickets);

        this.response.render("pages/bookingPayment", { price, errors: "", data: "" });
    }

    public async paymentReceived(){
        const result = paymentSchema.safeParse(this.request.body);

        const tickets: Array<TicketBooking> = this.request.session.tickets.map((ticket) => {
            return TicketBooking.fromRow(ticket);
        });
        const price = await this.calculateTicketsPrice(tickets);

        if(!result.success){
            const errors = z.treeifyError(result.error);
            this.response.status(400).render("pages/bookingPayment", { price, errors: errors.properties, data: this.request.body });
            return;
        }

        if(this.request.session.customer && this.request.session.booking && this.request.session.tickets){
            const customerRepository = new CustomerRepository();
            const customerId: number = await customerRepository.createCustomer(this.request.session.customer);

            const bookingRepository = new BookingRepository();
            const bookingId: number = await bookingRepository.createBooking(this.request.session.booking, customerId);

            const ticketBookingRepository = new TicketBookingRepository();
            this.request.session.tickets.forEach((ticket) => {
                ticketBookingRepository.createTicketBooking(ticket, bookingId);
            });

            this.response.redirect("/booking/confirmation");
            return;
        }
        this.response.redirect("/booking");
    }

    public async validation(){        
        if(this.request.session.booking && this.request.session.tickets){
            const booking: Booking = Booking.fromRow(this.request.session.booking);
            const tickets: Array<TicketBooking> = this.request.session.tickets.map((ticket) => {
                return TicketBooking.fromRow(ticket);
            });

            const parkRepository = new ParkRepository();
            const park: Park | null = await parkRepository.findById<Park>("park", booking.getParkId().toString());

            const price = await this.calculateTicketsPrice(tickets);

            this.response.render("pages/bookingValidation", { park, price, date: booking.getReadableBookingDate()});

            this.request.session.destroy(() => {});
            return;
        }

        this.response.redirect("/booking");
    }

    private async calculateTicketsPrice(ticketBookings: Array<TicketBooking>): Promise<number>{
        const ticketRepository = new TicketRepository();
        const tickets: Array<Ticket> | null = await ticketRepository.findAll<Ticket>("ticket");

        let sum = 0;
        ticketBookings.forEach((ticketBooking) => {
            const ticket: Ticket | undefined = tickets.find((aTicket) => {
                return aTicket.getId() === ticketBooking.getTicketId();
            })
            if(ticket){
                sum += ticket.getPrice() * ticketBooking.getQuantity();
            }
        });
        return sum;
    }
}
