import express from "express";
import {
  deleteUser,
  loginUser,
  signupUser,
} from "../controllers/userController";
import { authChecker } from "../middlewares/authChecker";
import { checkPermission } from "../middlewares/checkPermission";

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.delete(
  "/:userId",
  authChecker,
  checkPermission("user", "delete"),
  (req, res) => res.send("Permission Granted")
);

export default router;
