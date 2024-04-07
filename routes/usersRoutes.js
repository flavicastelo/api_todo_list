import express from "express";
import {  createUser, getUsers } from "../controllers/usersController.js";

const userRouter = express.Router();

userRouter.get("/listusers", getUsers);
userRouter.post("/createuser", createUser);

export default userRouter;
