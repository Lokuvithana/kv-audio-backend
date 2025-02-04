import express from "express"
import { addReview, approvedReview, deleteReview, getReview } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/" , addReview);

reviewRouter.get("/" ,getReview);

reviewRouter.delete("/:email",deleteReview); //we can passed the value as a parameter eth methana meke awlak thiyenawa mkd hithanna api /approved kiyala path ekaka haduwoth api dan uurl rkr para ekak passwkoroth u enne approved path ekata neme menna me /:email ekata anna e nisa me wage route api yatatama dala thiyagana oni

reviewRouter.put("/approve/:email",approvedReview);

export default reviewRouter;