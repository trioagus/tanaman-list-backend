import express from "express";
import { AuthController } from "../controller/auth.controller";
import { validateToken } from "../middleware/auth";
import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message:
    "Too many requests from this IP, please try again after an 15 minutes",
});

export const authRouter = express.Router();

authRouter.post("/register", limiter, AuthController.Register);
authRouter.post("/login", limiter, AuthController.Login);
authRouter.post("/logout", limiter, validateToken, AuthController.Logout);
