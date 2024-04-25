import express from "express";
import { UserController } from "../controller/user.controller";
import { validateToken } from "../middleware/auth";
import { isAdmin } from "../middleware/isAdmin";
import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message:
    "Too many requests from this IP, please try again after an 15 minutes",
});

export const userRouter = express.Router();

userRouter.get(
  "/",
  limiter,
  validateToken,
  isAdmin,
  UserController.getAllUsers
);
userRouter.get("/:id", limiter, validateToken, UserController.getUserById);
userRouter.put("/:id", limiter, validateToken, UserController.updateUser);
userRouter.delete("/:id", limiter, validateToken, UserController.deleteUser);
