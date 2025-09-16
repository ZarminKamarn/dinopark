import { Controller } from "../libs/Controller";
import { Dinosaur } from "../models/Dinosaur";
import { DinosaurCategory } from "../models/DinosaurCategory";
import { DinosaurCategoryRepository } from "../repositories/DinosaurCategoryRepository"
import { DinosaurRepository } from "../repositories/DinosaurRepository"

export class DinoCategoryController extends Controller {
    public async categories(){
        const categoryRepository = new DinosaurCategoryRepository();
        const categories: Array<DinosaurCategory> = await categoryRepository.findAll<DinosaurCategory>("dinosaurcategory");

        this.response.render("pages/browseDinoCategory", { categories, image: "" });
    }

    public async category(){
        const categoryRepository = new DinosaurCategoryRepository();
        const category: DinosaurCategory | null = await categoryRepository.findById<DinosaurCategory>("dinosaurcategory", this.request.params.id);

        if(category){
            const dinosaurRepository = new DinosaurRepository();
            const dinosaurs: Array<Dinosaur> = await dinosaurRepository.findByCategory(this.request.params.id);
            this.response.render("pages/readDinoCategory", { category, dinosaurs });
            return;
        }

        this.response.status(404).render("errors/404");
    }
}
