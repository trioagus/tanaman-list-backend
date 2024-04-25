import { Request, Response } from "express";
import { JenisService } from "../service/jenis.service";

export class JenisController {
  static async getAllJenis(req: Request, res: Response) {
    try {
      const Jenis = await JenisService.getAllJenis();
      res.status(200).json({ Jenis });
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  }

  static async getJenisById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const Jenis = await JenisService.getJenisById(id);
      res.status(200).json({ Jenis });
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  }

  static async createJenis(req: Request, res: Response) {
    const { name } = req.body;
    try {
      const Jenis = await JenisService.createJenis(name);
      res.status(201).json({ Jenis });
    } catch (error) {
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
