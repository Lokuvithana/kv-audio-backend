import express from "express"
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import jwt, { decode } from "jsonwebtoken";


const app = express(); 

app.use(bodyParser.json()); 


app.use((req,res,next)=>{
    
    let token = req.header("Authorization");

 
    if(token != null){
        token = token.replace("Bearer ","")

        
        jwt.verify(token,"kv secret911!",(error,decoded)=>{

            if(!error){
                req.user = decoded; 
            }
        })
    }
    next();  
})

let mongoURL = "mongodb+srv://admin:nisith@cluster0.pbtbn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" 

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
