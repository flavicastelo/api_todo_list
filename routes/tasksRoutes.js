import express from "express";
import { createTask, deleteTask, editTask, getTasks } from "../controllers/tasksController.js";
import checkToken from "../middware/authmiddware.js";

const taskRouter = express.Router();

taskRouter.get("/listtasks",checkToken, getTasks);
taskRouter.post("/createtasks",checkToken, createTask);
taskRouter.put("/edittask/:userId/:taskId", checkToken, editTask);
taskRouter.delete("/deletetask/:userId/:taskId", checkToken, deleteTask);

export default taskRouter;  