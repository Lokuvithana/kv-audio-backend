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