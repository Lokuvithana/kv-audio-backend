import express from "express";
import { addInquiry, deletInquiry, getInquiry, updateInquiry } from "../controllers/inquiryController.js";

const inquiryRouter = express.Router();

inquiryRouter.post("/", addInquiry);

inquiryRouter.get("/" , getInquiry);

inquiryRouter.delete("/:id", deletInquiry);

inquiryRouter.put("/:id" , updateInquiry);

export default inquiryRouter;