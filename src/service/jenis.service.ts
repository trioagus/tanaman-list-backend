import { Jenis } from "../model/Jenis";
import { jenisValidation } from "../validation/Jenis.validation";
import { jenisType } from "../types/jenisType";

export class JenisService {
    static async createJenis(name: string): Promise<any> {
        const { error } = jenisValidation.validate({ name });
        if (error) {
          throw new Error(error.message);
        }
    
        try {
          const jenisData: jenisType = { name }; 
          const jenis = await Jenis.createJenis(jenisData);
          return jenis;
        } catch (error: any) {
          throw new Error(`Error creating Jenis: ${error.message}`);
        }
      }
    

  static async getAllJenis() {
    try {
      const jenis = await Jenis.getAllJenis();
      return jenis;
    } catch (error) {
      throw new Error(`Error getting all Jenis: ${error}`);
    }
  }

  static async getJenisById(id: string) {
    try {
      const jenis = await Jenis.getJenisById(id);
      return jenis;
    } catch (error) {
      throw new Error(`Error getting Jenis by id: ${error}`);
    }
  }

  static async updateJenis(jenis: jenisType) {
    try {
      const updateJenis = await Jenis.updateJenis(jenis);
      return updateJenis;
    } catch (error) {
      throw new Error(`Error updating Jenis: ${error}`);
    }
  }

  static async deleteJenis(id: string) {
    try {
      await Jenis.deleteJenis(id);
      return { message: "Jenis deleted successfully" };
    } catch (error) {
      throw new Error(`Error deleting Jenis: ${error}`);
    }
  }
}
