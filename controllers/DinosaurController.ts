import { Controller } from "../libs/Controller";

export class DinosaurController extends Controller {
    public dinosaur(){
        const id = this.request.params.id;
        this.response.send("dinosaur " + id);
    }

    public dinosaurs(){
        this.response.send("dinosaurs");
    }
}