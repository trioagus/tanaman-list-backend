import { connection } from "../config/database";
import { jenisType } from "../types/jenisType";
import { v4 as uuidv4 } from "uuid";
import { logger } from "../logger/info";

export class Jenis {
  static async createJenisTable() {
    try {
      const sql = `CREATE TABLE IF NOT EXISTS jenis (
                id VARCHAR(36) PRIMARY KEY,
                name VARCHAR(255) NOT NULL
            )`;
      await (await connection).query(sql);
      logger.info("Sukses membuat tabel jenis");
    } catch (error: any) {
      logger.error(`Error creating jenis table: ${error.message}`);
      throw new Error(`Error creating jenis table: ${error.message}`);
    }
  }

  static async createJenis(jenis: jenisType) {
    try {
      const sql = `INSERT INTO jenis (id, name) VALUES (?, ?)`;
      const [rows] = await (await connection).query(sql, [
        uuidv4(),
        jenis.name,
      ])
      logger.info("Sukses membuat jenis");
      return rows;
    } catch (error: any) {
      logger.error(`Error creating jenis: ${error.message}`);
      throw new Error(`Error creating jenis: ${error.message}`);
    }
  }

  static async getJenisById(id: string) {
    try {
      const sql = `SELECT * FROM jenis WHERE id = ?`;
      const [rows] = await (await connection).query(sql, [id]);
      return rows;

    } catch (error: any) {
      throw new Error(`Error getting jenis by id: ${error.message}`);
    }
  }

  static async getAllJenis() {
    try {
      const sql = `SELECT * FROM jenis`;
      const [rows] = await (await connection).query(sql);
      return rows;
    } catch (error: any) {
      throw new Error(`Error getting all jenis: ${error.message}`);
    }
  }

  static async updateJenis(jenis: jenisType) {
    try {
      const sql = `UPDATE jenis SET name = ? WHERE id = ?`;
      const [rows] = await (await connection).query(sql, [jenis.name, jenis.id]);
      logger.info("Sukses memperbarui jenis");
      return rows;
    } catch (error: any) {
      logger.error(`Error updating jenis: ${error.message}`);
      throw new Error(`Error updating jenis: ${error.message}`);
    }
  }

  static async deleteJenis(id: string) {
    try {
      const sql = `DELETE FROM jenis WHERE id = ?`;
      await (await connection).query(sql, [id]);
      logger.info("Sukses menghapus jenis");
    } catch (error: any) {
      logger.error(`Error deleting jenis: ${error.message}`);
      throw new Error(`Error deleting jenis: ${error.message}`);
    }
  }
}

Jenis.createJenisTable();

