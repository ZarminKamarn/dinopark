import { ParkRow } from "../libs/types/ParkRow";

export class Park {
  private id: number | null;
  private name: string;
  private capacity: number;
  private opening_time: string;
  private closing_time: string;

  constructor(
    id: number | null,
    name: string,
    capacity: number,
    opening_time: string,
    closing_time: string
  ) {
    this.id = id;
    this.name = name;
    this.capacity = capacity;
    this.opening_time = opening_time.slice(0, 5);
    this.closing_time = closing_time.slice(0, 5);
  }

  public static fromRow(row: ParkRow): Park {
    return new Park(
      row.id,
      row.name,
      row.capacity,
      row.opening_time,
      row.closing_time
    );
  }

  public getId(): number | null {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getCapacity(): number {
    return this.capacity;
  }

  public getOpeningTime(): string {
    return this.opening_time;
  }

  public getClosingTime(): string {
    return this.closing_time;
  }
}
