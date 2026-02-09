const mongoose= require("mongoose");
const user=require("../models/User.js");
const  Otp=require("../models/otp.js");
const otpGenerator=require("otp-generator");
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken");
const {passwordUpdated}=require("../mail/templates/passwordUpdate.js")
const {otpmailer}=require("../utils/otpmailer.js");
const profile=require("../models/Profile.js")
require("dotenv").config();
// otp sender 

exports.otpsender=async(req,res)=>{
    try{
const {email}=req.body;


// checking email enterd or not


if(!email){
    return res.json({
        success:false,
        message:"please enter your email"
    })
}
 
 if(await user.findOne({email})){
     res.json({
        success:false,
        message:"you are already registered"
     })

 }

 else{
// const randomNumber = Math.floor(100000 + Math.random() * 900000);
// const result=await otp.create({email,otp:randomNumber});


var otp=otpGenerator.generate(6,
    {
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false,
         digits: true,
    }
)
// console.log("otp generated",otp);

var result =await Otp.findOne({otp});
while(result){
     otp=otpGenerator.generate(6,
    {
        uppercaseAlphabets:false,
        lowercaseAlphabets:false,
        specialchars:false,
         digits: true,
    }
)

 result =await Otp.findOne({otp});}
const otpentry=await Otp.create({email,otp});
console.log("otp entry",otpentry);


res.status(200).json({
    success:true,
    message:"succesfully otp entry created"
})
 }


    }
    catch(error){

console.log("error while creatig an otp",error);
res.status(500).json({
    success:false,
    message:"sorry error in sending otp"
})

    }
}


// signup 

 exports.signup=async(req,res)=>{
    try{
   const {email,password,confirmpassword,otp,accounttype,firstname,lastname}=req.body;


   if(!email||!password||!otp||!lastname||!firstname||!confirmpassword||!accounttype){
    // console.log(error);
   return res.status(400).json({
success:false,
message:"enter your all details  "
    })
   }
if(password!==confirmpassword){
    return res.json({
   success:false,
   message:"password and confirm password must be same "
    })
}

if(await user.findOne({email:email})){
return res.json({
    success:false,
    message:"user already exists"
})

}

const recentotp=await Otp.findOne({email:email}).sort({createdAt:-1}).limit(1);

if(recentotp.otp!==otp){
    return res.status(404).json({
        success:false,
        message:"otp not matches"
    })

    }


 let hashedpassword=await bcrypt.hash(password,10);
console.log("password hashed successully");




const Profile=await profile.create({
    displayname: null,
    gender : null,
    dob : null,
    about : null
    })

const userentry=await user.create({lastname,firstname,password:hashedpassword,email,confirmpassword:hashedpassword,accounttype,image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastname}`
,profiledetails:Profile._id})
return res.status(201).json({
    success:true,
    message:"entry created successfully",
    userdata:userentry
})

    }



    catch(error){
console.log("error while signing up",error);
return res.status(406).json({
    success:false,
    message:"entry not created try again"
})

    }
}




// login code 


exports.signin=async(req,res)=>{
    try{

const {email,password}=req.body;

if(!email||!password){
    return res.status(204).json({
        success:false,
        message:"please fill all, the fields"
    })
}


const existinguser=await user.findOne({email:email});
if(!existinguser){
    return res.status(404).json({
        success:false,
        message:"user with this email not found"
    })
}



if(await bcrypt.compare(password,existinguser.password)){

    const payload={
        email:existinguser.email,
        id:existinguser._id,
        role:existinguser.accounttype
    }

    let token=jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:"2h"
    })

    existinguser.token=token;
    existinguser.password=undefined;
    //  await existinguser.save();

     const options={
            expires:new Date(Date.now()+2*60*60*1000),
            httpOnly:true,
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                existinguser,
                message:"token created successfully"
            })

}

else{
    console.log("password not matched");
    res.status(401).json({
        success:false,
        message:"password not matched"
    })
}

    }

    catch(error){
   console.log("sorry sign in process not done",error);
   return res.status(401).json({
    success:false,
    message:"sorry try again"
   })
 
    }
}



// change password 


exports.changepassword=async(req,res)=>{
    try{
const {newpassword,oldpassword}=req.body;

if(!newpassword||!oldpassword){
return res.status(204).json({
    success:false,
    message:"please fill all the fields"
})
}
console.log("fetching done 1");

// if(newpassword!==confirmnewpassword){
//     return res.status(201).json({
//         success:false,
//         message:"newpassword and confirmnewpassword must be same"
//     })}

console.log("fetching done 2");
const userId=req.user.id;
const existinguser=await user.findOne({_id:userId});
console.log("fetching done 3");h
if(!existinguser){
    return res.status(404).json({
        success:false,
        message:"user not found in db"
    })
}
console.log("fetching done 4");
if( bcrypt.compare(existinguser.password,oldpassword)){
let hashedpassword=await bcrypt.hash(newpassword,10);
const updateduser=await user.findOneAndUpdate({_id:userId},{password:hashedpassword,confirmpassword:hashedpassword},{new:true});
console.log("fetching done 5");
 await otpmailer(updateduser.email,"your pasword has been updated",passwordUpdated(updateduser.email,`${updateduser.firstname} ${updateduser.lastname}`));
return res.status(200).json({
    success:true,
    updateduser:updateduser,
    message:"old password replaced by new password"
})
}
console.log("fetching done 6");
 return res.status(400).json({
    success:false,
    message:"sorry oldpassword is wrong"
 })

    }
    catch(error){
console.log("error while changing an password",error);
return res.status(400).json({
    success:false,
    message:"sorry no change in paswword please check code"
})

    }
}



