import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/Scheduler-microservice';

export const connectToDB = async () =>{
    try{
        await mongoose.connect(MONGODB_URI);
        console.log("MongoDB connected successfully!")
    }catch(err){
        console.error("Failed to connect with mongoDB", err);
        process.exit(1);
    }
}