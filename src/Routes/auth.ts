import express from 'express';
import authController from '../Controllers/auth';

const router = express.Router();

router.post('/register', authController.UserRegister);
router.post('/login', authController.UserLogin)
export = router;