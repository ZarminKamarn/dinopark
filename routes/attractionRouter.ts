import { Router } from "express";
import { AttractionController } from "../controllers/AttractionController";

const attractionRouter: Router = Router();

attractionRouter.get("/", (request, response) => {
  const attractionController = new AttractionController(request, response);
  attractionController.attractions();
});

attractionRouter.get("/:id", (request, response) => {
  const attractionController = new AttractionController(request, response);
  attractionController.attraction();
});

export default attractionRouter;
