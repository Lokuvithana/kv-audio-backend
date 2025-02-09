import express from "express"
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import jwt, { decode } from "jsonwebtoken";
import dotenv from "dotenv";
import reviewRouter from "./routes/reviewRouter.js";
import inquiryRouter from "./routes/inquiryRouter.js";
import cors from "cors"

dotenv.config() //loaded env file to here

const app = express(); 

app.use(cors());

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

app.use("/api/Reviews" ,reviewRouter);

app.use("/api/inquires",inquiryRouter);

app.listen(3000,()=>{
    console.log("server runing o port 3000");
})

//"email": "user@example.com",-customer
// "password": "hashedpassword123"

//"email": "user123@example.com",-admin
//"password": "password123",