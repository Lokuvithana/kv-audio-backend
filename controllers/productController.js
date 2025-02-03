import Product from "../models/product.js";

export function addProduct(req,res){

    console.log(req.user);


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