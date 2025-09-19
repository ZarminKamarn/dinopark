import { DinosaurCategoryRow } from "../libs/types/DinosaurCategoryRow";

export class DinosaurCategory {
  private id: number | null;
  private name: string;
  private diet: string;
  private description: string;
  private type: string;

  constructor(
    id: number | null,
    name: string,
    diet: string,
    description: string,
    type: string
  ) {
    this.id = id;
    this.name = name;
    this.diet = diet;
    this.description = description;
    this.type = type;
  }

  public static fromRow(row: DinosaurCategoryRow): DinosaurCategory {
    return new DinosaurCategory(
      row.id,
      row.name,
      row.diet,
      row.description,
      row.type
    );
  }

  public getId(): number | null {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getDiet(): string {
    return this.diet;
  }

  public getDescription(): string {
    return this.description;
  }

  public getType(): string {
    return this.type;
  }
}
