import express from "express";
import * as authController from "../controllers/authController";

const router = express.Router();

router.get('/google/login', authController.googleLogin);
router.get('/google/callback', authController.callback);
router.post('/signup', authController.signup);
router.get('/authenticateToken', authController.authenticateToken);

export default router;