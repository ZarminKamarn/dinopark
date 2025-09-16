import { Controller } from "../libs/Controller";
import { BookingRow } from "../libs/types/BookingRow";
import { CustomerRow } from "../libs/types/CustomerRow";
import { TicketBookingRow } from "../libs/types/TicketBookingRow";
import { Booking } from "../models/Booking";
import { Customer } from "../models/Customer";
import { Park } from "../models/Park";
import { Ticket } from "../models/Ticket";
import { TicketBooking } from "../models/TicketBooking";
import { ParkRepository } from "../repositories/ParkRepository"
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
        const tickes: Array<TicketBooking> = this.request.body.ticket.map((ticketNumber: string, id: number) => {
            return new TicketBooking(id+1, null, parseInt(ticketNumber));
        });

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

    public payment(){
        this.response.render("pages/bookingPayment", {price: 25});
    }

    public paymentReceived(){
        this.response.redirect("/booking/confirmation");
    }

    public async validation(){
        const parkRepository = new ParkRepository();
        const parks: Array<Park> = await parkRepository.findAll<Park>("park");

        const ticketRepository = new TicketRepository();
        const tickets: Array<Ticket> = await ticketRepository.findAll<Ticket>("ticket");
        
        if(this.request.session.booking && this.request.session.tickets){
            const booking: Booking = Booking.fromRow(this.request.session.booking);
            const tickets = this.request.session.tickets.map((ticket) => {
                return TicketBooking.fromRow(ticket);
            })

            const parkRepository = new ParkRepository();
            const park: Park | null = await parkRepository.findById<Park>("park", booking.getParkId().toString());

            const price = await this.calculateTicketsPrice(tickets);

            this.response.render("pages/bookingValidation", { park, price, date: booking.getReadableBookingDate()});

            this.request.session.destroy(() => {});
            return;
        }

        this.response.render("pages/booking", { parks, tickets });
    }

    private async calculateTicketsPrice(ticketBookings: Array<TicketBooking>): Promise<number>{
        const ticketRepository = new TicketRepository();
        const tickets: Array<Ticket> | null = await ticketRepository.findAll<Ticket>("ticket");

        let sum = 0;
        ticketBookings.forEach((ticketBooking) => {
            console.log(ticketBooking);
            const ticket: Ticket | undefined = tickets.find((aTicket) => {
                console.log(aTicket);
                return aTicket.getId() === ticketBooking.getTicketId();
            })
            if(ticket){
                sum += ticket.getPrice() * ticketBooking.getQuantity();
            }
        });
        console.log(sum);
        return sum;
    }
}
