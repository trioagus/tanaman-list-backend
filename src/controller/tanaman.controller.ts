import { Request, Response } from "express";
import { TanamanService } from "../service/tanaman.service";
import { logger } from "../logger/info";

export class TanamanController {
  static async getAllTanaman(req: Request, res: Response) {
    try {
      const tanaman = await TanamanService.getAllTanaman();
      res.status(200).json(tanaman);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getTanamanById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const tanaman = await TanamanService.getTanamanById(id);
      res.status(200).json(tanaman);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async createTanaman(req: Request, res: Response) {
    const tanaman = req.body;
    try {
      const createdTanaman = await TanamanService.createTanaman(tanaman);
      res.status(201).json(createdTanaman);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateTanaman(req: Request, res: Response) {
    const { id } = req.params;
    const tanaman = req.body;
    try {
      const updatedTanaman = await TanamanService.updateTanaman(id, tanaman);
      logger.info("sukses update tanaman", updatedTanaman);
      res.status(200).json(updatedTanaman);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteTanaman(req: Request, res: Response) {
    const { id } = req.params;
    try {
     const tanaman = await TanamanService.deleteTanaman(id);
      res.status(200).json({ tanaman });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
