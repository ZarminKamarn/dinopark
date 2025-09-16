import { Controller } from "../libs/Controller";
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
        const booking: Booking = new Booking(null, new Date(), new Date(this.request.body.bookingDate), this.request.body.park, null);
        const customer: Customer = new Customer(null, this.request.body.firstName, this.request.body.lastName, this.request.body.email);
        const tickets: Array<TicketBooking> = this.request.body.ticket.map((ticketNumber: string, id: number) => {
            return new TicketBooking(id, null, parseInt(ticketNumber));
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
        console.log(this.request.session.booking);
    }

    public async validation(){
        const parkRepository = new ParkRepository();
        const park: Park | null = await parkRepository.findById<Park>("park", "1");

        this.response.render("pages/bookingValidation", { park, price: 25, date: "3 octobre 2028"});
    }
}
