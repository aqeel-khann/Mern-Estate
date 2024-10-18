import express from "express";
import { createListing, deleteListing, getListing, getSearchList, getUserListing, updateListing } from "../controller/ListingController.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/create",verifyToken, createListing)
router.get("/get-listings/:id",verifyToken, getUserListing) //base on user  id 
router.delete("/delete/:id",verifyToken, deleteListing)
router.patch("/update/:id",verifyToken, updateListing)
router.get("/get/:id",getListing)
router.get("/get", getSearchList);

export default router;