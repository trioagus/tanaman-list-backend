import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";

interface UserPayload {
  id?: string;
  username: string;
  email: string;
  role: string;
}

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Missing token. Please provide a valid token." });
  }

  try {
    const secret = process.env.JWT_SECRET as Secret;
    const user = jwt.verify(token, secret) as UserPayload;
    req.user = user;
    next();
  } catch (error) {
    console.error("Error validating token:", error);
    return res.status(401).json({ message: "Invalid token. Please provide a valid token." });
  }
};
