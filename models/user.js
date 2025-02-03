import mongoose from "mongoose";

const userSchema = mongoose.Schema({

    //email eka thiyena oni attributes json ekak widhata liyagana puluwan
    email : {
        type : String,
        required : true,
        unique : true
    },

    password : {
        type : String,
        required : true,
    },
    
    role : {
        type : String,
        required : true,
        default : "customer",//role eka wenama dunne naththam me widhta default ganna value ekak set karanmna  pulwuan    
    },

    firstName : {
        type : String,
        required : true,
    },

    lastName : {
        type : String,
        required : true,
    },

    address : {
        type : String,
        required : true,
    },

    phone : {
        type : String,
        required : true,
    }

});


const User = mongoose.model("users" , userSchema);

export default User;