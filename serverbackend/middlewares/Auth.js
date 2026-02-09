const jwt=require("jsonwebtoken");
require("dotenv").config();
const user=require("../models/User.js");


exports.Auth=async(req,res,next)=>{
    try{
 
 const token=req?.body?.token || req.cookies?.token || req.header("Authorization")?.replace("Bearer ","");
 console.log("Token received:", token);
console.log("fetching done 21");
if(!token){
    return res.status(400).json({
        success:false,
        message:"token is missing"
    })
}
console.log("fetching done 22");
try{
    const decode= jwt.verify(token,process.env.JWT_SECRET);
    console.log("decode is",decode);
    req.user=decode;
   console.log("fetching done 23");
    // return res.status(200).json({
    //     success:true,
    //     message:"decode add successfully in user profile"

    // })
    // console.log("fetching done 24");
}

catch(error){
  console.log("decoded",error);
    return res.status(400).json({
        success:false,
        message:"token is invalid"
    })
}

 next();
    }
    catch(error){
console.log(error);
return res.status(400).json({
    success:false,
    message:"problem in auth "
})
    }
}




exports.isStudent=async(req,res,next)=>{
    try{

if(req.user.role!=="student"){

return res.status(401).json({
success:false,
    message:"this is protected route for students only"
})
}
next();
    }
    catch(error){


return res.status(401).json({
success:false,
    message:"user accountype cannot be verified"
})
    }
}




exports.isInstructor=async(req,res,next)=>{
    try{

if(req.user.role!=="instructor"){

return res.status(401).json({
success:false,
    message:"this is protected route for instructor only"
})
}
next();
    }
    catch(error){


return res.status(401).json({
success:false,
    message:"user accountype cannot be verified"
})
    }
}



exports.isAdmin=async(req,res,next)=>{
    try{

if(req.user.role!=="admin"){

return res.status(401).json({
success:false,
    message:"this is protected route for Admin only"
})
}
next();
    }
    catch(error){

 console.log(error);
return res.status(401).json({
success:false,
    message:"user accountype cannot be verified"
})
    }
}