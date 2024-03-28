import express from "express";
import { authenticate } from "../utils/verifyToken.js";
import { dashboardData } from "../controllers/dashboard.controller.js";
const router=express.Router();
//route to get a single user by id
router.get('/',authenticate,dashboardData);
export default router;