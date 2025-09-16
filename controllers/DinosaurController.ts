import { Controller } from "../libs/Controller";
import { Dinosaur } from "../models/Dinosaur";
import { DinosaurRepository } from "../repositories/DinosaurRepository";

export class DinosaurController extends Controller {
    public async dinosaur(){
        const dinosaurRepository = new DinosaurRepository();
        const dinosaur: Dinosaur | null = await dinosaurRepository.findById<Dinosaur>("dinosaur", this.request.params.id);

        if(dinosaur){
            this.response.render("pages/readDinosaur", { dinosaur });
            return;
        }

        this.response.status(404).render("errors/404");
    }

    public async dinosaurs(){
        const dinosaurRepository = new DinosaurRepository();
        const dinosaurs: Array<Dinosaur> = await dinosaurRepository.findAll<Dinosaur>("dinosaur");

        this.response.render("pages/browseDinosaur", { dinosaurs });
    }
}