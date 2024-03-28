import express from "express";
import { login, register} from "../controllers/auth.controller.js";
const router=express.Router();
//create a user
router.post('/register',register);
//login a user
router.post('/login',login);
export default router;