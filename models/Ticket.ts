export class Ticket{
    private id: number | null;
    private title: string;
    private price: number;

    constructor(id: number | null, title: string, price: number){
        this.id = id;
        this.title = title;
        this.price = price;
    }

    public static fromRow(row): Ticket{
        return new Ticket(row.id, row.title, row.price);
    }

    public getId(): number | null{
        return this.id;
    }

    public getTitle(): string{
        return this.title;
    }

    public getPrice(): number{
        return this.price;
    }
}