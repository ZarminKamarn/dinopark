import { Controller } from "../libs/Controller";
import { Park } from "../models/Park";
import { ParkRepository } from "../repositories/ParkRepository";

export class GlobalController extends Controller {
    public async homepage(){
        const parkRepository = new ParkRepository();
        const parks: Array<Park> = await parkRepository.findAll<Park>("park");

        this.response.render("pages/homepage", { parks });
    }

    public easterEgg(){
        this.response.send("It's an easter egg");
    }

    public login(){
    this.response.render("pages/login");
    }

    public stats(){
        this.response.send("Stats");
    }
}