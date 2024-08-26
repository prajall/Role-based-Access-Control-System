//@ts-nocheck
import { NextFunction, Request, Response } from "express";
import { Role } from "../models/role.model";

export const checkPermission = (module: string, action: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userRole = req.user?.role;

      if (!userRole) {
        return res
          .status(403)
          .json({ message: "Access Denied: No Role Found" });
      }

      const userPermissions = await Role.findById(userRole).populate(
        "permissions"
      );

      if (!userPermissions) {
        return res
          .status(403)
          .json({ message: "Access Denied: Role not found" });
      }

      const hasPermission = userPermissions.permissions.some(
        (permission: any) => {
          return permission.module === module && permission.action === action;
        }
      );

      if (hasPermission) {
        return next();
      }

      return res
        .status(403)
        .json({ message: "Access Denied: Insufficient Permissions" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
};

export const adminChecker = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = user;

    if (!user || !user.id) {
      return res.status(403).json({ message: "Not Authenticated" });
    }

    const user = await User.findById(user.id);

    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access Denied: Admins only" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
