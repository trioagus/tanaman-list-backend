import express from "express";
import { TanamanController } from "../controller/tanaman.controller";
import { isAdmin } from "../middleware/isAdmin";
import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message:
        "Too many requests from this IP, please try again after an 15 minutes",
});

export const tanamanRouter = express.Router();

tanamanRouter.get("/", limiter, TanamanController.getAllTanaman);
tanamanRouter.get("/:id", limiter, TanamanController.getTanamanById);
tanamanRouter.post("/", limiter, isAdmin, TanamanController.createTanaman);
tanamanRouter.put("/:id", limiter, isAdmin, TanamanController.updateTanaman);
tanamanRouter.delete("/:id", limiter, isAdmin, TanamanController.deleteTanaman)