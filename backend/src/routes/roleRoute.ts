import express from "express";
import {
  createRole,
  deleteRole,
  updateRole,
} from "../controllers/roleController";
import { checkPermission } from "../middlewares/checkPermission";

const Router = express.Router();

Router.post("/new-role", createRole);
Router.delete("/:roleId", deleteRole);
Router.put("/:roleId/update", updateRole);
export default Router;
