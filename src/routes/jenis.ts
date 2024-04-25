import express from "express";
import { JenisController } from "../controller/jenis.controller";
import { isAdmin } from "../middleware/isAdmin";

export const jenisRouter = express.Router();

jenisRouter.get("/", JenisController.getAllJenis);
jenisRouter.get("/:id", JenisController.getJenisById);
jenisRouter.post("/", isAdmin, JenisController.createJenis);
jenisRouter.put("/:id", isAdmin, JenisController.updateJenis);
jenisRouter.delete("/:id", isAdmin, JenisController.deleteJenis);
