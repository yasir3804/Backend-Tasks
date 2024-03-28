import express from "express";
const router=express.Router();
import {getById } from "../controllers/user.controller.js";
import { verifyUser } from "../utils/verifyToken.js";
//route to get a single user by id
router.get('/:id',verifyUser,getById);
export default router;