// types.d.ts or in a relevant types file
import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: any; // You can replace 'any' with a more specific type if you have one
  }
}
