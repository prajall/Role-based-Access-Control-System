import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { User } from "../models/user.model";
import { create } from "domain";

// Generate JWT token
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "30d", // Set the token expiry as per your requirements
  });
};

//signup

const signupUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  let { role } = req.body;

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

    if (!role) {
      role = "customer";
    }

    const createdUser = await User.create({
      email,
      password: hashedPassword,
      role,
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
const loginUser = async (req: Request, res: Response) => {
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

export { loginUser, signupUser };
