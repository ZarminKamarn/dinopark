import { Router } from "express";
import { DinoCategoryController } from "../controllers/DinoCategoryController";

const dinoCategoryRouter: Router = Router();

dinoCategoryRouter.get("/", (request, response) => {
  const dinoCategoryController = new DinoCategoryController(request, response);
  dinoCategoryController.categories();
});

dinoCategoryRouter.get("/:id", (request, response) => {
  const dinoCategoryController = new DinoCategoryController(request, response);
  dinoCategoryController.category();
});

export default dinoCategoryRouter;
