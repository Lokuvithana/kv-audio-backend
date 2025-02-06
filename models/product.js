import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    key : {
        type : String,
        unique : true,
        required : true
    },   
    
    
    name : {
        type : String,
        required : true
    },

    price : {
        type : Number,
        required : true
    },

    category : {
        type : String,
        required : true,
        default : "uncategorized"
    },

    dimensions : {
        type : String,
        required : true,
    },

    description : {
        type : String,
        required : true
    },

    availability : {
        type : Boolean,
        required : true,
        default : true
    },

    image : {
        type : [String], //[] mehema dunnama array ekak hadenne ethkota images kihuipayaka dasnna puluwan
        required : true,
        default : ["http://abc.comhttps://cdn.vectorstock.com/i/1000v/92/16/default-profile-picture-avatar-user-icon-vector-46389216.jpg"]
    }
})

const Product = mongoose.model("products", productSchema)

export default Product;