import { NextFunction, Request, Response } from "express";
import { Role } from "../models/roleModel";
import { User } from "../models/userModel";

export const checkPermission = (module: string, action: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userRole = req.user?.role;

      if (!userRole) {
        return res
          .status(403)
          .json({ message: "Access Denied: No Role Found" });
      }

      const roleDoc = await Role.findById(userRole);

      if (!roleDoc) {
        return res.status(403).json({ message: "User's Role not found" });
      }
      if (roleDoc.name === "master" || roleDoc.name === "Master") {
        next();
      }

      const hasPermission = roleDoc.permissions.some((permission: any) => {
        return (
          permission.module === module && permission.actions.includes(action)
        );
      });

      if (!hasPermission) {
        return res.status(403).json({
          message:
            "Access Denied. You do not have permission to perform this action",
        });
      }
      next();
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
    const user = req.user;

    console.log(user._id);
    if (!user || !user._id) {
      return res.status(403).json({ message: "Not Authenticated" });
    }

    const userDoc = await User.findById(user._id);

    if (!userDoc) {
      return res.status(403).json({ message: "User not found" });
    }
    console.log(userDoc);
    if (userDoc.role != "admin" && userDoc.role != "master") {
      return res.status(403).json({ message: "Access Denied: Admins only" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const masterChecker = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;

    if (!user || !user.id) {
      return res.status(403).json({ message: "Not Authenticated" });
    }

    const userDoc = await User.findById(user.id);

    if (!userDoc) {
      return res.status(403).json({ message: "User not found" });
    }

    if (userDoc.role !== "master") {
      return res
        .status(403)
        .json({ message: 'Forbidden. Only for "Master" role' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
