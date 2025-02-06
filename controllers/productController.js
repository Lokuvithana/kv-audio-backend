import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export function addProduct(req,res){

    if(req.user == null){
        res.status(401).json({
            message : "pls login and try again"
        })
        return  
    }

    if(req.user.role !== "admin"){
    res.status(403).json({
        message : "you are not aithorized to do this"
        })
        return  
    }  

    const product = req.body;

    const newProduct = new Product(product);

    newProduct.save().then(()=>{
        res.json({
            message : "Product added successfully"
        })
    }).catch((error)=>{
        res.status(500).json({
            error : "Product addition failed"
        })
    })
}

export function getProduct(req,res){

    //global function eken admin da nadda kiyala balanawa
    if (isAdmin(req)){

        Product.find().then((product)=>{
            res.json(product)
        }).catch(()=>{
            res.status(500).json({
                message : "Failed to get products"
            })
        })
    }else{

        Product.find({availability : true}).then((product)=>{
            res.json(product)
        }).catch(()=>{
            res.status(500).json({
                message : "Failed to get products"
            })
        })
    }

}

export function updateProduct(req,res){
    if(isAdmin(req)){

        //methanain ganne eunique product key eka
        const key = req.params.key;

        //methana body eke enne e productv eke wenas weana oni tika
        const data = req.body;

        //meken wenne eke key eka ewana key ekata adala product wala data eke thioyena values walin update karana kiyala
        Product.updateOne({key : key} ,data).then(()=>{
            res.json({
                message : "Product updated successfully"
            })
        }).catch(()=>{
            res.status(500).json({
                message : "Product update is failed"
            })
        })

    }else{
        res.status(403).json({
            message : "You are not autherized to do it"
        })
    }
    return;
}

export function deleteProduct(req,res){

    if (isAdmin(req)){

        const key = req.params.key;

        Product.deleteOne({key : key}).then(()=>{
            res.json({
                message : "Product deleted successfully"
            })
        }).catch(()=>{
            res.status(500).json({
                message : "Product deleted failed"
            })
        })

    }else{
        res.json({
            message : "You are not autherized to do it"
        })
        return;
    }
    
}