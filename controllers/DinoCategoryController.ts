import { Controller } from "../libs/Controller";

export class DinoCategoryController extends Controller {
    public categories(){
        this.response.send("categories");
    }

    public category(){
        const id = this.request.params.id;
        this.response.send("Categorie " + id);
    }
}
