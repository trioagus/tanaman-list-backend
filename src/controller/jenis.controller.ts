import { Request, Response } from "express";
import { JenisService } from "../service/jenis.service";
import { logger } from "../logger/info";

export class JenisController {
  static async getAllJenis(req: Request, res: Response) {
    try {
      res.status(200).json(await JenisService.getAllJenis());
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  }

  static async getJenisById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      res.status(200).json(await JenisService.getJenisById(id));
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  }

  static async createJenis(req: Request, res: Response) {
    const { name } = req.body;
    try {
      const Jenis = await JenisService.createJenis(name);
      logger.info(Jenis);
      res.status(201).json({ Jenis });
    } catch (error) {
      logger.error(`Error creating Jenis: ${error}`);
      res.status(500).json({ message: "Server Error" });
    }
  }

  static async updateJenis(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;
    try {
      const Jenis = await JenisService.updateJenis({ id, name });
      res.status(200).json({ Jenis });
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  }

  static async deleteJenis(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const Jenis = await JenisService.deleteJenis(id);
      res.status(200).json({ Jenis });
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  }
}
