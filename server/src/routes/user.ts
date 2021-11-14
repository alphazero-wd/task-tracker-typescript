import { Router } from "express";
import {
  deleteUser,
  forgotPassword,
  login,
  resetPassword,
  signup,
} from "../controllers/user";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);
router.delete("/delete-user/:id", deleteUser);
export default router;
