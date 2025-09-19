import { AttractionRow } from "../libs/types/AttractionRow";

export class Attraction {
  private id: number | null;
  private name: string;
  private type: string;
  private min_height: number;
  private children_are_allowed: boolean;
  private image: string | null;
  private park_id: number;

  constructor(
    id: number | null,
    name: string,
    type: string,
    min_height: number,
    children_are_allowed: boolean,
    image: string | null,
    park_id: number
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.min_height = min_height;
    this.children_are_allowed = children_are_allowed;
    this.image = image;
    this.park_id = park_id;
  }

  public static fromRow(row: AttractionRow): Attraction {
    return new Attraction(
      row.id,
      row.name,
      row.type,
      row.min_height,
      row.children_are_allowed,
      row.image,
      row.park_id
    );
  }

  public getId(): number | null {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getType(): string {
    return this.type;
  }

  public getMinHeight(): number {
    return this.min_height;
  }

  public getChildrenAreAllowed(): boolean {
    return this.children_are_allowed;
  }

  public getImage(): string | null {
    return this.image;
  }

  public getParkId(): number {
    return this.park_id;
  }
}
