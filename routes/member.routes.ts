import { verify } from 'crypto';
import express from 'express';

 import userController from "../controllers/user.controller";
 

const router=express.Router();
// kyc 
router.post("/kycs",userController.kyc);
// coins 
router.post("/coins",userController.coins);
router.post("/verify",userController.verifyCode);
 router.get("/getByUserId",userController.getByUserId);
   //privacy 
router.post("/pusr",userController.privacyuser);
//delete acount
router.post("/deletacc",userController.deletaccount);
// cahnge phone number
router.post("/changenumber",userController.changeno);
// get   particular data  in multiple tables
router.post("/getmultidata",userController.get);
// delete data particular users in multiple table
router.post("/deletuser",userController.deletedata);
// get all users
router.post("/getdata",userController.getallusers);



export default router;  