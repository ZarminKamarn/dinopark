import { Repository } from "../libs/Repository";
import { DinosaurRow } from "../libs/types/DinosaurRow";
import { Dinosaur } from "../models/Dinosaur";

export class DinosaurRepository extends Repository {
  async findByCategory(category_id: string): Promise<Array<Dinosaur>> {
    const query = {
      name: "fetch-dinosaur-by-category",
      text: `SELECT * FROM dinosaur WHERE category_id = $1`,
      values: [category_id],
    };

    try {
      const result = await this.pool.query(query);

      const dinos = result.rows.map((row: DinosaurRow) => {
        return Dinosaur.fromRow(row);
      });

      return dinos;
    } catch (error) {
      return [];
    }
  }

  async findByAttraction(attraction_id: string): Promise<Array<Dinosaur>> {
    const query = {
      name: "fetch-dinosaur-by-attraction",
      text: `
                SELECT d.*
                FROM dinosaur d
                JOIN attraction_dinosaur ad
                ON d.id = ad.dinosaur_id
                WHERE ad.attraction_id = $1`,
      values: [attraction_id],
    };

    try {
      const result = await this.pool.query(query);

      const dinos = result.rows.map((row) => {
        return Dinosaur.fromRow(row);
      });

      return dinos;
    } catch (error) {
      return [];
    }
  }
}
