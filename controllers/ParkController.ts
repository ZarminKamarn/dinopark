import { Controller } from "../libs/Controller";
import { Attraction } from "../models/Attraction";
import { Park } from "../models/Park";
import { ParkRepository } from "../repositories/ParkRepository";
import { AttractionRepository } from "../repositories/AttractionRepository";

export class ParkController extends Controller {
    public async park(){
        const parkRepository = new ParkRepository();
        const attractionRepository = new AttractionRepository();
        const park: Park | null = await parkRepository.findById<Park>("park", this.request.params.id);

        if(park){
            const attractions: Array<Attraction> = await attractionRepository.findByPark(this.request.params.id);
            this.response.render("pages/browseAttraction", { park, attractions });
            return;
        }

        this.response.render("errors/404");
    }
}