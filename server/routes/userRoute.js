import express from "express";
import { login, logout, register, myProfile, forgetPassword, passwordReset } from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();


router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/auth/logout", logout);
router.get("/auth/me",isAuthenticated, myProfile);
router.post("/auth/forget-password", isAuthenticated, forgetPassword);
router.put("/auth/reset-password/:resetToken", passwordReset);

export default router;