import { Tanaman } from "../model/Tanaman";
import { TanamanType } from "../types/tanamanType";

export class TanamanService {
  static async createTanaman(tanaman: TanamanType): Promise<void> {
    try {
      await Tanaman.createTanaman(tanaman);
    } catch (error: any) {
      throw new Error(`Error creating tanaman: ${error.message}`);
    }
  }

  static async getAllTanaman(): Promise<any> {
    try {
      const tanaman = await Tanaman.getAllTanaman();
      return tanaman;
    } catch (error: any) {
      throw new Error(`Error getting all tanaman: ${error.message}`);
    }
  }

  static async getTanamanById(id: string): Promise<any> {
    try {
      const tanaman = await Tanaman.getTanamanById(id);
      return tanaman;
    } catch (error: any) {
      throw new Error(`Error getting tanaman by id: ${error.message}`);
    }
  }

  static async updateTanaman(id: string, tanaman: TanamanType): Promise<any> {
    try {
        const updatedTanaman = await Tanaman.updateTanaman({ ...tanaman, id });
        return updatedTanaman;
    } catch (error: any) {
        throw new Error(`Error updating tanaman: ${error.message}`);
    }
}


  static async deleteTanaman(id: string): Promise<void> {
    try {
     const tanaman = await Tanaman.deleteTanaman(id);
     return tanaman
    } catch (error: any) {
      throw new Error(`Error deleting tanaman: ${error.message}`);
    }
  }
}
