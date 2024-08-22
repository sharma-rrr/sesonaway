import { verify } from 'crypto';
import express from 'express';

 import userController from "../controllers/user.controller";

 const multer = require("multer");
 var storage = multer.diskStorage({
  destination: function (req: any, file:any, cb: any){
    cb(null, "profile");
  },
  filename: function(req:any, file: any, cb: any) {
    cb(null, file.originalname + ".png");
  },
 });
 var upload = multer({
  storage:storage
 })
const router=express.Router();
// users add

 router.post("/register",userController.register);
 // user login  with email and email &password and phone number
 router.post("/login",userController.login);
 // add user with phoneNumber
 router.post("/add",userController.add);
 // login phonne number with otp
 router.post("/logino",userController.loginotp);
 // verify otp
 router.post("/otp",userController.verifyotp);
 // privacy staus 
 router.post("/privacy",userController.privacy);
 //select language
 router.post("/language",userController.sl)
 //
 // get login type
 router.post("/getdata",userController.s)
 //
 router.post("/e",userController.sust)
 

 
 
 





 







 router.post("/verify",userController.verify);
   router.post("/forgot-Password",userController.forgotPassword);
   router.post("/updatePassword",userController.updatePassword);
   router.put("/newPassword",userController.newPassword);
   router.put("/updateProfile",userController.updateProfile);
   router.put("/changePassword",userController.changePassword);
   router.get("/getAll",userController.getAll);
   router.get("/delete",userController.deleteUser);
   router.post("/qrcode",userController.qrCode);
   router.post("/postimage",upload.single("profile"),userController.postImage);








   // season way api 
   router.post("/adduser",userController.adduser);
   router.post("/UserLogin",userController.loginapi);
   // forgot password
   router.post("/forgotPassword",userController.passwordforgot);
   // newpassword and newconfirmpassword
   router.post("/newPassword",userController.newpassword);



// add to wishlist 
router.post("/addwishlist",userController.addwishlist);

// update wishlist
router.post("/updatewishlist",userController.updatewishlist);


// remove wishlist 
router.post("/deleteWishlist",userController.deleteWishlist);


// user contact information

router.post("/addUserinfo",userController.addUserinfo);

// update usercontact info

router.post("/updateUserinfo",userController.updateUserinfo);

// delete usercontact info

router.post("/deleteuserinfo",userController.deleteuserinfo);


//   user feedback / CONTACT us
router.post("/userFeedback",userController.userfeedback);


router.post("/sdsd",userController.ddd);

// nodemailer 
router.post("/nodemailer",userController.nodeMailer);

//  generate-captcha
router.post("/generate-captcha",userController.getcaptcha);

// verify captcha 
router.post("/verify-captcha",userController.verfiycaptcha);
// get all data 
router.post("/get-data",userController.getData)       

// add productz
router.post("/add-product",userController.addproduct)       
// update  product
router.post("/update-product",userController.updateproduct)  
// customers
router.post("/add-customer",userController.addcustomer) 

// define array
router.post("/ad",userController.ad) 
// create user
router.post("/createuser",userController.createuser) 
// buy number
router.post("/buynumber",userController.buynumber) 
//
router.post("/addslot",userController.addslot) 
// update data
router.post("/updateslot",userController.updateslot) 

router.post("/getslot",userController.getslot)

router.post("/sendmail",userController.sendemail) 



//

router.post("/useradd",userController.useradd) 

router.post("/sendmessagep",userController.sendmessage) 

router.post("/groupcShat",userController.adduergroup) 

export default router;
 
// sync  loginUser(payload: any, res: Response) {
//   const { email, password,logintype } = payload;
//   console.log(payload,"pa")
//   //Check If Email Exists
//   var checkdata = await db.Users.findOne({
//       where: {
//           logintype

//       }
//   })
//   if (checkdata) {
//       if (await Encrypt.comparePassword(password.toString(), checkdata.password.toString())) {
//           const token = jwt.sign({
//               email,
//               Name: checkdata.Name,
//               emailVerfied: checkdata.isEmailVerfied,
//               id:checkdata.id,
//           }, process.env.TOKEN_SECRET);
//           commonController.successMessage(token, "User login", res)
//       } else {
//           commonController.errorMessage("INvalid Details", res)
//       }
//   }
//   else {
//       commonController.errorMessage("Email password not match", res)
//       console.log("no");

//  }
// }