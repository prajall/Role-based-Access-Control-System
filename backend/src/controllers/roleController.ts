import { Request, Response } from "express";
import { Role } from "../models/roleModel";
import { Permission } from "../models/permissionModel";
import { User } from "../models/userModel";

export const getAllRoles = async (req: Request, res: Response) => {
  try {
    const roles = await Role.find({ name: { $ne: "Master" } }).sort({
      permissions: -1,
    });

    if (!roles || roles.length === 0) {
      return res.status(404).json({ message: "No roles found" });
    }

    res.status(200).json(roles);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createRole = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  try {
    const duplicateData = await Role.findOne({ name });
    if (duplicateData) {
      return res.status(409).json({ message: `Role:${name} already Exists` });
    }

    const newRole = await Role.create({ name, permissions: [] });
    return res.status(201).json(newRole);
  } catch (error) {
    return res.status(500).json({ message: "Error creating role", error });
  }
};

export const deleteRole = async (req: Request, res: Response) => {
  const { roleId } = req.params;

  try {
    const role = await Role.findById(roleId);
    console.log(roleId);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }
    const isUserAssociated = await User.exists({ role: roleId });
    if (isUserAssociated) {
      return res.status(400).json({
        message: "Cannot delete role, users are associated with this role",
      });
    }

    await Role.findByIdAndDelete(roleId);

    return res.status(200).json({ message: "Role deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting role", error });
  }
};

export const updateRole = async (req: Request, res: Response) => {
  const { roleId } = req.params;
  const { permissions } = req.body;

  if (!Array.isArray(permissions)) {
    return res.status(400).json({ message: "Permissions should be an array" });
  }

  try {
    const roleDoc = await Role.findById(roleId);
    if (!roleDoc) {
      return res.status(404).json({ message: "Role not found" });
    }

    roleDoc.permissions.splice(0, roleDoc.permissions.length);

    permissions.forEach((permission) => {
      roleDoc.permissions.push(permission);
    });

    roleDoc.save();
    return res
      .status(200)
      .json({ message: "Permissions updated successfully", roleDoc });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating permissions", error });
  }
};
