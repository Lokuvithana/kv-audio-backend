import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function registerUser(req,res){

    const data = req.body;

    data.password = bcrypt.hashSync(data.password,10);//hash karanwa user dena passworsd eka DB ekata save karanna kalin 10 kiyala denne ekama de 10 parak salt wenawa

    const newUser = new User(data);
    
    newUser.save().then(()=>{
        res.json({
            message : "User registered successfully"
        })
    }).catch((error)=>{
        res.status(500).json({
            error : "User registration failed"
        })
    })

}


export function loginUser(req,res){
    
    const data = req.body;

    //req body eke ena user ge email ek aran ekata samana user kenek innawada balala inawanm login eka denna
    User.findOne({
        email : data.email
    }).then((user)=>{ //methana user kiyanne ara uda email eka check karala gann result eka store karana eka
        
        if (user == null){
            res.status(404).json({
                error : "user not found"
            })
        }

        else{

            const isPasswordCorrect = bcrypt.compareSync(data.password,user.password);

            if(isPasswordCorrect){

                //methana denne apita web token eka hadenna encypt wenna oni data tika monada kiyala user ge
                const token = jwt.sign({
                    firstName : user.firstName,
                    lastName : user.lastName,
                    email : user.email,
                    role : user.role
                },"kv secret911!")//methanan dunne encryption key eka

                res.json({
                    message : "Login successful" , token : token
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