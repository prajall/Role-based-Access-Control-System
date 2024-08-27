import express from "express";
import {
  createProduct,
  deleteProduct,
  updateProduct,
  viewAllProducts,
  viewOneProduct,
} from "../controllers/productController";
import { authChecker } from "../middlewares/authChecker";
import { checkPermission } from "../middlewares/checkPermission";

const Router = express.Router();

Router.post("/", authChecker, createProduct);
Router.put(
  "/:productId",
  authChecker,
  checkPermission("product", "update"),
  updateProduct
);
Router.get("/", viewAllProducts);
Router.get("/:productId", viewOneProduct);
Router.delete(
  "/:productId",
  authChecker,
  checkPermission("product", "delete"),
  deleteProduct
);

export default Router;
