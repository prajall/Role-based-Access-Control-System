import { Request, Response } from "express";
import { Role } from "../models/role.model";
import { Permission } from "../models/permission.model";
import { User } from "../models/user.model";

export const createRole = async (req: Request, res: Response) => {
  const { name, permissions } = req.body;

  if (!name || !Array.isArray(permissions)) {
    return res
      .status(400)
      .json({ message: "Name and Permissions are required" });
  }

  try {
    const validPermissions = await Permission.find({
      _id: { $in: permissions },
    });
    if (validPermissions.length !== permissions.length) {
      return res.status(400).json({ message: "Some permissions are invalid" });
    }

    const newRole = new Role({ name, permissions });
    await newRole.save();
    return res.status(201).json({ newRole });
  } catch (error) {
    return res.status(500).json({ message: "Error creating role", error });
  }
};

export const deleteRole = async (req: Request, res: Response) => {
  const { roleId } = req.params;

  try {
    // Check if the role exists
    const role = await Role.findById(roleId);
    console.log(role);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    // Check if any users are associated with this role
    const isUserAssociated = await User.exists({ role: roleId });
    if (isUserAssociated) {
      return res.status(400).json({
        message: "Cannot delete role, users are associated with this role",
      });
    }

    // Delete the role
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
    // Check if the role exists
    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    // Check if all provided permission IDs are valid
    const validPermissions = await Permission.find({
      _id: { $in: permissions },
    });

    if (validPermissions.length !== permissions.length) {
      return res.status(400).json({ message: "Some permissions are invalid" });
    }

    // Update the role's permissions
    role.permissions = permissions;
    await role.save();

    return res
      .status(200)
      .json({ message: "Permissions updated successfully", role });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating permissions", error });
  }
};
