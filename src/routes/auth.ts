import express from "express";
import { AuthController } from "../controller/auth.controller";
import { validateToken } from "../middleware/auth";

export const authRouter = express.Router();

authRouter.post("/register", AuthController.Register);
authRouter.post("/login", AuthController.Login);
authRouter.post("/logout", validateToken, AuthController.Logout);