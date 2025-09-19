import { Router } from "express";
import { BookingController } from "../controllers/BookingController";

const bookingRouter: Router = Router();

bookingRouter.get("/", (request, response) => {
  const bookingController = new BookingController(request, response);
  bookingController.booking();
});

bookingRouter.post("/", (request, response) => {
  const bookingController = new BookingController(request, response);
  bookingController.bookingReceived();
});

bookingRouter.get("/payment", (request, response) => {
  const bookingController = new BookingController(request, response);
  bookingController.payment();
});

bookingRouter.post("/payment", (request, response) => {
  const bookingController = new BookingController(request, response);
  bookingController.paymentReceived();
});

bookingRouter.get("/confirmation", (request, response) => {
  const bookingController = new BookingController(request, response);
  bookingController.validation();
});

export default bookingRouter;
