import { Router } from "express";
import {
  signIn,
  signOut,
  signUp,
  verifyToken,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.get("/verify", verifyToken);

authRouter.post("/sign-up", signUp);

authRouter.post("/sign-in", signIn);

authRouter.post("/sign-out", signOut);

export default authRouter;
