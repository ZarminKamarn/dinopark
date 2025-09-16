import { DinosaurRow } from "../libs/types/DinosaurRow"

export class Dinosaur{
    private id: number | null;
    private nickname: string;
    private description: string;
    private image: string | null;
    private category_id: number;

    constructor(id: number | null, nickname: string, description: string, image: string | null, category_id: number){
        this.id = id;
        this.nickname = nickname;
        this.description = description;
        this.image = image;
        this.category_id = category_id;
    }

    public static fromRow(row: DinosaurRow): Dinosaur{
        return new Dinosaur(row.id, row.nickname, row.description, row.image, row.category_id);
    }

    public getId(): number | null{
        return this.id;
    }

    public getName(): string{
        return this.nickname;
    }

    public getDescription(): string{
        return this.description;
    }

    public getImage(): string | null{
        return this.image;
    }

    public getCategoryId(): number{
        return this.category_id;
    }
}