import { Router } from "express";
import { BookingController } from "../controllers/BookingController";

const bookingRouter: Router = Router();

bookingRouter.get("/" ,(request, response) => {
    const bookingController = new BookingController(request, response);
});

export default bookingRouter;