import mongoose from "mongoose";
//require('dotenv').config();
import dotenv from "dotenv";
dotenv.config();

console.log(process.env.DB_URL);

const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("mongodb connected");
    }catch (error) {
        console.log("error", error);
    }
    
};

module.exports = connectDb;
