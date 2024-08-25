import express from "express";
import cors from "cors";
import { authChecker } from "./middlewares/authChecker";
import userRoute from "./routes/userRoute";
import cookieParser from "cookie-parser";
import permissionRoute from "./routes/permissionRoute";
import roleRoute from "./routes/roleRoute";

const app = express();

export default app;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
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
