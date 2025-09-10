import { Router } from "express";
import globalRouter from "./globalRouter";
import dinoCategoryRouter from "./dinoCategoryRouter";
import dinosaurRouter from "./dinosaurRouter";

const router = Router();

router.use("/dinosaur", dinosaurRouter);

router.use("/category", dinoCategoryRouter);

router.use("/attraction", dinoCategoryRouter);

router.use("/", globalRouter);

export default router;