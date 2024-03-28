import User from '../models/User.js';
import {createError} from '../utils/error.js'
/**
 * Get Profile
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export const getById=async (req,res,next)=>{
try {
    const user=await User.findOne({_id:req.params.id},{password:0,createdAt:0,updatedAt:0});
    if(!user){
        throw new Error('User not found!')
    }
    return res.status(200).json({data:user,message:"User found"});
} catch (error) {
    return next(createError(500,error.message));
}
}