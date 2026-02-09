const mongoose= require("mongoose");
const user=require("../models/User.js");
const  otp=require("../models/otp.js");
const otpGenerator=require("otp-generator");
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken");
const {otpmailer}=require("../utils/otpmailer.js");
const crypto = require("crypto");
require("dotenv").config();


exports.resetpassword=async(req,res)=>{
    try{
const {email}=req.body;
const existinguser=await user.findOne({email:email});
 
if(!existinguser){
    return res.status(400).json({
        success:false,
        message:"sorry email id is wrong"
    })
}

// const token=crypto.randomUUID();
const token = crypto.randomBytes(20).toString("hex");

// console.log("token",token);
const updateddetails=await user.findOneAndUpdate({email:email},{token:token,resetpasswordtime:Date.now()+3600000},{new:true});


const url=`http://localhost:3000/reset-password-token/${token}`

await otpmailer(email,"password reset link",`password rest link ${url}`);

return res.status(200).json({
    success:true,
    message:"link sended successfully"
})

    }
    catch(error){
console.log("error while sending an link to rest password",error)
return res.status(400).json({
    success:false,
    message:"link not sended"
})

    }
}


exports.resetpasswordinterface=async(req,res)=>{
    try{
const {newpassword,confirmnewpassword,token}=req.body;
console.log("1");
if(!token){
    return res.status(401).json({
        success:false,
        message:"sorry but not getting a token"
    })
} 
console.log("2");
if(newpassword!==confirmnewpassword){
    return res.status(401).json({
        success:false,
        message:"newpassword confirmnewpassword must be same"
    })
}
console.log("3");
let existinguser=await user.findOne({token:token});
if(!existinguser){
    return res.status(400).json({
        success:false,
        message:"sorry but user not found"
    })
}
console.log("4");
if(existinguser.resetpasswordtime<Date.now()){
    let hashedpassword=await bcrypt.hash(newpassword,10);
const exist=await user.findOneAndUpdate({token:token},{password:hashedpassword,confirmpassword:hashedpassword},{new:true});
console.log("5");
 return res.status(200).json({
        success:true,
        message:"pasword reset successfully"
    })
    console.log("6");
}
else{
    console.log("7");
 return res.status(401).json({
        success:false,
        message:"sorry time limit exceeded"
    })
}

    }
    catch(error){
        console.log("8");
console.log("error while reset password in interface",error)
 return res.status(401).json({
        success:false,
        message:"error in sending interface to reset password"
    })
    }
}