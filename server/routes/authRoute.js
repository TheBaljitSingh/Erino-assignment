import express from "express";
import passport from "passport";
import { login, logout, register, myProfile, forgetPassword, passwordReset, handleGoogleAuth } from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.get("/google", passport.authenticate("google", {scope:["profile","email"]}));
router.get("/google/callback", passport.authenticate("google", {session:false}), handleGoogleAuth);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me",isAuthenticated, myProfile);
router.post("/forget-password", isAuthenticated, forgetPassword);
router.put("/reset-password/:resetToken", passwordReset);



export default router;