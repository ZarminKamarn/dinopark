import { Repository } from "../libs/Repository";
import { Attraction } from "../models/Attraction";

export class AttractionRepository extends Repository{
    async findByPark(park_id: string): Promise<Array<Attraction>> {
        const query = {
            name: "fetch-attraction-by-park",
            text: `SELECT * FROM attraction WHERE park_id = $1`,
            values: [park_id],
        };

        try {
            const result = await this.pool.query(query);

            const attractions = result.rows.map((row) => {
                return Attraction.fromRow(row);
            })

            return attractions;
        } catch (error) {
            return [];
        }
    }
}