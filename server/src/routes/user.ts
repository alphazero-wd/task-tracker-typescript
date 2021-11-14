import { Router } from "express";
import { deleteUser, login, signup } from "../controllers/user";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post('/forgot-password')
router.delete("/delete-user/:id", deleteUser);
export default router;
