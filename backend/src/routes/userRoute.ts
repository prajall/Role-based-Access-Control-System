import express from "express";
import {
  deleteUser,
  getUserInfo,
  loginUser,
  signupUser,
  updateUserRole,
} from "../controllers/userController";
import { authChecker } from "../middlewares/authChecker";
import { adminChecker, checkPermission } from "../middlewares/checkPermission";

const router = express.Router();

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
