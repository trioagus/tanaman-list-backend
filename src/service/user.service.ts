import { User } from "../model/User";
import { UserType } from "../types/userType";
import { userValidation } from "../validation/UserValidation";
import bcrypt from "bcrypt";

export class UserService {
  static async updateUser(user: UserType, updatePassword: boolean = false) {
    const { error } = userValidation.validate(user);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    try {
      await User.updateUser({
        id: user.id,
        username: user.username,
        password: hashedPassword,
        role: user.role,
      });

      return { message: "Pengguna berhasil diperbarui" };
    } catch (error: any) {
      throw new Error(`Gagal memperbarui pengguna: ${error.message}`);
    }
  }

  static async getAllUsers() {
    try {
      const users = await User.getAllUsers();
      return users;
    } catch (error: any) {
      throw new Error(`Gagal mengambil semua pengguna: ${error.message}`);
    }
  }

  static async getUserById(id: string) {
    try {
      const user = await User.getUserById(id);
      return user;
    } catch (error: any) {
      throw new Error(
        `Gagal mengambil pengguna berdasarkan ID: ${error.message}`
      );
    }
  }

  static async deleteUser(id: string) {
    try {
      await User.deleteUser(id);
      return { message: "Pengguna berhasil dihapus" };
    } catch (error: any) {
      throw new Error(`Gagal menghapus pengguna: ${error.message}`);
    }
  }
}
