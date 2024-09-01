import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserInfo,
  loginUser,
  signupUser,
  updateUserRole,
} from "../controllers/userController";
import { authChecker } from "../middlewares/authChecker";
import { adminChecker, checkPermission } from "../middlewares/checkPermission";
import { getAllRoles } from "../controllers/roleController";

const router = express.Router();

router.get("/", authChecker, adminChecker, getAllUsers);
router.post("/login", loginUser);
router.post("/signup", signupUser);
router.get("/loggedin-user", authChecker, getUserInfo);
router.patch("/role/:userId", authChecker, adminChecker, updateUserRole);
router.delete(
  "/:userId",
  authChecker,
  checkPermission("user", "delete"),
  (req, res) => res.send("Permission Granted")
);

export default router;
