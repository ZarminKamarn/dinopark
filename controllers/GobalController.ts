import z from "zod";
import { Controller } from "../libs/Controller";
import { loginSchema } from "../libs/validation/loginSchema";
import { Park } from "../models/Park";
import { ParkRepository } from "../repositories/ParkRepository";
import { AdminRepository } from "../repositories/AdminRepository";
import { AdminRow } from "../libs/types/AdminRow";
import { BookingRepository } from "../repositories/BookingRepository";
import { Booking } from "../models/Booking";
import { TicketBookingRepository } from "../repositories/TicketBookingRepository";
import { TicketBooking } from "../models/TicketBooking";

export class GlobalController extends Controller {
    public async homepage(){
        const parkRepository = new ParkRepository();
        const parks: Array<Park> = await parkRepository.findAll<Park>("park");

        this.response.render("pages/homepage", { parks });
    }

    public easterEgg(){
        this.response.send("It's an easter egg");
    }

    public login(){
        this.response.render("pages/login", { errors: "", loginError: false, databaseError: false, data: "" });
    }

    public async loginReceived(){
        const result = loginSchema.safeParse(this.request.body);
        if (!result.success) {
            const errors = z.treeifyError(result.error);
            this.response.status(400).render("pages/login", { errors: errors.properties, loginError: false, databaseError: false, data: this.request.body });
            return;
        }
        
        const adminRepository = new AdminRepository();
        const admin: AdminRow = {
            id: null,
            email: this.request.body.email,
            password: this.request.body.password
        }
        const exists: number = await adminRepository.findIfExists(admin);

        if(exists === 0){
            this.response.status(400).render("pages/login", { errors: "", loginError: true, databaseError: false, data: this.request.body });
            return;
        }
        if(exists === -1){
            this.response.status(500).render("pages/login", { errors: "", loginError: false, databaseError: true, data: this.request.body });
            return;
        }
        this.response.redirect("/stats");
    }

    public async stats(){
        const date7DaysAgo: Date = new Date((new Date()).getDate() - 7);
        const today: Date = new Date();

        const bookingRepository = new BookingRepository();
        const bookings: Array<Booking> = await bookingRepository.findBookingsSinceDate(date7DaysAgo.toLocaleString(), today.toLocaleString());

        const dates: Array<string> = bookings.map((booking) => {
            return booking.getReadableBookingDate();
        });

        
        this.response.render("pages/stats", {dates});
    }
}