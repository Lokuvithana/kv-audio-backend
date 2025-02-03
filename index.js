import express from "express"
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import jwt, { decode } from "jsonwebtoken";


const app = express(); //sampurna express kiyana backend programme ekama variable ekata dagaththa

app.use(bodyParser.json()); // anith ewalata yanna kalin muwa use karanawa ara request eka piliwalata hadaganna 

//methana next kiyala damama usergen ena onima request ekak methanin allaganwa ethanin ehata wenne next eka yatathe dena de witharai response eka widhata enne
app.use((req,res,next)=>{
    
    let token = req.header("Authorization");//meken token kalla kadala gannawa

    //token ekak thiyenawanm
    if(token != null){
        token = token.replace("Bearer ","") //http header eke ena token eke bearer<space> kiyala ekak enawa api eka ain karagana oni ekai replace karanne "" mekata

        //meka awilla token eka decode karana code kallak 
        jwt.verify(token,"kv secret911!",(error,decoded)=>{

            if(!error){
                req.user = decoded; //meken e decode karagaththa token eka user ge request ekata adopt karagaththa
                //next() meka methanin danne naththe error ekak nathi unoth withari next eka run wenne ethkota hithanna login wage function walata token eka wadak na ethkota e function walatawath yanna bari wenawa ekai next eka yatin dagaththe

                //anith eka dan api req  ekata token eka dala thiyene e kiyane hama function ekak athulatama token eka yanwa
            }
        })
    }
    next(); //meka damama ilaga ekkenata pass wenawa 
})

let mongoURL = "mongodb+srv://admin:nisith@cluster0.pbtbn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" // url eka mongoDB walin gana puluwan

mongoose.connect(mongoURL); //mongo kiyana library ekata kiyanwa URL ekath ekka connect wenna kiyala

const conn = mongoose.connection //itapse mongose eke thiyena connection eka araganna haduna ho natha connection eka

conn.once("open",()=>{
    console.log("mongoDB establsihed successfully");//DB ekata connection eka hariyata hadunanm meka display wenawa naththam loku error ekak enawa
})

app.use("/api/users",userRouter);

app.use("/api/products",productRouter)

app.listen(3000,()=>{
    console.log("server runing o port 3000");
})
