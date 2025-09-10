import { Controller } from "../libs/Controller";

export class AttractionController extends Controller {
    public attractions(){
        this.response.send("attractions");
    }

    public attraction(){
        const id = this.request.params.id;
        this.response.send("attraction " + id);
    }
}
