import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { User } from "../models/userModel";
import { create } from "domain";
import { Role } from "../models/roleModel";

// Generate JWT token
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "30d", // Set the token expiry as per your requirements
  });
};

//signup

export const signupUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .json({ message: "Email and Password are required" })
        .status(400);
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.json({ message: "Email already exists" }).status(409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      email,
      password: hashedPassword,
    });
    const filteredUser: any = createdUser.toObject();

    delete filteredUser.password;

    return res.status(200).json(filteredUser);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Login user
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password are required" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return res.status(400).json({ message: "Incorrect Password" });
  }

  const loggedInUser = await User.findOne({ email }).select("-password");

  const token = generateToken(user._id.toString());

  return res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Ensure cookies are secure in production
      expires: new Date(Date.now() + 2592000000), // 30 days expiry
    })
    .json({ user: loggedInUser });
};

export const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    // Find the user by ID and delete them
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const updateUserRole = async (req: Request, res: Response) => {
  const { newRoleId } = req.body;
  const { userIdToUpdate } = req.params;
  const user = req.user;

  try {
    const newRole = await Role.findById(newRoleId);
    if (!newRole) {
      return res.status(400).json({ message: "Invalid role specified" });
    }
    if (newRole.name === "master") {
      return res.status(403).json({ message: "Cannot assign Master role" });
    }

    const userToUpdate = await User.findById(userIdToUpdate);

    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }

    if (userToUpdate.role === "admin" && user.role != "master") {
      return res.status(403).json({
        message: "Access Denied. Only master can change Admin's role",
      });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = newRoleId;
    user.roleId = newRole._id;

    await user.save();

    return res
      .status(200)
      .json({ message: "User role updated successfully", user });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
