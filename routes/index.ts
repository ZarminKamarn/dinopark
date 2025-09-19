import { Router } from "express";
import globalRouter from "./globalRouter";
import dinoCategoryRouter from "./dinoCategoryRouter";
import dinosaurRouter from "./dinosaurRouter";
import attractionRouter from "./attractionRouter";
import bookingRouter from "./bookingRouter";
import parkRouter from "./parkRouter";

const router = Router();

router.use("/dinosaur", dinosaurRouter);

router.use("/category", dinoCategoryRouter);

router.use("/attraction", attractionRouter);

router.use("/booking", bookingRouter);

router.use("/park", parkRouter);

router.use("/", globalRouter);

export default router;
