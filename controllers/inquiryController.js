import { isAdmin, isUser } from "./userController.js";
import Inquiry from "../models/Inquiry.js";

export async function addInquiry(req,res){
    try {
        
        if(isUser(req)){

            const data = req.body

            data.email = req.user.email

            let id = 0;

            const inquiry = await Inquiry.find().sort({id : -1}).limit(1);

            if(inquiry.length == 0){
                id = 1;
            }else{
                id = inquiry[0].id + 1;
            }

            data.id = id;

            const newInquiry = new Inquiry(data);
            const response = newInquiry.save();

            res.json({
                message : "Inquery added successfully",
                id : response.id
            })
        }else{
            res.status(403).json({
                message : "You are not autherized to do this"
            })
        }

    } catch (error) {
        res.status(403).json({
            message : "You are not autherized to do it"
        })
        
    }

}

export async function getInquiry(req,res){
   try {
    
    if(isAdmin(req)){

        const inquires = await Inquiry.find();
        
        res.json(inquires);
        return
        
    }else if(isUser(req)){

        const email = req.user.email

        const foundInquiry = await Inquiry.find({email : email})

        res.json(foundInquiry);
        return;

    }else{
        res.status(403).json({
            message : "You are not autherized to do it"
        })
    }

   } catch (error) {

    res.status(403).json({
        message : "failed to get inquiery"
    })

   } 
    
}

export async function deletInquiry(req,res) {
    try {
        
        if(isAdmin(req)){

            const id = req.params.id

            await Inquiry.deleteOne({id:id})
            res.json({
                message : "Inquiry deleted successfully"
            })
            return;

        }else if(isUser(req)){

            const founId = req.params.id
            const email = req.user.email;

            const inquiry = await Inquiry.findOne({id :founId})


            if(inquiry == null){
                res.json({
                    message : "Inquery not found"
                })
                return;

            }else{

                if(inquiry.email == email){
                
                await Inquiry.deleteOne({id : founId})
                res.json({
                    message : "Inquiry deleted successfully"
                })
                }else{
                    res.status(403).json({
                        message : "You are not autherized to do it"
                    })
                    return;
                }
                  
            }
            
        }else{
            res.status(403).json({
                message : "You are not autherized to do it"
            })
            return;
        }


    } catch (error) {
        res.status(500).json({
            message : "failed to delete inquiry"
        })
    }

}

export async function updateInquiry(req,res){
    try {
        
        if(isAdmin(req)){

            const id = req.params.id
            const data = req.body

            await Inquiry.updateOne({id:id},data)
            res.json({
                message : "Inquiry updated successfully"
            })
            return;

        }else if(isUser(req)){

            const founId = req.params.id
            const email = req.user.email;
            const data = req.body;

            const inquiry = await Inquiry.findOne({id :founId})


            if(inquiry == null){
                res.json({
                    message : "Inquery not found"
                })
                return;

            }else{

                if(inquiry.email == email){
                
                await Inquiry.updateOne ({id : founId}, {message : data.message}) //user can change thire message only
                res.json({
                    message : "Inquiry updated successfully"
                })
                }else{
                    res.status(403).json({
                        message : "You are not autherized to do it"
                    })
                    return;
                }
                  
            }
            
        }else{
            res.status(403).json({
                message : "You are not autherized to do it"
            })
            return;
        }


    } catch (error) {
        res.status(500).json({
            message : "failed to update inquiry"
        })
    }


}