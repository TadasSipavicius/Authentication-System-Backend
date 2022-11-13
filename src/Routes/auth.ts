import express from 'express';
import authController from '../Controllers/auth';

const router = express.Router();

router.post('/register', authController.UserRegister);
router.post('/login', authController.UserLogin);
router.post('/token', authController.RefreshToken);
router.delete('/logout', authController.LogoutUser);

export = router;