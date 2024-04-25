import { connection } from "../config/database";
import { TanamanType } from "../types/tanamanType";
import { v4 as uuidv4 } from "uuid";
import { logger } from "../logger/info";

export class Tanaman {
  static async createTanamanTable(): Promise<void> {
    try {
      const sql = `CREATE TABLE IF NOT EXISTS tanaman (
                id VARCHAR(36) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                latin VARCHAR(255) NOT NULL,
                jenis_id VARCHAR(36) NOT NULL,
                size VARCHAR(255) NOT NULL,
                stock INT NOT NULL,
                price INT NOT NULL,
                FOREIGN KEY (jenis_id) REFERENCES Jenis(id)
            )`;
      await (await connection).query(sql);
      logger.info("sukses buat table tanaman");
    } catch (error: any) {
      logger.error(`Error creating tanaman table: ${error.message}`);
      throw new Error(`Error creating tanaman table: ${error.message}`);
    }
  }

  static async createTanaman(tanaman: TanamanType): Promise<void> {
    try {
      const sql = `INSERT INTO tanaman (id, name, latin, jenis_id, size, stock, price) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      await (
        await connection
      ).query(sql, [
        uuidv4(),
        tanaman.name,
        tanaman.latin,
        tanaman.jenis_id,
        tanaman.size,
        tanaman.stock,
        tanaman.price,
      ]);

      logger.info("sukses buat tanaman");
    } catch (error: any) {
      logger.error(`Error creating tanaman: ${error.message}`);
      throw new Error(`Error creating tanaman: ${error.message}`);
    }
  }

  static async getAllTanaman(): Promise<any> {
    try {
      const sql = `
        SELECT
            tanaman.id,
            tanaman.name,
            tanaman.latin,
            tanaman.size,
            tanaman.stock,
            tanaman.price,
            jenis.name AS jenis_name
        FROM tanaman
        INNER JOIN jenis ON tanaman.jenis_id = jenis.id
      `;
      const [rows] = await (await connection).query(sql);
      return rows;
    } catch (error: any) {
      throw new Error(`Error getting all tanaman: ${error.message}`);
    }
  }

  static async getTanamanById(id: string): Promise<any> {
    try {
      const sql = `
      SELECT
          tanaman.id,
          tanaman.name,
          tanaman.latin,
          tanaman.size,
          tanaman.stock,
          tanaman.price,
          jenis.name AS jenis_name
      FROM tanaman
      INNER JOIN jenis ON tanaman.jenis_id = jenis.id

            WHERE tanaman.id = ?`;
      const [rows] = await (await connection).query(sql, [id]);
      return rows;
    } catch (error: any) {
      throw new Error(`Error getting tanaman by id: ${error.message}`);
    }
  }

  static async updateTanaman(tanaman: TanamanType): Promise<any> {
    try {
        const sql = `UPDATE tanaman SET name = ?, latin = ?, jenis_id = ?, size = ?, stock = ?, price = ? WHERE id = ?`;
        const [rows] = await (await connection).query(sql, [
            tanaman.name,
            tanaman.latin,
            tanaman.jenis_id,
            tanaman.size,
            tanaman.stock,
            tanaman.price,
            tanaman.id,
        ]);

        logger.info("sukses update tanaman");
        return rows;
    } catch (error: any) {
        logger.error(`Error updating tanaman: ${error.message}`);
        throw new Error(`Error updating tanaman: ${error.message}`);
    }
}


  static async deleteTanaman(id: string): Promise<any> {
    try {
      const sql = `DELETE FROM tanaman WHERE id = ?`;
     const [rows] = await (await connection).query(sql, [id]);
      logger.info("sukses delete tanaman");
      return rows
    } catch (error: any) {
      logger.error(`Error deleting tanaman: ${error.message}`);
      throw new Error(`Error deleting tanaman: ${error.message}`);
    }
  }
}

Tanaman.createTanamanTable();
