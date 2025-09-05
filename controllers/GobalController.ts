import { Controller } from "../libs/Controller";

export class GlobalController extends Controller {
    public homepage(){
        this.response.render("pages/homepage");
    }

    public easterEgg(){
        this.response.send("It's an easter egg");
    }
}