export class Booking{
    private id: number | null;
    private purchase_date: Date;
    private booking_date: Date;
    private park_id: number;
    private customer_id: number;

    constructor(id: number | null, purchase_date: Date, booking_date: Date, park_id: number, customer_id: number){
        this.id = id;
        this.purchase_date = purchase_date;
        this.booking_date = booking_date;
        this.park_id = park_id;
        this.customer_id = customer_id;
    }

    public static fromRow(row): Booking{
        return new Booking(row.id, new Date(row.purchase_date), new Date(row.booking_date), row.park_id, row.customer_id);
    }

    public getId(): number | null{
        return this.id;
    }

    public getPurchaseDate(): Date{
        return this.purchase_date;
    }

    public getBookingDate(): Date{
        return this.booking_date;
    }

    public getParkId(): number{
        return this.park_id;
    }

    public getCustomerId(): number{
        return this.customer_id;
    }
}