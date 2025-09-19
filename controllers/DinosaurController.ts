import { Controller } from "../libs/Controller";
import { Dinosaur } from "../models/Dinosaur";
import { DinosaurCategory } from "../models/DinosaurCategory";
import { DinosaurCategoryRepository } from "../repositories/DinosaurCategoryRepository";
import { DinosaurRepository } from "../repositories/DinosaurRepository";

export class DinosaurController extends Controller {
  public async dinosaur() {
    const dinosaurRepository = new DinosaurRepository();
    const dinosaur: Dinosaur | null =
      await dinosaurRepository.findById<Dinosaur>(
        "dinosaur",
        this.request.params.id
      );

    if (dinosaur) {
      const categoryRepository = new DinosaurCategoryRepository();
      const category: DinosaurCategory | null =
        await categoryRepository.findById<DinosaurCategory>(
          "dinosaurcategory",
          dinosaur.getCategoryId().toString()
        );

      this.response.render("pages/readDinosaur", {
        dinosaur,
        type: category?.getType(),
      });
      return;
    }

    this.response.status(404).render("errors/404");
  }

  public async dinosaurs() {
    const dinosaurRepository = new DinosaurRepository();
    const dinosaurs: Array<Dinosaur> =
      await dinosaurRepository.findAll<Dinosaur>("dinosaur");

    this.response.render("pages/browseDinosaur", { dinosaurs });
  }
}
