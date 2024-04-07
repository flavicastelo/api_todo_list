import { Router } from "express";
import userRouter from "./usersRoutes.js";
import taskRouter from "./tasksRoutes.js";
import authRouter from "./authRoutes.js";

const router = Router();
router.use("/user", userRouter);
router.use("/task", taskRouter);
router.use("/auth", authRouter);

export default router;