import { Router } from "express";
import { GlobalController } from "../controllers/GobalController";

const globalRouter: Router = Router();

globalRouter.get("/", (request, response) => {
    const globalController = new GlobalController(request, response);
    globalController.homepage();
});

globalRouter.get("/easter-egg", (request, response) => {
    const globalController = new GlobalController(request, response);
    globalController.easterEgg();
});

export default globalRouter;