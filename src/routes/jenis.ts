import express from "express";
import { JenisController } from "../controller/jenis.controller";
import { isAdmin } from "../middleware/isAdmin";
import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    message:
        "Too many requests from this IP, please try again after an 15 minutes",
});

export const jenisRouter = express.Router();

jenisRouter.get("/", limiter, JenisController.getAllJenis);
jenisRouter.get("/:id", limiter, JenisController.getJenisById);
jenisRouter.post("/", limiter, isAdmin, JenisController.createJenis);
jenisRouter.put("/:id", limiter, isAdmin, JenisController.updateJenis);
jenisRouter.delete("/:id", limiter, isAdmin, JenisController.deleteJenis);
