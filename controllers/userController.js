import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function registerUser(req,res){

    const data = req.body;

    data.password = bcrypt.hashSync(data.password,10);

    const newUser = new User(data);
    
    newUser.save().then(()=>{
        res.json({
            message : "User registered successfully"
        })
    }).catch(()=>{
        res.status(500).json({
            error : "User registration failed"
        })
    })

}


export function loginUser(req,res){
    
    const data = req.body;

   
    User.findOne({
        email : data.email
    }).then((user)=>{ 

        if (user == null){
            res.status(404).json({
                error : "user not found"
            })
        }

        else{

            const isPasswordCorrect = bcrypt.compareSync(data.password,user.password);

            if(isPasswordCorrect){

               
                const token = jwt.sign({
                    firstName : user.firstName,
                    lastName : user.lastName,
                    email : user.email,
                    role : user.role,
                    profilePicture : user.profilePicture
                    
                },process.env.JWT_SECRET)
                res.json({
                    message : "Login successful" , token : token , user : user
                })
            }
            else{
                res.status(401).json({
                    error : "Login failed"
                })
            }
        }
    })
}

//function created to check whether this user is admin or not
export function isAdmin(req){
   
    let isAdmin = false;

    if(req.user != null && req.user.role == "admin"){
        isAdmin = true;
        
    }
    return isAdmin;
}

export function isUser(req){
   
    let isUser= false;

    if(req.user != null && req.user.role == "customer"){
        isUser = true;

    }
    return isUser;
    
}