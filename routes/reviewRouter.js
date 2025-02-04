import express from "express"
import { addReview, approvedReview, deleteReview, getReview } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/" , addReview);

reviewRouter.get("/" ,getReview);

reviewRouter.delete("/:email",deleteReview); 

reviewRouter.put("/approve/:email",approvedReview);

export default reviewRouter;