import { Router } from "express";
import userRouter from "./usersRoutes.js";
import taskRouter from "./tasksRoutes.js";

const router = Router();
router.use("/user", userRouter);
router.use("/task", taskRouter);

export default router;