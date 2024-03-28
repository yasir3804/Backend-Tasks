import axios from "axios";
import {createError} from'../utils/error.js'
/**
 * Dashboard data
 * @param {*} req 
 * @param {*} res 
 * @param {*} next
 * @returns 
 */
export const dashboardData=async (req,res,next)=>{
try {
   let apiResponse= await axios.get(`https://api.data.gov.in/resource/5e631849-56b8-4d12-8fd0-57605046929a?api-key=${process.env.API_KEY}&format=json`);
   if(apiResponse.status===200){
        return res.status(200).json({data:apiResponse.data,message:"Data fetched successfully."});
    }else{
        return res.json({data:[],message:"Failed to get data."})
    }
} catch (error) {
    return next(createError(500, error.message));
}
}