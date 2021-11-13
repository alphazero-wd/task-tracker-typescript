import { Router } from "express";
import {
  addTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../controllers/tasks";
import { isAuth } from "../middlewares/isAuth";
const router = Router();

router.get("/", isAuth, getTasks);
router.post("/", isAuth, addTask);
router.put("/:id", isAuth, updateTask);
router.delete("/:id", isAuth, deleteTask);

export default router;
