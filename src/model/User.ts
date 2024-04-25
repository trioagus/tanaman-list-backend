import { connection } from "../config/database";
import { UserType } from "../types/userType";
import { v4 as uuidv4 } from "uuid";
import { logger } from "../logger/info";
import { sanitizeInput } from "../guard/sanitize";

export class User {
  static async createUserTable() {
    try {
      const sql =
        `CREATE TABLE IF NOT EXISTS users (
          id VARCHAR(36) PRIMARY KEY,
          username VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL,
          role ENUM('admin', 'user') NOT NULL)`;
      await (await connection).query(sql);
      logger.info("sukses buat table user");
    } catch (error: any) {
      logger.error(`Error creating user table: ${error.message}`);
      throw new Error(`Error creating user table: ${error.message}`);
    }
  }

  static async createUser(user: UserType) {
    try {
      const sql = `INSERT INTO users (id, username, password, role) VALUES (?, ?, ?, ?)`;

      const sanitizeUsername = sanitizeInput(user.username);
      const sanitizePassword = sanitizeInput(user.password);
      await (await connection).query(sql, [
        uuidv4(),
        sanitizeUsername,
        sanitizePassword,
        user.role
      ]);

      logger.info("sukses buat user");
    } catch (error: any) {
      logger.error(`Error creating user: ${error.message}`);
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  static async getUserByUsername(username: string): Promise<any> {
    try {
      const [rows] = await (await connection).query("SELECT * FROM users WHERE username = ? LIMIT 1", [
        username,
      ]);
  
      if (Array.isArray(rows) && rows.length > 0) {
        return rows[0];
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error getting user by username:", error);
      throw error;
    }
  }


  static async getUserById(id: string) {
    try {
      const [rows] = await (await connection).query("SELECT * FROM users WHERE id = ?", [id]);

      return rows;
    } catch (error: any) {
      throw new Error(`Error getting user by id: ${error.message}`);
    }
  }

  static async getAllUsers() {
    try {
      const [rows] = await (await connection).query("SELECT * FROM users");

      return rows;
    } catch (error: any) {
      throw new Error(`Error getting all users: ${error.message}`);
    }
  }

  static async updateUser(user: UserType):Promise<any> {
    try {
      const sql = `UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?`;

      const sanitizeUsername = sanitizeInput(user.username);
      const sanitizePassword = sanitizeInput(user.password);

      const [rows] = await (await connection).query(sql, [
        sanitizeUsername,
        sanitizePassword,
        user.role,
        user.id
      ])

      logger.info("sukses update user");
      return rows;
    } catch (error: any) {
      logger.error(`Error updating user: ${error.message}`);
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  static async deleteUser(id: string) {
    try {
      const sql = `DELETE FROM users WHERE id = ?`;
      await (await connection).query(sql, [id]);
      logger.info("sukses delete user");
    } catch (error: any) {
      logger.error(`Error deleting user: ${error.message}`);
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }
}

User.createUserTable();