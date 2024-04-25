import { Request, Response } from "express";
import { UserService } from "../service/user.service";

export class UserController {
  static async getAllUsers(req: Request, res: Response) {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  }

  static async getUserById(req: Request, res: Response) {
    const { id } = req.params;
    const user = await UserService.getUserById(id);
    res.status(200).json(user);
  }

  static async updateUser(req: Request, res: Response) {
    const userData = req.body;
    const { id } = userData;
    try {
      const updatedUser = await UserService.updateUser(userData, true);
      res.status(200).json(updatedUser);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
  

  static async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    const user = await UserService.deleteUser(id);
    res.status(200).json(user);
  }
}
