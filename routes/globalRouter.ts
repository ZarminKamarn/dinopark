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

globalRouter.get("/login", (request, response) => {
    const globalController = new GlobalController(request, response);
    globalController.login();
});

globalRouter.post("/login", (request, response) => {
    const globalController = new GlobalController(request, response);
    globalController.loginReceived();
});


globalRouter.get("/stats", (request, response) => {
    const globalController = new GlobalController(request, response);
    globalController.stats();
});

export default globalRouter;