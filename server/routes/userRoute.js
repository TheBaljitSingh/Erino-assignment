import express from "express";
import { login, logout, register, myProfile } from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();


router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/auth/logout", logout);
router.get("/auth/me",isAuthenticated, myProfile);

export default router;