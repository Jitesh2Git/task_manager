import { Router } from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  toggleTaskStatus,
} from "../controllers/task.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const taskRouter = Router();

taskRouter.use(authorize);

taskRouter.route("/").post(createTask).get(getTasks);

taskRouter.route("/:id").put(updateTask).delete(deleteTask);

taskRouter.patch("/:id/toggle", toggleTaskStatus);

export default taskRouter;
