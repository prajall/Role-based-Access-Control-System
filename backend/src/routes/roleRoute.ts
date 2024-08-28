import express from "express";
import {
  createRole,
  deleteRole,
  getAllRoles,
  updateRole,
} from "../controllers/roleController";
import { adminChecker, checkPermission } from "../middlewares/checkPermission";

const Router = express.Router();

Router.get("/", getAllRoles);
Router.post("/new-role", createRole);
Router.delete("/:roleId", deleteRole);
Router.put("/:roleId/update", updateRole);
export default Router;
