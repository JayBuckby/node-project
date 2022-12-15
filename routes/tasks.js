import { Router } from "express";
import {
  addTask,
  viewTasks,
  getTaskByID,
  updateTaskById,
  deleteTask,
} from "../controller/tasks.js";

const router = Router();

router.get("/", viewTasks);

router.get("/:id", getTaskByID);

router.delete("/:id", deleteTask);

router.post("/", addTask);
router.put("/:id", updateTaskById);

export default router;
