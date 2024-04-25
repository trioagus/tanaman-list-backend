import express from "express";
import { TanamanController } from "../controller/tanaman.controller";
import { isAdmin } from "../middleware/isAdmin";

export const tanamanRouter = express.Router();

tanamanRouter.get("/", TanamanController.getAllTanaman);
tanamanRouter.get("/:id", TanamanController.getTanamanById);
tanamanRouter.post("/", isAdmin, TanamanController.createTanaman);
tanamanRouter.put("/:id", isAdmin, TanamanController.updateTanaman);
tanamanRouter.delete("/:id", isAdmin, TanamanController.deleteTanaman)