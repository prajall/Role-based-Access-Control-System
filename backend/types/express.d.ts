import { JwtPayload } from "jsonwebtoken";

// Extend the Request interface to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: any; // Adjust the type as needed for your `user` object
    }
  }
}
