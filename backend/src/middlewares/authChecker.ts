import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authChecker = async (req: any, res: any, next: any) => {
  const authToken = req.headers["authorization"]?.split(" ")[1]; // Bearer token

  if (!authToken) {
    return res.status(403).json({ message: "Not Authenticated" });
  }

  try {
    const decodedData = jwt.verify(authToken, process.env.JWT_SECRET as string);
    req.user = decodedData;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid Token" });
  }
};
