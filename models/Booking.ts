import { BookingRow } from "../libs/types/BookingRow";

export class Booking {
  private id: number | null;
  private purchase_date: Date;
  private booking_date: Date;
  private park_id: number;
  private customer_id: number | null;

  constructor(
    id: number | null,
    purchase_date: Date,
    booking_date: Date,
    park_id: number,
    customer_id: number | null
  ) {
    this.id = id;
    this.purchase_date = purchase_date;
    this.booking_date = booking_date;
    this.park_id = park_id;
    this.customer_id = customer_id;
  }

  public static fromRow(row: BookingRow): Booking {
    return new Booking(
      row.id,
      new Date(row.purchase_date),
      new Date(row.booking_date),
      row.park_id,
      row.customer_id
    );
  }

  public getId(): number | null {
    return this.id;
  }

  public getPurchaseDate(): Date {
    return this.purchase_date;
  }

  public getBookingDate(): Date {
    return this.booking_date;
  }

  public getParkId(): number {
    return this.park_id;
  }

  public getCustomerId(): number | null {
    return this.customer_id;
  }

  public getReadableBookingDate(): string {
    const months = [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ];
    const day: number = this.booking_date.getDate();
    const month: string = months[this.booking_date.getMonth()];
    const year: number = this.booking_date.getFullYear();
    return `${day.toString()} ${month} ${year.toString()}`;
  }
}
