import express from "express"
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import jwt, { decode } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config() //loaded env file to here

const app = express(); 

app.use(bodyParser.json()); 


app.use((req,res,next)=>{
    
    let token = req.header("Authorization");

 
    if(token != null){
        token = token.replace("Bearer ","")

        
        jwt.verify(token,process.env.JWT_SECRET,(error,decoded)=>{

            if(!error){
                req.user = decoded; 
            }
        })
    }
    next();  
})

let mongoURL = process.env.MONGO_URL; 

mongoose.connect(mongoURL); 
const conn = mongoose.connection 

conn.once("open",()=>{
    console.log("mongoDB establsihed successfully");
})

app.use("/api/users",userRouter);

app.use("/api/products",productRouter)

app.listen(3000,()=>{
    console.log("server runing o port 3000");
})
