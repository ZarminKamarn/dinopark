import { CustomerRow } from "../libs/types/CustomerRow";

export class Customer {
  private id: number | null;
  private first_name: string;
  private last_name: string;
  private email: string;

  constructor(
    id: number | null,
    first_name: string,
    last_name: string,
    email: string
  ) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
  }

  public static fromRow(row: CustomerRow): Customer {
    return new Customer(row.id, row.first_name, row.last_name, row.email);
  }

  public getId(): number | null {
    return this.id;
  }

  public getFirstName(): string {
    return this.first_name;
  }

  public getLastName(): string {
    return this.last_name;
  }

  public getEmail(): string {
    return this.email;
  }
}
