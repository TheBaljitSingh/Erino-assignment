import express from "express";
import {isAuthenticated} from "../middleware/auth.js";
import {createLead, deleteLead, getLeadById, getLeads, updateLead} from "../controllers/leadControlle.js"


const router = express.Router();

router.post("/leads", isAuthenticated, createLead);
router.get("/leads", isAuthenticated, getLeads);
router.get("/leads/:id", isAuthenticated, getLeadById);
router.put("/leads/:id", isAuthenticated, updateLead);
router.delete("/leads/:id", isAuthenticated, deleteLead);


export default router;