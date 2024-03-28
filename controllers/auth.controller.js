import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import {createError} from'../utils/error.js';
/**
 * For Registration
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export const register = async (req, res,next) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        if (req.body != '') {
            const newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                userName: req.body.userName,
                email: req.body.email,
                password: hashedPassword,
            });
            await newUser.save();
            return res.status(200).json({error:false,message:"User created sucessfully"}); 
        } else {
            throw new Error('Incorrect/Invalid parameters.');
        }
    } catch (error) {
        return next(createError(500, error.message ));
    }
}
/**
 * Login User
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email }, { createdAt: 0, updatedAt: 0 }).lean();
        if (!user) {
            throw new Error("User not found.");
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) {
            throw new Error("Incorrect Password.");
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        delete user.password
        res.json({
            status: 200,
            message: "Login Success!!",
            data: { user, token }
        })

    } catch (error) {
        return next(createError(404,  error.message));
    }
}