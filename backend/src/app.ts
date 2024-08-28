import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import permissionRoute from "./routes/permissionRoute";
import productRoute from "./routes/productRoute";
import roleRoute from "./routes/roleRoute";
import userRoute from "./routes/userRoute";

const app = express();

export default app;

app.use(
  cors({
    origin: "*",
    methods: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// SETUP ROUTES
app.use("/user", userRoute);
app.use("/permission", permissionRoute);
app.use("/role", roleRoute);
app.use("/product", productRoute);
