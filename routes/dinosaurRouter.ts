import { Router } from "express";
import { DinosaurController } from "../controllers/DinosaurController";

const dinosaurRouter: Router = Router();

dinosaurRouter.get("/:id" ,(request, response) => {
    const dinosaurController = new DinosaurController(request, response);
    dinosaurController.dinosaur();
});

export default dinosaurRouter;