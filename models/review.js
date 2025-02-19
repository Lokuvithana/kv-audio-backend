import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true,
    },

    name : {
        type : String,
        required : true,
    },

    rating : {
        type : String,
        required : true,
    },

    comment : {
        type : String,
        required : true,
    },

    date : {
        type : Date,
        required : true,
        default : Date.now()
    },

    isApproved : {
        type : Boolean,
        required : true,
        default : false
    }
})

const Review = mongoose.model("Reviews" , reviewSchema);

export default Review;