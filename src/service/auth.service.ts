import { User } from "../model/User";
import { UserType } from "../types/userType";
import { userValidation } from "../validation/UserValidation";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export class AuthService {
  static async Register(user: UserType) {
    const { error } = userValidation.validate(user);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const existingUser = await User.getUserByUsername(user.username);
    if (existingUser) {
      throw new Error("Username already exists");
    }

    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);

      const isAdminUsername = ["admin1", "admin2", "admin3"];
      const role = isAdminUsername.includes(user.username) ? "admin" : "user";

      const newUser = await User.createUser({
        ...user,
        password: hashedPassword,
        role,
      });

      return newUser;
    } catch (error: any) {
      throw new Error(`Error registering user: ${error.message}`);
    }
  }

  static async Login(username: string, password: string) {
    try {
      const user = await User.getUserByUsername(username);

      if (!user) {
        throw new Error("Pengguna tidak ditemukan");
      }

      if (!user.password) {
        throw new Error("Kata sandi tidak ditemukan");
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Kata sandi tidak cocok");
      }

      const payload = {
        id: user.id,
        username: user.username,
        role: user.role,
      };

      const secret = process.env.JWT_SECRET;

      if (!secret) {
        throw new Error("JWT_SECRET environment variable not set");
      }

      const token = jwt.sign(payload, secret);

      return {
        user,
        token,
      };
    } catch (error: any) {
      throw new Error(`Error logging in: ${error.message}`);
    }
  }

  static async Logout(res: any): Promise<void> {
    try {
      res.clearCookie("token");
      res.status(200).json({ message: "Berhasil keluar" });
      return;
    } catch (error: any) {
      throw new Error(`Error saat keluar: ${error.message}`);
    }
  }
}
