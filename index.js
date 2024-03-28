import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import authRoute from './routes/auth.js';
import userRoute from './routes/user.js'
import dashboradRoute from './routes/dashboard.js'
import cookieParser from 'cookie-parser';
const app =express();
app.use(express.json());
app.use(cors());
app.use(cookieParser())
dotenv.config();

//DB Connection
const connectMongoDB= async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to Database");
    } catch (error) {
        throw error;
    }
}
//Routes
app.use('/auth',authRoute);
app.use('/user',userRoute);
app.use('/dashboard',dashboradRoute);
app.use((req, res) => {
    res.status(404).send('Route not found');
});

//Global error handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const response = {
        error: true,
        message: err.message,
    };
    return res.status(statusCode).json(response);
});

app.listen(4080,()=>{
    connectMongoDB();
console.log("Connected to backend.");
});