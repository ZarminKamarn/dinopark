import { Router } from "express";
import { ParkController } from "../controllers/ParkController";

const parkRouter: Router = Router();

parkRouter.get("/:id" ,(request, response) => {
    const parkController = new ParkController(request, response);
    parkController.park();
});

export default parkRouter;