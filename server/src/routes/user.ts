import { Router } from 'express';
import {
  deleteUser,
  forgotPassword,
  login,
  resetPassword,
  signup,
  updateUserProfile,
} from '../controllers/user';
import { isAuth } from '../middlewares/isAuth';
const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);
router.delete('/delete-user', isAuth, deleteUser);
router.put('/update-profile', isAuth, updateUserProfile);
export default router;
