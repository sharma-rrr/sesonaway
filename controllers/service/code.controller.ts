import { hash, hashSync } from 'bcryptjs';
import { Request, Response } from 'express';
let referralCodeGenerator = require('referral-code-generator');
const QRCode = require('qrcode');
const multer = require('multer');
const bcrypt = require('bcrypt');
const { Captcha } = require('node-captcha-generator');
const nodemailer = require("nodemailer");
const axios = require('axios');
const { CaptchaGenerator } = require('captcha-canvas');
import { io } from '../..';
var ffmpeg = require('ffmpeg');
// catcha store
const captchaStore = new Map<string, string>();
const SECRET_key='6LdpohYqAAAAANndZcmcGTT2LqZ7LBvJ5VTHWNdj'
// Example usage in your code
import moment from 'moment';
import { v4 as uuidv4 } from "uuid";

import bcryptjs = require("bcryptjs");
bcryptjs.genSalt(10, function (err, salt) {
    bcryptjs.hash("B4c0/\/", salt, function (err, hash) {
        // Store hash in your password DB.
    });
});
import db from "../../models"
const MyQuery = db.sequelize;
const { QueryTypes } = require('sequelize');
const { SECRET_KEY } = require('../../appconfig')
const jwt = require('jsonwebtoken')
import commonController from '../common/common.controller';
import { body, cookie, Result } from 'express-validator';
import { exists } from 'fs';
import { Encrypt } from '../common/encryptpassword';
import { error } from 'console';
import { TokenExpiredError } from 'jsonwebtoken';
import { resolveSoa } from 'dns';
import { ConversationPage } from 'twilio/lib/rest/conversations/v1/conversation';
import { escape } from 'querystring';
import { Pay } from 'twilio/lib/twiml/VoiceResponse';
import { sign } from 'crypto';
import { constants } from 'buffer';
import { data, post } from 'jquery';
import { Axios, responseEncoding } from 'axios';
import { captureRejectionSymbol } from 'events';
import e = require('express');
import { waitForDebugger } from 'inspector';


class CodeController {
    ///Section User Start
    async addNewUser(payload: any, res: Response){
        const {email,password,city,profile,country,Name,dob,refredBy,logintype,phoneNO} = payload;
        console.log(payload,"pay.........")  
        if(phoneNO){
            let checkPhone = await db.Users.findOne({
                where:{
                    phoneNO
                }
            })
            if(checkPhone){
                commonController.errorMessage("user with phone number is already exist",res)
            }else{
                const refer= commonController.generateOtp();
                var result = await db.Users.create({
                    email,city,profile,country,password:hash,Name,dob,refredBy,refredCode:refer,logintype,phoneNO
                })
                console.log("res........",result)
                commonController.successMessage(result,"user is regsiterd",res)
                return; 
            }
        } 
        var checkEmail = await db.Users.findOne({
            where: {
                email
            }
        })
        if (checkEmail) {
            commonController.errorMessage("Email Already Exists", res)
        }
         else {
            const refer= commonController.generateOtp();
            var hash = await Encrypt.cryptPassword(password.toString());
            var result = await db.Users.create({
                email,city,profile,country,password:hash,Name,dob,refredBy,refredCode:refer,logintype,phoneNO
            })
            commonController.successMessage(result,"user is regsiterd",res)
        }
        
    }

            // await commonController.sendEmail(emailId, 'Vefication Email', `Welcome Trice Pay <br/><br/>Dear ${fullName},<br/> Welcome to Trice Pay , <br/><br/> your verfication cod is ${otp}, <br/></br> Thanks, <br/><br/>Team Trice Pay`)

            // generate token

      
        async verify(payload: any, res: Response) {
            try {
                const { email,otp} = payload;
                var sun = await db.Users.findOne({
                    where:{
                        email
                    }
                })
                 console.log(sun.id,"ss")
                var checkOtp = await db.UserOtps.findOne({
                    where: {
                        userId:sun.id,
                        active: true
    
                    }

                })

                console.log(checkOtp,"ss")
                if (checkOtp) {
                    if (checkOtp.otpValue == otp) {
                        await checkOtp.update({ active: false });
                        commonController.successMessage({}, "Otp Verified", res)
                    } else {
                        commonController.errorMessage("Invalid OTP", res)
                    }
                }
            } catch (e) {
                commonController.errorMessage("Error:occured err",res)
            }
        }


    
        // login user 
        async loginUser(payload: any, res: Response) {
            const { email, password, phoneNO } = payload;
            console.log("Frfrfr",payload)
           try{
            if(phoneNO){
                let check = await db.Users.findOne({
                    where:{
                        phoneNO
                    }
                })
                if(check.logintype == 3){
                    const token = jwt.sign(
                        {
                          phoneNO,
                          id:check.id,
                          
                        },
                        process.env.TOKEN_SECRET
                      );
                      commonController.successMessage(token, "User login", res);
                }else{
                    commonController.errorMessage("please check your login type",res)
                }
            }
            let getType =await db.Users.findOne({
                where:{
                       email
                }
            })
            if(getType){
                if(getType.logintype == 2){
                    if (getType) {
                         if (await Encrypt.comparePassword(password.toString(), getType.password.toString())) {
                                  const token = jwt.sign({
                                      email,
                                      id:getType.id
                                   
                                  }, process.env.TOKEN_SECRET);
                                  commonController.successMessage(token, "User email and password login", res)
                              } else {
                                  commonController.errorMessage("INvalid Details", res)
                              }
                }else if(getType.logintype == 1){
                    const emailtoken = jwt.sign({
                        email,
                        id:getType.id
                     
                    }, process.env.TOKEN_SECRET);
                    commonController.successMessage(emailtoken, "User login", res)
                }
            }else{
                commonController.errorMessage("user not found",res)
            }
        }
           }catch(e){
            console.log(e);
            commonController.errorMessage("occred err",res)
            
           }
          }
      
          

    
    // verify user
    async verifyUser(payload: any, res: Response) {
        try {
            const { id, otp } = payload;
            var checkOtp = await db.UserOtps.findOne({
                where: {
                    userId: id,
                    active: true

                }
            })
            if (checkOtp) {
                if (checkOtp.otpValue == otp) {
                    await checkOtp.update({ active: false });
                    commonController.successMessage({}, "Otp Verified", res)
                } else {
                    commonController.errorMessage("Invalid OTP", res)
                }
            }
        } catch (e) {
            commonController.errorMessage("err mesage",res)
            
        }
    }

    
    //forgot Password
    async forgotPassword(payload: any, res: Response) {
        const { emailId } = payload;
        //Check If Email Exists
        var checkEmailId = await db.Users.findOne({
            where: {
                emailId
                }
        })
        if (checkEmailId) {
            //Generate Code
            var otp = commonController.generateOtp();
            console.log(otp);
            await db.UserOtps.create({
                otpValue: otp,
            })
            console.log(otp);
            await commonController.sendEmail(emailId, 'Your Email OTP To Reset Password', '<h1>Hi User  </h1><br> <p> Your email one time password (OTP) to reset password is ' + otp);
            commonController.successMessage(emailId, "link send  sucessfully", res)
        } else {
            commonController.errorMessage("Error:occred err",res)
        }
    }

    // updatePassword
    async updatePassword(payload: any, res: Response) {
        try {
            const { emailId, otp, password } = payload;
            // console.log(payload)
            var checkOtp = await db.UserOtps.findOne({
                where: {

                    otpValue: otp

                }
            })
            console.log(checkOtp.otpValue, otp);
            if (checkOtp) {
                if (checkOtp.otpValue == otp) {
                    commonController.successMessage({}, "Otp Verified", res)
                }
                else {
                    commonController.errorMessage("Invalid OTP", res)
                }
            }
        } catch (e) {
            commonController.errorMessage("occured err",res)
        }
    }
    // new password
    async newPassword(payload: any, res: Response) {
        const { emailId, password } = payload;
        //Check If Email Exists

        var checkdata = await db.Users.findOne({
            where: {
                emailId,

            }
        })
        console.log(emailId);
        if (checkdata) {
            var hash = await Encrypt.cryptPassword(password.toString());
            var result = await checkdata.update({
                password: hash,
            })
            commonController.successMessage(emailId, "password update  sucessfully", res)
        } else {
            commonController.errorMessage("Error:occured err", res)
            console.log("no");
        }
    }

    // get user by id
    async getByUserId(payload: any, res: Response) {
        const { emailId } = payload;
        //Check If Email Exists
        var checkdata = await db.Users.findOne({
            where: {
                emailId

            }
        })
        if (checkdata) {
            const token = jwt.sign({
                id: checkdata.id,
                emailId,
                name: checkdata.fullName,
                emailVerfied: checkdata.isEmailVerfied,
                is2FaEnabled: checkdata.is2FaEnabled,
                isPhoneVerfied: checkdata.isPhoneVerfied
            }, process.env.TOKEN_SECRET);
            console.log(token);
            commonController.successMessage(checkdata, "data get  sucessfully", res)

            console.log(checkdata);
        } else {
            commonController.errorMessage("data not get", res)
            console.log("no");
        }
    }


    // update profile
    async updateProfile(payload: any, res: Response) {
        const { emailId, fullName, newemailId } = payload;                                                                    
        //Check If Email Exists
        var checkdata = await db.Users.findOne({
            where: {
                emailId
            }
        })
        if (checkdata) {
            var result = await checkdata.update({
                fullName,
                emailId: newemailId

            })
            commonController.successMessage(checkdata, "data updated sucessfully", res)
            console.log(checkdata.emailId);
        } else {
            commonController.errorMessage("data not update", res)
            console.log("not found");
        }
    }

    
    // change Password
    async changePassword(payload: any, res: Response) {
        const { id, password ,newPassword} = payload;
        var hash = await Encrypt.cryptPassword(password.toString());
        //Check If Email Exists
        var checkdata = await db.Users.findOne({
            where: {
            id

            }
        })
        if (checkdata) {
            console.log(checkdata);
          const check =await Encrypt.comparePassword(password.toString(), checkdata.password.toString())
          console.log(check);
            if (await Encrypt.comparePassword(password.toString(), checkdata.password.toString())) {
                var result = await checkdata.update({
                    password : newPassword
    
                })
               console.log(hash);
                 console.log("ok ");
                 commonController.successMessage(id, "Password changed successfully", res)
            } else {
                commonController.errorMessage("INvalid Details", res)
            }
        }
        else {
            commonController.errorMessage("Email password not match", res)
            console.log("no");
        }
} 

        // find all users

        async getAll(payload: any, res: Response) {
            var checkdata = await db.Users.findAll({
                
            })
            if (checkdata) {
                commonController.successMessage(checkdata, "data get  sucessfully", res)
                // console.log(checkdata);
            } else {
                commonController.errorMessage("data not get", res)
                console.log("no");
            }
        }


        // async test(payload: any, res: Response) {
        //     const {cc,phone}=payload;
        //     console.log(payload,"pa") 
        //     client.messages.create({
        //         body: 'Hello from Node',
        //         to: '+916284507322',
        //         from: '+12345678901'
        //      }).then(message => console.log(message))
        //        // here you can implement your fallback code
        //        .catch(error => console.log(error))
           
        // }


       // delete user
       
       async deleteUser(payload: any, res: Response) {
        const { emailId } = payload;
        //Check If Email Exists
        var checkdata= await db.Users.findOne({
            where: {
                emailId

            }
        })
        if (checkdata) {
             var result =checkdata.destroy({
                where: {
                   emailId:emailId
                }
             }).then(function(rowDeleted){ // rowDeleted will return number of rows deleted
               if(rowDeleted === 1){
                  console.log('Deleted successfully');
                }
             }, function(err){
                 console.log(err); 
             });
            
            commonController.successMessage(checkdata, "data delete  sucessfully", res)
            console.log("data delete  sucessfully");
    
        } else {
            commonController.errorMessage("data not delete", res)
            console.log("not found");
        }
    }

    //qr code 
   async qrCode(payload: any, res: Response) {
  const generateQR = async (text) => {
    try {
      const dataUrl = await QRCode.toDataURL(text);
      console.log(dataUrl);
      commonController.successMessage(dataUrl, "QR code generated successfully", res);
    } catch (e) {
      commonController.errorMessage("Failed to generate QR code", res);
      console.log(e);
    }
  };

  await generateQR("http://google.com");
}
 

//post image
async postImage(req: any, res: any) {
  try{
    var response = `$(req.file.path)`;
    console.log(response,"hhhhhhhhhhhhh");
    if (response.match(/\.(png|jpg|jpeg)$/)) {
        await db.avatars.create(
            {
                avatar: "http://localhost:4000/" + response,
            
            },
            res
        );
    }
        commonController.successMessage(req.file.path, "image upload succesfully", res);
      } catch (e) {
        commonController.errorMessage("image not upload oops!", res);
        console.log(e);
      }
    }



// add users
async  add(payload, res) {
    const { Name, phoneNO, about, country } = payload;
    try {
        const user = await db.Users.findOne({
            where: {
                phoneNO
            }
        })
        if (user) {
            commonController.errorMessage("Error: Phone number is already exist", res)
        } else {
            const newUser = await db.Users.create({
                Name,
                phoneNO,
                about,
                country
            })
            // Check if an OTP entry already exists for this user
            const existingOTP = await db.UserOtps.findOne({
                where: {
                    userId: newUser.id
                }
            });
            if (existingOTP) {
                // Update the existing OTP entry
                var otp = commonController.generateOtp();
                console.log(otp);
                await existingOTP.update({
                    otpType: 1,
                    otpValue: otp,
                    active: false
                });
            } else {
                // Create a new OTP entry
                var otp = commonController.generateOtp();
                console.log(otp);

                await db.UserOtps.create({
                    userId: newUser.id,
                    otpType: 1,
                    otpValue: otp,
                    active: true
                });
            }
            commonController.successMessage(newUser, "User is registered", res)
        }
    } catch (error) {
        console.error(error);
        commonController.errorMessage("Error: An occurred error", res)
    }
}


// verify otp
async  otp(payload, res) {
    const { otpValue, phoneNO } = payload;
    try {
        // Find the user by phone number
        const user = await db.Users.findOne({
            where: {
                phoneNO
            }
        });
        if (!user) {
            // User does not exist
            commonController.errorMessage("Phone number is not exist", res);
        } else {
            // Check if there's an OTP entry for the user with the provided OTP value
            const otpEntry = await db.UserOtps.findOne({
                where: {
                    userId: user.id,
                    otpValue,
                    active: true // Assuming active field indicates the OTP is active
                }
            });
            if (!otpEntry) {
                // OTP is invalid or expired
                        commonController.errorMessage("Invalid OTP", res);
                    } else {
                // OTP is valid
                await otpEntry.update({
                    active: false
                });
             commonController.successMessage({},"OTP is valid", res);
            }
        }
     } catch (error) {
        console.error(error);
        commonController.errorMessage("An occurred error", res);
     }
  }


// privacy setting 
async privacy(payload: any, res: Response) {
    const { nobody, everyone, mycontactexception, mycontacts, phoneNO } = payload;
    try {
        // Find the user by phone number
        const user = await db.Users.findOne({
            where: {
                phoneNO
            }
        });
        if (!user) {
            commonController.errorMessage("Phone number not found", res);
        }
        // Find the privacy settings for the user
        let privacy = await db.Privacy.findOne({
            where: {
                userId: user.id
            }
        });
        if (privacy) {
            // Destroy the existing privacy settings
            await privacy.destroy();
        }
        // Create new privacy settings for the user
       const sun = await db.Privacy.create({
            nobody,
            everyone,
            mycontactexception,
            mycontacts,
            userId: user.id
        });
        commonController.successMessage({}, "Privacy settings updated", res);
    } catch (error) {
        console.error(error);
        commonController.errorMessage("An error occurred", res);
    }
}


 // language choose
  async hey(payload:any,res:Response){
   const{language,phoneNO}=payload;
   try{
    const  sun= await db.Users.findOne({
        where:{
            phoneNO
        }
        
    })
    if(!sun){
        commonController.errorMessage("sun not exist",res)  
    }
    const moon=await db.Language.findOne({
        where:{
            userid:sun.id

        }
    })
    if (moon){
        await moon.update({
            language
        })

        
    commonController.successMessage({},"user updated sucsfully",res)
    }else{
        const newlanguage=await db.Language.create({
            language, userid:sun.id
        })
        commonController.successMessage(newlanguage,"language  created successfully",res)
    }
    }catch(error){
     commonController.errorMessage("occured error",res)
    }
   }

   // login with phonenumber and otp  value
async loginotp(payload:any,res:Response){
const{otpValue,phoneNO}=payload;
console.log("hfjhjjh",payload)
try{
    const sun=await db.Users.findOne({
        where:{
           phoneNO 
        }
    })
    if(sun){
        console.log
        ("Dfdd",sun)
        if  (otpValue ===otpValue) {
              const token = jwt.sign(
                {
                  phoneNO,
                  about: sun.about,
                  emailVerfied: sun.isEmailVerfied,
                  Name:sun.Name,id:sun.id
                },
                process.env.TOKEN_SECRET
              );
              commonController.successMessage(token, "User login", res);
            } else {
              // Invalid OTP.
              commonController.errorMessage("Invalid OTP", res);
            }
          } else {
            commonController.errorMessage("No OTP record found for the user", res);
          }
}catch(err){
    commonController.errorMessage("occured error",res)
}
} 



// privacy of  users
async privacyuser(payload:any,res:Response){
    const{lastseen,profilephoto,about,status,phoneNO}=payload
    console.log("pay........",payload)
    try{
    const user=await db.Users.findOne({
        where:{
        phoneNO
        }
    })
    console.log("user..",user)
    if(!user){
        commonController.errorMessage("Error:user not found",res)
    }
       const sun=await db.Privacy.findOne({
        where:{
            userId:user.id
        }
    })
    
    if(sun){
        await sun.update({
        lastseen,status,about,profilephoto
        })
        commonController.successMessage({},"update data",res)
        }
        else{
       const moon=await db.Privacy.create({
        lastseen,profilephoto,about,status, userId:user.id
       })
       commonController.successMessage(moon,"data created ",res)
    }
    }catch(error){
    commonController.errorMessage("Error:occred error",res)
    }
}


// delet accont User
async deletacc(payload:any,res:Response){
const{phoneNO}=payload;
try{
    const sun=await db.Users.findOne({
        where:{
            phoneNO
        }
    })
    if(sun){
        await sun.destroy({
            phoneNO
        })

        commonController.successMessage(sun,"users is destroy",res)
    }
    else{
        commonController.errorMessage("user not  destroy",res)
    }
    }catch(err){
    commonController.errorMessage("Error:occured err",res)
}
}


// change phone number update 
async changeno(payload: any, res: Response) {
    const {newphonenumber, phoneNO}=payload;
    try {
        const user = await db.Users.findOne({
            where: {
                phoneNO
            }
        });
        if (!user) {
            commonController.errorMessage("phone number is not found", res);
        } else {
            await user.update({
                phoneNO:newphonenumber
             });
            commonController.successMessage(user, "Phone number updated successfully", res);
        }
    } catch (err) {
        commonController.errorMessage("Error: An error occurred", res);
    }
}



//get data multiple tables / get particular  data multiples tables
async getdata(payload: any, res: Response) {
    const { id } = payload;
    try {
        const sqlQuery = `
        SELECT u.Name,u.id, u.about, u.phoneNO, u.country,
        o.userId AS usersotp_userId, o.otpValue,o.id,
         p.lastseen, p.status, p.about AS privacy_about,p.userId AS privacy_userId,
         p.id,p.profilephoto AS privacy_profilephoto 
         FROM users AS u  INNER JOIN userotps AS o ON u.id = o.userId
         INNER JOIN privacies AS p ON u.id = p.userId
         where u.id=${id}
      `;
       console.log("quwrr..........",sqlQuery)
      var result = await MyQuery.query(sqlQuery,{ type: QueryTypes.SELECT });
      if (result.length > 0) {
        commonController.successMessage(result, "get particular data", res);
      } else {
        commonController.errorMessage("Data not found", res);
      }
    } catch (err) {
      commonController.errorMessage("An error occurred", res);
    }
  }






// delete users
  async deletedata(payload: any, res: Response) {
    const {id} = payload;
    try {
        const sqlQuery =`
            DELETE u, o, p,l
            FROM users AS u
            LEFT JOIN  userotps AS o ON u.id = o.userId
            LEFT JOIN  privacies AS p ON u.id = p.userId
            LEFT JOIN languages AS l ON u.id = l.userid
            WHERE u.id = ${id}
        `;
        console.log("query..........", sqlQuery);
        var result = await MyQuery.query(sqlQuery,{ type: QueryTypes.Delete });
        commonController.successMessage({} ,"Deleted particular data", res);
    } catch (err) {
        commonController.errorMessage("Error: occurred error", res);
    }
}



// get all users data 
async getallusers(payload:any,res:Response){

   try{
    const sun=await db.Users.findAll({
    })
    commonController.successMessage(sun,"get all data",res)
   }catch(err){
    commonController.errorMessage("occerd err",res)
   }
}





// kyc users
async kys(payload:any,res:Response){
const{Name,Email,address,documentNo,documetnType,phoneNumber,dob,email}=payload;
try{
    const sun=await db.Users.findOne({
        where:{
            email
        }
    })
    if(!sun){
        commonController.errorMessage("Email does not exist ",res)
    }
    const moon=await db.KYCS.findOne({
        where:{
            User_id:sun.id
        }
      
    })
    if(moon){
        await moon.update({
            Name,Email,address,documentNo,documetnType,phoneNumber,dob,
           })
        commonController.successMessage(moon," kyc updated sucesfully ",res)
    }
    else{
        const newkyc=await db.KYCS.create({
            Name,Email,address,documentNo,documetnType,phoneNumber,dob,User_id:sun.id,
           })
        commonController.successMessage(newkyc," kyc data creted ",res)
    }
    }catch(err){
    commonController.errorMessage("Error:occred err",res)
 }
 }

 


// coins add
async coins(payload:any,res:Response){
    const{coins,email}=payload
    try{
     const sun=await db.Users.findOne({
        where:{
       email
        }
     })
    if(!sun){
        commonController.errorMessage("user not found",res)
    }
      const moon=await db.Coins.findOne({
        where:{
            userId:sun.id
        
        }
        })
     if(moon){
        await moon.update({
        coins
        })
        commonController.successMessage(moon,"updated sucessfully",res)
     }
    else{
        const newcoins=await db.Coins.create({
            coins,userId:sun.id
        })
        commonController.successMessage(newcoins,"add coins",res)
    }
    }catch(e){
        commonController.errorMessage( "Error occerd",res)
    }
}



// Function get login type
async  s(payload:any, res:Response) {
 try{
    const sun=await db.Users.findAll({
        where:{
            logintype:3
        }
    })
    if(!sun){
        commonController.errorMessage("login type nhi hai ",res)
    }
    else{
        commonController.successMessage(sun,"login type three get ",res)
    }
     }catch(Err){
    commonController.errorMessage("occred err",res)
     }
}


//  sust 
async  sust(payload:any, res:Response) {
    const{email,password}=payload;
    try {
        let myArray = [1];
        for (var i = 0; i < 5; i++) {
           // Push the value of 'i' into the array 'a'
           myArray.push(i)
        }
        commonController.successMessage(myArray,"shhj",res)
        console.log("myarray......",myArray)
    } catch (error) {
        commonController.errorMessage("Error occurred", res);
    }
}




// adduser 
async  addUser(payload, res) {
    const { firstName, lastName, email, password, confirmPassword,} = payload;
    try {
        const existingUser = await db.Users.findOne({ 
            where: {
                 email

                 } 
        });
        if (existingUser) {
              // generate token
              const token = jwt.sign({
                email,
                id: existingUser.id
            }, SECRET_KEY);
    
     commonController.successMessage(token,"existing tokken",res)
        }

       else if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }else{
            
            const newUser = await db.Users.create({
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
            });
    
         // generate token
            const token = jwt.sign({
                email,
                id: newUser.id
            }, SECRET_KEY);
    
          commonController.successMessage({newUser,token},"user create successfuly",res)
        
        }
    }catch (err) {
       console.log(err,"errrr");
       commonController.errorMessage("occured error",res)
    }
}




// login user 
async  loginuser(pay, res) {
    const { email, password } = pay;
    console.log("pay", pay);
    try {
        const user = await db.Users.findOne({
            where: {
                email
            }
        });

        if (!user) {
            return commonController.errorMessage("User not exist", res);
        }
        if (user.password == password) {
            const token = jwt.sign({
                email,
                id: user.id
            }, process.env.TOKEN_SECRET);

            return commonController.successMessage(token, "User login", res);
        } else {
            return commonController.errorMessage("Invalid password", res);
        }
    } catch (err) {
        console.error("Error occurred:", err);
        return commonController.errorMessage("An error occurred", res);
    }
}


// password forgot
async passwordForgot(payload:any,res:Response){
    const {email,otpValue}=payload;
    try{
        const user =await db.Users.findOne({
            where:{
                email
            }
        })

        if(!user){
            commonController.errorMessage("user not found",res)
        }
       const otp =commonController.generateOtp();
        const userotp=await db.UserOtps.findOne({
            userId:user.id,
        })
        if(userotp){
             await userotp .update({
                otpValue:otp,active:1
             })

             commonController.successMessage(userotp,"opt update successfuly",res)
        }else{
            const adduserotp =await db.UserOtps.create({
              otpValue:otp,active:0,userId:user.id,

            })
            commonController.successMessage(adduserotp,"create data",res)
        }
    }catch(err){
        commonController.errorMessage("occured error",res)
    }
}


// newpassword 
async  NewPassword(payload, res) {
    const { email, newpassword, NewconfirmPassword } = payload;
    try {
        const user = await db.Users.findOne({
            where: {
                email
            }
        });
        if (!user) {
            commonController.errorMessage("User not found", res);
            return;
        }

      if (newpassword !== NewconfirmPassword) {
            commonController.errorMessage("New passwords do not match", res);
            return;
        }
        else{   
            await user.update({
            password: newpassword,confirmPassword:NewconfirmPassword
        });

        commonController.successMessage(user, "Password updated", res);}
        

    } catch (err) {
        console.log(err, "Error occurred");
        commonController.errorMessage("An error occurred", res);
    }
}



async addwishlist(payload:any,res:Response){
    const {  nameOfwish,comment,qty,email} =payload;
    try{
    const user =await db.Users.findOne({
        where:{
            email
        }
    })
   if(!user){
       commonController.errorMessage("user not found",res)
  }
 else{
    const addwishlist =await db.Wishlists.create({
        nameOfwish,comment,qty,productid:user.id
       })

       commonController.successMessage(addwishlist," user wishlist add successfuly",res)
}
    }catch(err){
        commonController.errorMessage("occured error",res)
    }
}



// update wishlist 
async updateWishlist(payload: any, res: Response) {
    const { wishlistId, comment, qty, email } = payload;
    try {
        const user = await db.Users.findOne({
            where: {
                email
            }
        });
        if (!user) {
            return commonController.errorMessage("User not found", res);
        }
        const wishlist = await db.Wishlists.findOne({
            where: {
                id: wishlistId,
                productid: user.id
            }
        });

        if (wishlist) { 
            await wishlist.update({
                comment,
                qty
            });
            return commonController.successMessage(wishlist, "Wishlist updated successfully", res);
        } else {
            return commonController.errorMessage("Wishlist not found", res);
        }
    } catch (err) {
        console.log("Error:", err);
        // Handle any errors that occurred during the process
        return commonController.errorMessage("Error occurred", res);
    }
}



// destroy wishlist
async deleteWishlist(payload: any, res: Response) {
    const { wishlistId, email } = payload;
    try {
        const user = await db.Users.findOne({
            where: {
                email
            }
        });
        if (!user) {
            return commonController.errorMessage("User not found", res);
        }
        const wishlist = await db.Wishlists.findOne({
            where: {
                id: wishlistId,
                productid: user.id
            }
        });
        if (wishlist) {
            await wishlist.destroy();
            return commonController.successMessage(null, "Wishlist deleted successfully", res);
        } else {
            return commonController.errorMessage("Wishlist not found", res);
        }

    } catch (err) {
        console.log("Error:", err);
        return commonController.errorMessage("Error occurred", res);
    }
}



async ddd (payload:any,res:Response) {
    try {
        const captcha = new Captcha({
            length: 5, 
            size: {
                width: 450,
                height: 200,
            },
        });
    
        captcha.toBase64((err: Error, base64: string) => {
            if (err) {
                console.error("Captcha Error:", err);
                res.status(500).send('Failed to generate captcha');
                return;
            }
    
            const base64Data = base64.replace(/^data:image\/png;base64,/, "");
            const binaryData = Buffer.from(base64Data, 'base64');
    
            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': binaryData.length
            });
            res.end(binaryData);
        });
    } catch (err) {
        console.error("Error generating captcha:", err);
        commonController.errorMessage("An error occurred", res);
    }
}

// user contact info-

async addUserinfo(payload: any, res: Response) {
    const {email, fname, lname, phoneNumber, address, city, Zipcode, country, state} = payload;
    try {
        const user = await db.Users.findOne({
            where: {
                 email 
                }
        });
        if (!user) {
            return commonController.errorMessage("User not found", res);
        }
        const userinfo = await db.Contacts.create({
            fname,
            lname,
            phoneNumber,
            address, 
            city,
            Zipcode,
            country,
            state,
            userId: user.id
        });

        return commonController.successMessage(userinfo, "User contact information added successfully", res);
    } catch (err) {
        console.error("Error adding user info:", err);
        return commonController.errorMessage("An error occurred", res);
    }
}



// update user info
async updateUserinfo(payload: any, res: Response) {
    const { email, fname, lname, phoneNumber, address, city, Zipcode, country, state, contactId } = payload;
    try {
        if (!email) {
            return commonController.errorMessage("Email is required", res);
        }

        if (!contactId) {
            return commonController.errorMessage("Contact ID is required", res);
        }

        const user = await db.Users.findOne({
            where: { 
                email 
            }
        });

        if (!user) {
            return commonController.errorMessage("User not found", res);
        }

        const userinfo = await db.Contacts.findOne({
            where: {
                id: contactId,
                userId: user.id
            }
        });

        if (!userinfo) {
            return commonController.errorMessage("User contact ID not found", res);
        }

        await userinfo.update({
            fname,
            lname,
            phoneNumber,
            address,
            city,
            Zipcode,
            country,
            state
        });

        return commonController.successMessage(userinfo, "User contact information updated successfully", res);
    } catch (err) {
        console.error("Error updating user info:", err);
        return commonController.errorMessage("An error occurred", res);
    }
}


// delete user info 

async deleteUserinfo(payload: any, res: Response) {
    const { email, contactId } = payload;
    try {
        if (!email) {
            return commonController.errorMessage("Email is required", res);
        }
        if (!contactId) {
            return commonController.errorMessage("Contact ID is required", res);
        }

        const user = await db.Users.findOne({
            where: { 
                email 
            }
        });

        if (!user) {
            return commonController.errorMessage("User not found", res);
        }

        const contactInfo = await db.Contacts.findOne({
            where: {
                id: contactId,
                userId: user.id
            }
        });

        if (!contactInfo) {
            return commonController.errorMessage("Contact information not found", res);
        }
        await contactInfo.destroy();
        return commonController.successMessage(null, "User contact information deleted successfully", res);
    } catch (err) {
        console.error("Error deleting user info:", err);
        return commonController.errorMessage("An error occurred", res);
    }
}



// user feedback
async userFeedback(payload:any,res:Response){
    const{name,email,phoneNumber,query} =payload;
    try{
 const userfeedback = await db.Feedbacks.create({
    name,email,phoneNumber,query
 })
  commonController.successMessage(userfeedback,"user feedback done",res)
    }catch(err){
        commonController.errorMessage("occured error",res)
    }
}


// node mailer
async  Nodemailer(payload: any, res: Response) {
    const { name, email, phoneNumber, query } = payload;
    // Create the enhanced HTML message with the new logo
    const welcomeMessage =`
    <section style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 50px 0;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <div style="padding: 20px; text-align: center; background-color: #007bff; color: #ffffff; border-radius: 8px 8px 0 0;">
                <h1 style="margin: 0; font-size: 24px;">Welcome to ankoverseas</h1>
            </div>
            <div style="padding: 20px;">
                <p style="font-size: 18px; line-height: 1.6; margin: 0;">
                    Hello This is ${name},
                </p>
                <p style="font-size: 18px; line-height: 1.6; margin: 20px 0;">
                   ${query}
                </p>
                <p style="font-size: 18px; line-height: 1.6; margin: 20px 0;">
                    <strong>Details of your submission:</strong><br>
                    <strong>Phone Number:</strong> ${phoneNumber}<br>   
                </p>
              
                <p style="font-size: 18px; line-height: 1.6; margin: 20px 0;">
                    Thanks and regards,<br>
                    ${name}
                </p>
            </div>
            <div style="text-align: center; padding: 20px; background-color: #007bff; color: #ffffff; border-radius: 0 0 8px 8px;">
                <img src="https://example.com/new-ankoverseas-logo.png" alt="ankoverseas Logo" style="width: 150px; height: auto; margin-bottom: 10px;">
                <p style="margin: 0;">&copy; 2024 ankoverseas. All rights reserved.</p>
            </div>
        </div>
    </section>`;
    try {
        const info = await commonController. transporter.sendMail({
            from: "<rajni@airai.games>", // Sender address  
            to: 'rajnimodgill4@gmail.com', // List of receivers
            subject: `Welcome to ankoverseas`, // Subject line
            text: `Name: ${name}\nPhone: ${phoneNumber}\nQuery: ${query}`, // Plain text body
            html: welcomeMessage, // HTML body
        });

        console.log("Message sent: %s", info.messageId);

        // Store feedback in the database
        const user = await db.Feedbacks.create({
            name, email, phoneNumber, query
        });

        commonController.successMessage(user, "User data saved successfully", res);
    } catch (err) {
        console.error("Error occurred:", err);
        commonController.errorMessage("An error occurred while processing your request.", res);
    }
}   






// Function to check if the server is working 
async  checkServer() {
    const errorMessage = 'Server error: Please check the server';
    try {
        const response = await axios.get('https://airaielectric.com/nodeapi/api/v1/auth/checkserver');
        if (response.status === 200) {
            console.log("Server is working");
        } else {
      const sendmail = await commonController.transporter.sendMail({
                    from: 'rajni@airai.games',
                    to: 'rajnimodgill4@gmail.com',
                    subject: 'Server Error Notification',
                    text: errorMessage,
                    html: `<p>${errorMessage}</p>`,
                });
                console.log('Error notification sent.');  
        }
    } catch (err) {
        console.error('Error checking server:', err);
      //  send an error notification email
        const servererr =await commonController.transporter .sendMail({
            from: 'rajni@airai.games', // Sender address
            to: 'rajnimodgill4@gmail.com', // List of receivers
            subject: 'Server Error Notification',
            text: errorMessage,
            html: `<p>${errorMessage}</p>`
        });
    }
} 


// get captcha
async generatecaptcha(payload: any, res: Response) {
    const { email } = payload;
    if (!email) {
      return commonController.errorMessage("Email is required", res);
    }
    try {
      const user = await db.Users.findOne({
        where: {
          email,
        },
      });
      // Generate a new CAPTCHA
      const options = { height: 200, width: 600 };
      console.log(options, "optiondata");
      const captcha = new CaptchaGenerator(options); // Getting captcha constructor
      console.log(captcha, "captcha data");
  
      const buffer = await captcha.generate(); // Returns buffer of the captcha image
      console.log(buffer, "buffer data");
      // Convert buffer to Base64
      const base64Image = buffer.toString('base64');
      const imageUrl = `data:image/png;base64,${base64Image}`;
  
      // Store CAPTCHA text associated with the email
      captchaStore.set(email, captcha.text);
      if (user) {
        await user.update({
          captcha: captcha.text,
        });
 commonController.successMessage({email,captcha: captcha.text,imageUrl,},"Usecaptcha updated successfully", res);
      } else {
        commonController.errorMessage("User not found", res);
      }
    } catch (error) {
      console.error('Error generating CAPTCHA:', error);
     commonController.errorMessage('Internal Server Error',res);
    }
  }
  

  // verify captcha 
  async verifyCaptcha(payload:any,res:Response){
    const {email,captcha}=payload;
    console.log(payload,'payload data');
    try{
        const  user =await db.Users.findOne({
            where:{
                email
            }
        })
        if(!user){
            commonController.errorMessage("user not found",res)
        } else if(user.captcha === captcha){
            commonController.successMessage({},"verify Captcha successfully",res)
        }else{
            commonController.errorMessage(" invalid Captcha || captcha not verifiy " ,res)
        }
    }catch(Err){
        commonController.errorMessage("occured error",res)
    }
  }


  // get data
  async GetData(payload: any, res: Response) {
    const { email } = payload;
    try {
        const sql = `SELECT users.email, users.firstName, users.id,users.lastName,userotps.userId AS_otpuserid, userotps.otpValue
         FROM users
            LEFT JOIN userotps ON users.id = userotps.userId
            WHERE users.email = :email;
        `;
        const result1 = await MyQuery.query(sql, {
            replacements: { email },
            type: QueryTypes.SELECT
        });
        commonController.successMessage(result1, "Data retrieved successfully", res);
    } catch (err) {
        console.error(err); // Log the actual error for debugging
        commonController.errorMessage("An error occurred", res);
    }
}


// add product
async addproduct(payload:any,res:Response){
    const { ProductID,ProductName,SupplierID,CategoryID,Unit,Price } = payload;
    try{
        const user =await db.Products.findOne({
            where:{
                ProductID
            }
        })
        if(user){
            commonController.errorMessage("product id already  exist",res)

        }else{
            const  product= await db.Products.create({
                ProductID,ProductName,SupplierID,CategoryID,Unit,Price
            })
            commonController.successMessage(product," product create successfully",res)
        }
    }catch(err){
        commonController.errorMessage("occured error",res)
    }
}

// update product 
async updateProduct(payload:any,res:Response){
    const{ ProductID,ProductName,SupplierID,CategoryID,Unit,Price } =payload;
    try{
        const product =await db.Products.findOne({
            where:{
                ProductID
            }
        })
        if(!product){
            commonController.errorMessage("product id not exist",res)
        }
            await product .update({
            ProductName,SupplierID,CategoryID,Unit,Price
        })
        commonController.successMessage(product,"update product data successfuly",res)

    }catch(error){
        commonController.errorMessage("occcured error",res)
    }

}

async  addCustomer(payload: any, res: Response) {
    const { ProductID, CustomerID, CustomerName, Address, City, Country, PostalCode } = payload;
    console.log(payload,"payload...,.,.,.");
    try {
        const product = await db.Products.findOne({
            where: {
                 ProductID 
                }
        });
        console.log(product,"sdfjdbfndn");
        if (!product) {
            return commonController.errorMessage("Product does not exist", res);
        }
        const existingCustomer = await db.Customers.findOne({
            where: { 
                CustomerID: product.id
             }
        });
        const newCustomer = await db.Customers.create({
            CustomerName,
            Address,
            City,
            Country,
            PostalCode,
            CustomerID: product.id
        });

        return commonController.successMessage(newCustomer, "Customer added successfully", res);
    } catch (error) {
        console.error("Error:", error);
        return commonController.errorMessage("An error occurred while adding the customer", res);
    }
}

async sa(payload:any,res:Response){
    const{email}=payload;
    try{
        let stringArray = ["Hello", "World", "This", "Is", "An", "Array"];
        console.log(stringArray,"sfdfdf");
        console.log(typeof stringArray,"dfdfd");
    }catch(er){
        commonController.errorMessage("occured error",res)
    }
  
}


 async ad(payload:any,res:Response){
    const{email}=payload;
 try{
// Array of any type
let a: any[] = []; // Initialize an empty array that can hold any datatype
a.push({ name: "Shiv" });  // Push an object into the array
console.log(a);  
console.log(typeof a,"jk");


// Array of strings
let moon: string[] = []; // Initialize an empty array that can hold strings
moon.push("shiv", "preet", "balkishan");  // Push multiple strings into the array
console.log(moon, "log type"); 

// Array of numbers
let sun: number[] = []; // Initialize an empty array that can hold numbers
sun.push(21,2,3);  // Push a number into the array
console.log(sun, "log type number");  

// Array of objects
let obj: object[] = []; // Initialize an empty array that can hold objects
obj.push({ name: "g", age: 4 });  // Push an object into the array
console.log(obj, "arr of object");  
    }catch(error){
        commonController.errorMessage("occured error",res)
    }
 }


 async createuser(payload: any, res: Response) {
    const { email } = payload;
    try {
      const user = await db.Users.findOne({
        where: {
          email,
        },
      });
      if (user) {
        commonController.errorMessage("User already exists", res);
      } else {
        const newuser = await db.Users.create({
          email,
        });
        commonController.successMessage(newuser, "User added successfully", res);
      }
    } catch (err) {
      commonController.errorMessage("An error occurred", res);
    }
  }
  
 
async buynumber(payload:any,res:Response){
    const{email,boughtNo}=payload;
    try{
        if (boughtNo < 1 || boughtNo > 10) {
            commonController.errorMessage("Invalid number. Please buy a number between 1 and 10.", res);
            return;
          }
        const user =await db.Users.findOne({
            where:{
                email
            }
        })
    if(!user){
        commonController.errorMessage("user not found",res)
        return;
    }
    const bought =await db.BoughtNumbers.findOne({
        where:{
            boughtNo,
            userId:user.id
        }

    })

    if(bought){
        commonController.errorMessage("bought number exist",res)
        return;
    }else{
        const newBoughtNumber =await db.BoughtNumbers.create({
            boughtNo,    userId:user.id
        })
     commonController.successMessage(newBoughtNumber, "Number bought successfully", res);

      // Emit real-time update to all clients
      io.emit('numberBought', { number: boughtNo });
    }
     
  
    }catch(err){
        commonController.errorMessage("occured error",res)
    }
}


// slot 
async addSlot(payload:any,res:Response){
    const{slotName,startTime,endTime,entryFees,winAmount} =payload;
    try{
        const newSlot = await db.Slots.create({slotName,startTime,endTime,entryFees,winAmount });
        commonController.successMessage(newSlot, "Slot created successfully", res);
    }catch(er){
        commonController.errorMessage("occured err",res)
    }
}



async updateSlot(payload:any,res:Response){
    const { id,slotName,startTime,endTime,entryFees,winAmount} =payload;
    try{
        const slot =await db.Slot.findOne({
            where:{
                id
            }
        })
        if (!slot) {
            commonController.errorMessage("Slot not found", res);
            return;
          }
          await slot.update({ slotName, startTime, endTime, entryFees, winAmount });
          commonController.successMessage(slot, "Slot updated successfully", res);
    }catch(Err){
        commonController.errorMessage("occired error",res)
    }
    
}


async getslot(pay, res) {
    try {
      const slots = await db.Slots.findAll(); // Fetch all slots
      if (slots) {
        console.log('Fetched slots:', slots); // Debugging line
        commonController.successMessage(slots, "get all slot", res);
        io.emit('updateSlots', slots);
      }
    } catch (err) {
      console.error('Error fetching slot data:', err);
    }
  }
 


  async assss(payload: any, res: Response) {
    const { email, startTime } = payload; 
    console.log(payload, "pay.....");
    try {
      const user = await db.boughtnumbers.findOne({
        where: {
             email
             }
      });
      console.log(user, "user....");
      if (!user) {
        return commonController.errorMessage("User not found", res);
      }
  
      const adminSlot = await db.Slots.findOne({
        where: { 
            id: 1
         }
      });
      console.log(adminSlot, "sjhsjdhj");
  
      if (!adminSlot) {
        return commonController.errorMessage("Admin slot ID does not exist", res);
      }
    // Get the current time from the database
    const currentTime = await db.sequelize.query('SELECT NOW() AS currentTime', { type: QueryTypes.SELECT });
    const currentDateTime = currentTime[0].currentTime;


      const userSlotStartTime = user.slotStartingTime;
      const adminSlotStartTime = adminSlot.startTime;
  
      // Ensure both times are valid and compare them
      if (userSlotStartTime && adminSlotStartTime) {
        const userTime = moment(userSlotStartTime, "hh:mm A");
        const adminTime = moment(adminSlotStartTime, "hh:mm A");
  
        if (adminTime.isSameOrBefore(userTime)) {
          await user.update({
            userSlotStartTime:adminSlotStartTime// Update with admin's start time
          });
          console.log("Slot updated successfully.");
        } else {
          console.log("Admin slot start time is after user's slot start time.");
        }
      } else {
        console.log("One of the slot times is empty or invalid.");
      }
    } catch (err) {
      console.error(err);
      return commonController.errorMessage("An unexpected error occurred", res);
    }
  }


  async useradd(payload, res) {
    const { user_id, name } = payload;
    console.log(payload, "payload received in useradd function");
    try {
        // Check if user already exists
        const user = await db. newUsers.findOne({ where: { user_id } });
  
        if (user) {
            console.log('User already exists:', user);
            return commonController.errorMessage('User already exists', res);
        }
        // Create a new user if not exists
        const newUser = await db. newUsers.create({ user_id, name });
        console.log('New user created:', newUser);
  
        // Emit the new user event to all connected clients
        io.emit('userAdded', { user_id, name });
  
        // Send success response
        return commonController.successMessage(newUser, 'User added successfully', res);
    } catch (err) {
        console.error('An error occurred:', err);
        // Send error response
        return commonController.errorMessage('An error occurred while adding the user.', res);
    }
  }



async sendmessage(payload: any, res: Response) {
    const { user_id, sender_id, message, reciver_id } = payload;
    try {
        const sender = await db.newUsers.findOne({ 
            where: { 
                user_id 
            }
        });

        if (!sender) {
            return commonController.errorMessage("Sender not found", res);
        }

        // Save the message to the database
        const newMessage = await db.chatboxs.create({
           sender_id,message
        });
         io.emit('chatMessage', { sender_id, message });
        // Respond with success
        commonController.successMessage(newMessage, "Message sent successfully", res);
    } catch (error) {
        console.error('Error sending message:', error);
        commonController.errorMessage("An error occurred while sending the message", res);
    }
}


async addinusergroup(payload: any, res: Response) {
    const {sender_id, message,user_id } = payload;
    try {
        const user =await db.newUsers.findOne({
            where:{
                user_id
            }
        })
        if(!user){
        commonController.errorMessage("user not found",res)
        }
        // Add the user to the group
        const addingroup = await db.groupChats.create({
            sender_id,
            message
        });
        io.emit('userAddedToGroup', { sender_id, message });

        return commonController.successMessage(addingroup, "message send succesfuly", res);
    } catch (err) {
        console.error('Error adding user to group:', err);
        return commonController.errorMessage("An error occurred", res);
    }
}




}




export default new CodeController();
// export default new hello();
