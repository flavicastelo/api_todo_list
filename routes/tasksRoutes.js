import express from "express";
import { createTask, deleteTask, editTask, getTasks } from "../controllers/tasksController.js";

const taskRouter = express.Router();

taskRouter.get("/listtasks", getTasks);
taskRouter.post("/createtasks", createTask);
taskRouter.put("/edittask/:userId/:taskId", editTask);
taskRouter.delete("/deletetask/:userId/:taskId", deleteTask);

export default taskRouter;  