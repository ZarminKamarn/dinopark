import { Pool } from "pg";
import { Database } from "./Database";
import { Attraction } from "../models/Attraction";
import { Customer } from "../models/Customer";
import { Booking } from "../models/Booking";
import { Dinosaur } from "../models/Dinosaur";
import { DinosaurCategory } from "../models/DinosaurCategory";
import { Park } from "../models/Park";
import { Ticket } from "../models/Ticket";
import { TicketBooking } from "../models/TicketBooking";

export abstract class Repository {
    protected pool: Pool;

    constructor(){
        this.pool = Database.getPool();
    }

    public async findAll<T>(table: string): Promise<Array<T>>{
        const query = {
            name: `fetch-all-${table}`,
            text: `select * from ${table}`
        }

        try {
            const result = await this.pool.query(query);

            const data = result.rows.map((row) => {
                if(table === "attraction"){
                    return Attraction.fromRow(row);
                }
        
                if(table === "customer"){
                    return Customer.fromRow(row);
                }
        
                if(table === "booking"){
                    return Booking.fromRow(row);
                }
        
                if(table === "dinosaur"){
                    return Dinosaur.fromRow(row);
                }

                if(table === "dinosaurcategory"){
                    return DinosaurCategory.fromRow(row);
                }

                if(table === "park"){
                    return Park.fromRow(row);
                }

                if(table === "ticket"){
                    return Ticket.fromRow(row);
                }

                if(table === "ticket_booking"){
                    return TicketBooking.fromRow(row);
                }
            });
            return data as T[];
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    public async findById<T>(table: string, id: string): Promise<T | null>{
        const query = {
            name: `find-${table}-by-id`,
            text: `select * from ${table} where id = $1`,
            values: [id]
        }

        try {
            const result = await this.pool.query(query);
            
            if(table === "attraction"){
                return Attraction.fromRow(result.rows[0]) as T;
            }
    
            if(table === "customer"){
                return Customer.fromRow(result.rows[0]) as T;
            }
    
            if(table === "booking"){
                return Booking.fromRow(result.rows[0]) as T;
            }
    
            if(table === "dinosaur"){
                return Dinosaur.fromRow(result.rows[0]) as T;
            }

            if(table === "dinosaurcategory"){
                return DinosaurCategory.fromRow(result.rows[0]) as T;
            }

            if(table === "park"){
                return Park.fromRow(result.rows[0]) as T;
            }

            if(table === "ticket"){
                return Ticket.fromRow(result.rows[0]) as T;
            }

            if(table === "ticket_booking"){
                return TicketBooking.fromRow(result.rows[0]) as T;
            }

            return null;
        } catch (error) {
            return null;
        }
    }
}