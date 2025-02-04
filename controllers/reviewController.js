import Review from "../models/review.js";

export function addReview(req,res){

    if(req.user == null){
        res.status(401).json({
            message : "Please log in and try again"
        })
        return
    }

    const data = req.body;

    data.name = req.user.firstName + " " + req.user.lastName;
    data.profilePicture = req.user.profilePicture;
    data.email = req.user.email; 

    const newReview = new Review (data);

    newReview.save().then(()=>{
        res.json({
            message : "Review successfully added"
        })
    }).catch(()=>{
        res.status(500).json({
            message : "Review added failed"
        })
    })

}

export function getReview(req,res){
    const user = req.user;

    if(user == null || user.role != "admin"){

        //methana me thiyenne Promise ekek api danne nathi unata Review.find({isApproved : true}) meka thamai promise eka man me kattiyawa find karala db eken aran dennam eka hari giyoth resolve eke output eka then eke review walata gannawa itapas eka print karanwa json eke waradunoth reject eke output eka .catch()eka athulata dala error eka ganna puluwan response ekata......    oka thamai mechchara kal api use kare danne nathi unata ewa serama mongoose eken manage karala denawa (apita oni nam promise ekak hadala use karanath puluwan)
        Review.find({isApproved : true}).then((review)=>{
            res.json(review);
        })
        return
    }

    if(user.role == "admin"){
        Review.find().then((review)=>{
            res.json(review);
        })

    }
}

export function deleteReview(req,res){

    const email = req.params.email; 

    if (req.user == null){
        res.status(401).json({
            message : "Please login and try again"
        })
        return
    }

    if (req.user.role == "admin"){

        Review.deleteOne({email : email}).then(()=>{
            res.json({
                message : "Deletion sucessfully"
            })
        }).catch(()=>{
            res.status(500).json({
                message : "Deletion failed"
            })
        })
        return

    }else {
        if(req.user.email == email){
            Review.deleteOne({email : email}).then(()=>{
                res.json({
                    message : "Deletion successfully"
                })
            }).catch(()=>{
                res.status(500).json({
                    message : "deletion Failed"
                })
            })
        }else{
            res.status(403).json({
                message : "You are not autherized to do it"
            })
        }
    }
    
}

export function approvedReview(req,res){
    
    const email = req.params.email;

    if(req.user == null){
        res.status(401).json({
            message : "Please login and try again"
        })
        return
    }

    if(req.user.role == "admin"){
        Review.updateOne({

            email : email 
        },
        {
            isApproved : true 

        }).then(()=>{
            res.json({
                message : "Review approved successfully"
            })
        }).catch(()=>{
            res.status(500).json({
                message : "Review approval failed"
            })
        })
    }else{
        res.status(403).json({
            message : "You are not autherized to do it"
        })
        return
    }


}