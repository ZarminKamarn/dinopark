import { Controller } from "../libs/Controller";
import { Attraction } from "../models/Attraction";
import { Dinosaur } from "../models/Dinosaur";
import { AttractionRepository } from "../repositories/AttractionRepository";
import { DinosaurRepository } from "../repositories/DinosaurRepository";

export class AttractionController extends Controller {
  public async attractions() {
    const attractionRepository = new AttractionRepository();
    const attractions: Array<Attraction> =
      await attractionRepository.findAll<Attraction>("attraction");

    this.response.render("pages/browseAttraction", { park: "", attractions });
  }

  public async attraction() {
    const attractionRepository = new AttractionRepository();
    const attraction: Attraction | null =
      await attractionRepository.findById<Attraction>(
        "attraction",
        this.request.params.id
      );

    if (attraction) {
      const dinosaurRepository = new DinosaurRepository();
      const dinosaurs: Array<Dinosaur> =
        await dinosaurRepository.findByAttraction(this.request.params.id);
      this.response.render("pages/readAttraction", { attraction, dinosaurs });
      return;
    }

    this.response.status(404).render("errors/404");
  }
}
