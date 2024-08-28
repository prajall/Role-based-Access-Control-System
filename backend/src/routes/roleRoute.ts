import express from "express";
import {
  createRole,
  deleteRole,
  getAllRoles,
  updateRole,
} from "../controllers/roleController";
import { adminChecker, checkPermission } from "../middlewares/checkPermission";
import { authChecker } from "../middlewares/authChecker";

const Router = express.Router();

Router.get("/", getAllRoles);
Router.post("/new-role", createRole);
Router.delete("/:roleId", authChecker, adminChecker, deleteRole);
Router.put("/:roleId/update", authChecker, adminChecker, updateRole);
export default Router;
