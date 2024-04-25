import express from "express";
import { UserController } from "../controller/user.controller";
import { validateToken } from "../middleware/auth";
import { isAdmin } from "../middleware/isAdmin";

export const userRouter = express.Router();

userRouter.get("/", validateToken, isAdmin, UserController.getAllUsers);
userRouter.get("/:id", validateToken, UserController.getUserById);
userRouter.put("/:id", validateToken, UserController.updateUser);
userRouter.delete("/:id", validateToken, UserController.deleteUser);