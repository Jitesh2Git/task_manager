import { Router } from "express";
import {
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.use(authorize);

userRouter.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

export default userRouter;
