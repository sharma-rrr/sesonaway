import { Request, Response } from 'express';
import codeController from './service/code.controller';
import commonController from './common/common.controller';
import db from '../models';
import { sign, verify } from 'crypto';
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' }); // Destination folder ko apne requirement ke hisab se adjust karein

// import userController from "../controllers/user.controller";
import { error } from 'console';
import { body } from 'express-validator';
class UserController {
    async register(req: Request, res: Response) {
        try {
            const {email,password,city,profile,country,Name,dob,refredBy,logintype,phoneNO} = req.body;
                await codeController.addNewUser({
                    email,password,city,profile,country,Name,dob,refredBy,logintype,phoneNO
                }, res)
        } catch (e) {
            console.log(e)
            commonController.errorMessage("user not register", res)
        }
    }

    // add users
    async add(req:Request, res:Response){
    const{Name,phoneNO,about,country}=req.body
    try{
        await codeController.add({
            Name,phoneNO,about,country
        },res)

    }catch(error){
        commonController.errorMessage("Error:user not found",res)
    }
    }
    // login with phonenumber and otp
    async loginotp(req:Request, res:Response){
        const{phoneNO,otpValue}=req.body
        try{
            await codeController.loginotp({
                phoneNO,otpValue
            },res)
        }catch(error){
            commonController.errorMessage("Error:user not found",res)
        }
        }


    // verify otp
    async verifyotp(req:Request,res:Response){
        const{otpValue,phoneNO}=req.body
        try{
            await codeController.otp({
       otpValue,phoneNO
            },res)

        }catch(error){
            commonController.errorMessage("occuerd error",res)
        }
    }
    
    // privacy setting 
    async privacy(req:Request,res:Response){
    const{nobody,everyone,mycontactexception,mycontacts,phoneNO}=req.body;
    try{
     await codeController.privacy({
        nobody,everyone,mycontactexception,mycontacts,phoneNO
     },res)

    }catch(error){
        commonController.errorMessage("Error:occred error",res)
    }
    }



    // select language 
    async sl(req:Request,res:Response){
    try{
        const{language,phoneNO}=req.body;
        await codeController.hey({
            language,phoneNO
        },res)
    }catch(err){
        commonController.errorMessage("occured error",res)
    }}


    

    async verify(req: Request, res: Response){
        try {
            const {email,otp} = req.body;
            console.log(req.body)
                await codeController.verify({
                    email,otp
                }, res)
        } catch (e) {
            console.log(e)
            commonController.errorMessage("user not register", res)
        }
    }

    //  user login
    async login(req: Request, res: Response) {
        try {
            const { email, password,phoneNO } = req.body;
            await codeController.loginUser({
                email, password,phoneNO
            }, res)
        } catch (e) {
            commonController.errorMessage("user not login", res)

        }
    }

    //verify user
    async verifyCode(req: Request, res: Response) {
        try {
            var userId=req?.user?.id;
            const {  otp } = req.body;
            await codeController.verifyUser({
               userId, otp

            }, res)
        } catch (e) {
            commonController.errorMessage("not verify", res)

        }
    }
    
    //forgot Password
    async forgotPassword(req: Request, res: Response) {
        try {
            const { emailId } = req.body;
            await codeController.forgotPassword({
                emailId

            }, res)

        } catch (e) {
            commonController.errorMessage("emailId not found", res)

        }
    }

    //updatePassword
    async updatePassword(req: Request, res: Response) {
        try {
            const {  emailId,otp, password, confirmPassword } = req.body;
            if (password != confirmPassword) {
                commonController.errorMessage("Password Not Matched", res);
               
            }
            else {
                await codeController.updatePassword({
                     emailId,otp,password
                }, res)
            }
        } catch (e) {
            console.log(e)
            commonController.errorMessage("user not update", res)
        }
    }

//

async newPassword(req: Request, res: Response) {
    try {
        const { emailId, password, confirmPassword } = req.body;
        if (password != confirmPassword) {
            commonController.errorMessage("Password Not Matched", res);
        }
        else {
            await codeController.newPassword({
                 emailId, password
            }, res)
        }
    } catch (e) {
        console.log(e)
        commonController.errorMessage("not update", res)
    }
} 
  // Get User By Id
  async getByUserId(req: Request, res: Response) {
    try {
        const { emailId } = req.body;
        await codeController.getByUserId({
            emailId

        }, res)
    } catch (e) {
        commonController.errorMessage("user not get", res)
        console.log(e);

    }
}
/* Multi

Line

Comment

*/

  // update profile
  
 async updateProfile(req: Request, res: Response) {
    try {
        const { emailId,fullName ,newemailId} = req.body;
        await codeController.updateProfile({
            emailId,
            fullName,
            newemailId
        }, res)
    } catch (e) {
        commonController.errorMessage("user not get", res)
        console.log(e);

    }
}

// change Password
async changePassword(req: Request, res: Response) {
    try {
        const { id, password ,newPassword} = req.body;
        await codeController.changePassword({
            id, password,newPassword

        }, res)
    } catch (e) {
        commonController.errorMessage("user not login", res)

    }
}
// get all users
async getAll(req: Request, res: Response) {
    
    try {
        
        await codeController.getAll({
           

        }, res)
    } catch (e) {
        commonController.errorMessage("user not get", res)
        console.log(e);

    }
}
// async test(req: Request, res: Response) {
    
//     try {
//          const{cc,phone}=req.body;
//         await codeController.test({
//            cc,phone

//         }, res)
//     } catch (e) {
//         commonController.errorMessage("user not get", res)
//         console.log(e);

//     }
// }
      // delete user
      async deleteUser(req: Request, res: Response) {
        try {
            const { emailId } = req.body;
            await codeController.deleteUser({
                emailId
    
            }, res)
        } catch (e) {
            commonController.errorMessage("user not found", res)
            console.log(e);
    
        }
    }


    //qr code
    async qrCode(req: Request, res: Response) {
        try {
            await codeController.qrCode({
            }, res)
        } catch (e) {
            commonController.errorMessage("qr code is not found", res)
            console.log(e);
    
        }
    }

    //IMAGE UPLOAD
    async postImage(req: Request, res: Response) {
        try {
            await codeController.postImage({

            }, res)
        } catch (e) {
            commonController.errorMessage("qr code is not found", res)
            console.log(e);
    
        }
    }
    // image upload of users 
      async updatedImage(req, res) {
        try {
            var  phoneNO= req?.user?.phoneNO;
            console.log(phoneNO,"kkfjdfk");
            const {  profile } = req.file;
            console.log("req.......",req.file)
        //   const {fullName,organization,email,phone,description} = req.body;
        var sun = await db.Users.findOne({
            where: {
                phoneNO
            }
          })
          if (sun) {
            var response = `${req.file.path}`;
            if (response.match(/\.(png|jpg|jpeg)$/)) {
              await sun.update({profile:"https://api.orthomatri.com/" + response,});
              commonController.successMessage(req.file.path,"profile Uploaded Successfully", res);
          }else {
              commonController.errorMessage("Please upload png and jpg image file", res);
            }
          } 
        } catch (e) {
          console.log(e)
          commonController.errorMessage("not upload", res)
        }

      }



      // multiple images upload code 
      async sun(files,req,res){
        console.log("yes")
        console.log(req.body,"body here")
        console.log(files[0],"firstImage");
        console.log(files[1],"secondImage");
         // Add additional log statements to debug the extracted values
           let addImage = await db.Users.create({
            Image:files[0].path,
            photo:files[1].path,
          })
          commonController.successMessage(addImage,"data Uploading Successfully",res)
        }
        

        // privacy 
        async privacyuser(req: Request, res: Response) {
            try {
                var phoneNO=req?.user?.phoneNO;
                console.log("phone.......",res)
                const {lastseen,about,profilephoto,status } = req.body;
                await codeController.privacyuser({
                    lastseen,about,profilephoto,status,phoneNO
    
                }, res)
            } catch (e) {
                commonController.errorMessage("not verify", res)
    
            }
        }

        //delete account
        async deletaccount(req: Request, res: Response) {
            try {
                var phoneNO=req?.user?.phoneNO;
                await codeController.deletacc({
                  phoneNO
    
                }, res)
            } catch (e) {
                commonController.errorMessage("not verify", res)
            }
        }


        // change  phone number
        async changeno(req: Request, res: Response) {
            try {
                var phoneNO=req?.user?.phoneNO;
                const{newphonenumber}=req.body
                await codeController.changeno({
                  phoneNO,newphonenumber
    
                }, res)
            } catch (e) {
                commonController.errorMessage("not verify", res)
            }
        }
        

        // get   particular data  in multiple tables
        async get(req: Request, res: Response) {
            try {
                var id=req?.user?.id;
                // const{newphonenumber}=req.body
                await codeController.getdata({
                  id
                }, res)
            } catch (e) {
                commonController.errorMessage("not verify", res)
    
            }
        }
  // delete data 
   async deletedata(req:Request,res:Response){
    try {
        var id= req?.user?.id;
        // const{newphonenumber}=req.body
        await codeController.deletedata({
          id
        }, res)
    } catch (e) {
        commonController.errorMessage("not verify", res)

    }
}
// get all users
async getallusers(req:Request,res:Response){
    var id= req?.user?.id;
  try{
 await codeController.getallusers({

 },res)
  }catch(err){
    commonController.errorMessage("Error occured ",res )
  }
}


//kyc users
async kyc(req:Request,res:Response){
    var email=req?.user?.email
    try{
       const{Name,address,documentNo,documetnType,phoneNumber,dob}=req.body;
       console.log("jhfjh",req.body)
    await codeController.kys({
    Name,email,address,documentNo,documetnType,phoneNumber,dob
  },res)
}catch(err){
    commonController.errorMessage("user not found",res)
}
}


//add coins
async coins(req:Request,res:Response){
    var email=req?.user?.email
    try{
       const{coins}=req.body;
       console.log("jhfjh",req.body)
  await codeController.coins({
    coins,email
  },res)
}catch(err){
    commonController.errorMessage("user not found",res)
}
}








//
async  kycs(req: Request, res: Response) {
      try {
        const { Name, Email, address, documentNo, documetnType, phoneNumber, dob, email ,photo} = req.body;
        console.log("jdjf",req.body)
        const sun = await db.Users.findOne({
          where: {
            email,
          },
        });
        if (!sun) {
          return commonController.errorMessage('Email does not exist', res);
        }
        const moon = await db.KYCS.findOne({
          where: {
            User_id: sun.id,
          },
        });
        if (moon) {
          await moon.update({
            Name,
            Email,
            address,
            documentNo,
            documetnType,
            phoneNumber,
            dob,
            User_id: sun.id,
            photo: (req as any).file.path, // Save the path to the uploaded file
          });
          commonController.successMessage(moon, 'KYC updated successfully', res);
        } else {
          const newkyc = await db.KYCS.create({
            Name,
            Email,
            address,
            documentNo,
            documetnType,
            phoneNumber,
            dob,
            User_id: sun.id,
            photo: (req as any).file.path, // Save the path to the uploaded file
          });
          commonController.successMessage(newkyc, 'KYC data created', res);
        }
      } catch (err) {
        commonController.errorMessage('Error: An error occurred', res);
      }
    }


    //photo update kyc
    async updateImage(req, res) {
        try {
          var email = req?.user?.email;
          const { photo } = req.file;
          console.log("req.......", req.file);
          var response = `${req.file.path}`; // Initialize 'response' variable here
          var sun = await db.Users.findOne({
            where: {
              email
            }
          });
          if (!sun) {
            commonController.errorMessage("email does not exist", res);
          }
          const moon = await db.KYCS.findOne({
            User_id: sun.id
          });
          if (moon) {
            if (response.match(/\.(png|jpg|jpeg)$/)) {
              await moon.update({ photo: "https://api.orthomatri.com/" + response });
              commonController.successMessage(req.file.path, "photo Uploaded Successfully", res);
            }
          } else {
            commonController.errorMessage(" photo not updated ", res);
          }
        } catch (e) {
          console.log(e);
          commonController.errorMessage("Not uploaded", res);
        }
      }

     // get login type
     async s(req:Request,res:Response){
        try{
            await codeController.s({ 
            },res)
        }catch(ee){
            commonController.errorMessage("err",res)
        }

     }

     
     async sust(req:Request,res:Response){
        const{email,password}=req.body
        try{
            await codeController.sust({ 
                email,password
            },res)
        }catch(ee){
            commonController.errorMessage("err",res)
        }
     }
    //    //photo update kyc
    // async updateImage(req, res) {
    //     try {
    //       var email = req?.user?.email;
    //       const { photo } = req.file;
    //       console.log("req.......", req.file);
    //       var response = `${req.file.path}`; // Initialize 'response' variable here
    //       var sun = await db.Users.findOne({
    //         where: {
    //           email
    //         }
    //       });
    //       if (!sun) {
    //         commonController.errorMessage("email does not exist", res);
    //       }
    //       const moon = await db.KYCS.findOne({
    //         User_id: sun.id
    //       });
    //       if (moon) {
    //         if (response.match(/\.(png|jpg|jpeg)$/)) {
    //           await moon.update({ photo: "https://api.orthomatri.com/" + response });
    //           commonController.successMessage(req.file.path, "photo Uploaded Successfully", res);
    //         }
    //       } else {
    //         commonController.errorMessage(" photo not updated ", res);
    //       }
    //     } catch (e) {
    //       console.log(e);
    //       commonController.errorMessage("Not uploaded", res);
    //     }
    //   }












// season way api


async adduser(req,res){
    const {firstName,lastName,email,password,confirmPassword,} =req.body;
    try{
        await codeController.addUser({
            firstName,lastName,email,password,confirmPassword,
        },res)
    }catch(err){
        commonController.errorMessage("occured err",res)
    }
}



// 
async loginapi(req,res){
    const {email,password} = req.body;
    try{
        await codeController.loginuser({
  email,password
        },res)

    }catch(Err){
        commonController.errorMessage("occured error",res)
    }

}


async passwordforgot(req,res){
    const {email}=req.body;
    try{
        await codeController.passwordForgot({
            email
        },res)

    }catch(err){
        commonController.errorMessage("occured err",res)
    }
}


async newpassword(req,res){
    const {email,newpassword,NewconfirmPassword}=req.body;
    try{
        await codeController.NewPassword({
            newpassword,NewconfirmPassword,email
        },res)

    }catch(err){
        commonController.errorMessage("occured error",res)
    }

}

// addwishlist
async addwishlist(req,res){
    const {nameOfwish,comment,qty,email} =req.body;
    try{
        await codeController.addwishlist({
            nameOfwish,comment,qty,email
        },res)

    }catch(error){
        commonController.errorMessage("occured error",res)
    }
}


//   updatewishlist 
async updatewishlist(req,res){
    const {wishlistId,nameOfwish,comment,qty,email}= req.body;
    try{
       
await codeController.updateWishlist({
    nameOfwish,comment,qty,email,wishlistId
},res)
    }catch(err){
        commonController.errorMessage("occured error",res)
    }
}


// delete wishlist 
async deleteWishlist(req,res){
    const {email,wishlistId} =req.body;
    await codeController.deleteWishlist({
        email,wishlistId
    },res)

}


async ddd(req,res){
    try{
        await codeController.ddd({
        },res)
    }catch(Err){
        commonController.errorMessage("occured err",res)
    }
}


// add user contact info
async addUserinfo(req,res){
    const {email,fname,lname,phoneNumber,address,city,Zipcode,country,state,}= req.body;
    try{
    await codeController.addUserinfo({
        email,fname,lname,phoneNumber,address,city,Zipcode,country,state,
    },res)
    }catch(err){
        commonController.errorMessage("occured error",res)
    }
}

// update info
async updateUserinfo(req,res){
    const {  email,fname,lname,phoneNumber,address,city,Zipcode,country,state,contactId} =req.body;
    try{

        await codeController.updateUserinfo({
            email,fname,lname,phoneNumber,address,city,Zipcode,country,state,contactId

        },res)
    }catch(err){
        commonController.errorMessage("occured error",res)
    }
}


// delete user info
async deleteuserinfo(req,res){
    const {email,contactId} =req.body;
     try{
        await codeController.deleteUserinfo({
            email,contactId
        },res)
     }catch(err){
        commonController.errorMessage("occured error",res)
     }
}


// user feedback
async userfeedback(req,res){
    const {name,email,phoneNumber,query} = req.body;
    try{
         await codeController.userFeedback({
            name,email,phoneNumber,query
         },res)
    }catch(err){
        commonController.errorMessage(" occured error",res)
    }
}







// nodemailer 
async nodeMailer(req,res){
    const {name,email,phoneNumber,query} =req.body;
    try{

     await codeController.Nodemailer({
        name,email,phoneNumber,query
     },res)

    }catch(err){
        commonController.errorMessage("occured error",res)
    }

    
}

// generate-captcha
async getcaptcha(req,res){
    const {email} =req.body;
    try{
        await codeController.generatecaptcha({
           email
        },res)
    }catch(err){
        commonController.errorMessage("occured err",res)
    }
}
//  Node.js operates on a single main thread.
// Implication: Only one operation can be executed at a time in this main thread.
//  There's no parallel execution of code within the main thread itself.
// Node.js is single-threaded because it uses one main thread to handle all operations
//  verify captcha
 async verfiycaptcha(req:Request,res:Response){
    const {email,captcha}=req.body;
    try{
        await codeController.verifyCaptcha({
            email,captcha
        },res)


    }catch(err){
        commonController.errorMessage("occured error",res)
    }
 }


 async getData(req,res){
    const {email}=req.body;
    try{
await codeController.GetData({
    email
},res)
    }catch(err){
  commonController.errorMessage("occured error",res)
    }

 }

 // add products 
 async addproduct(req,res){
    const {ProductID,ProductName,SupplierID,CategoryID,Unit,Price}= req.body;
    try{       
   await codeController.addproduct({
    ProductID,ProductName,SupplierID,CategoryID,Unit,Price
    },res)
    }catch(err){
        commonController.errorMessage("occurede error",res)
    }
 }

 // update products 
 async updateproduct(req,res){
    const { ProductID,ProductName,SupplierID,CategoryID,Unit,Price}=req.body;
    try{
        await codeController.updateProduct({
            ProductID,ProductName,SupplierID,CategoryID,Unit,Price
        },res)
    }catch(error){
        commonController.errorMessage("occured error",res)
    }
 }

 // add customer
async addcustomer(req,res){
    const {ProductID,CustomerName,Address,City,Country,PostalCode} = req.body;
    try{
        await codeController.addCustomer({
        CustomerName,Address,City,Country,PostalCode,ProductID
        },res)

    }catch(Err){
        commonController.errorMessage("occured error",res)
    }
}

async ad(req,res){
    const{email}=req.body;
    try{
   await codeController.ad({
    email
   },res)
    }catch(err){
        commonController.errorMessage("occured error",res)
    }
}


// 
async createuser(req,res){
    const {email}=req.body;
    try{
await codeController.createuser({
  email
},res)
    }catch(Error){
        commonController.errorMessage("occured error",res)
    }
}
 

async buynumber(req,res){
    const {email,boughtNo} =req.body;
    try{
await codeController. buynumber({
    email,boughtNo
},res)
    }catch(Err){
        commonController.errorMessage("occured error",res)
    }
}

async addslot(req,res){
    const{slotName,startTime,endTime,entryFees,winAmount} = req.body;
    try{
        await codeController.addSlot({
            slotName,startTime,endTime,entryFees,winAmount
        },res)

    }catch(err){
        commonController.errorMessage("occured error",res)
    }
}

async updateslot(req,res){
    const { id,slotName,startTime,endTime,entryFees,winAmount } =req.body;
    try{
        await codeController.updateSlot({
            slotName,startTime,endTime,entryFees,winAmount ,id
        },res)

    }catch(Err){
        commonController.errorMessage("occured error",res)
    }
}




async getslot(req,res){
    try{
        await codeController.getslot({
     
        },res)
    }catch(Err){
        commonController.errorMessage("occired",res)
    }
}


async sendemail(req,res){
    const{email}=req.body;
 
    // try{
        await codeController.assss({
            email
        },res)

    // }catch(err){
    //     commonController.errorMessage("occured err",res)
    // }
}


async useradd(req,res){
    const { user_id,name} =req.body;
    try{
        await codeController.useradd({
            user_id,name
        },res)

    }catch(Err){
        commonController.errorMessage("occured error",res)
    }
} 

async sendmessage(req,res){
  const {user_id,sender_id,message,reciver_id} =req.body;
    try{
        await codeController.sendmessage({
            user_id,sender_id,message,reciver_id
        },res)

    }catch(err){
        commonController.errorMessage("occired error",res)
    }
}


async adduergroup(req,res){
    const {sender_id,message} =req.body;
    try{
        await codeController.addinusergroup({
           sender_id,message
        },res)

    }catch(err){
        commonController.errorMessage("occired error",res)
    }
}

}
  




    

export default new UserController();