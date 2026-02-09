const profile=require("../models/Profile.js");
const category=require("../models/category.js");
const user=require("../models/User.js");
const section=require("../models/Section.js");
const subsection=require("../models/subsection.js");
const {imageupload}=require("../utils/imageuploader.js");
const course=require("../models/Course.js");
const mongoose=require("mongoose");
exports.updateprofile=async(req,res)=>{
    try{
        console.log("a");
  const {about=" ",displayname=" ",gender=" ",profession=" ",phonenumber=" ",dob=" "}=req.body;
    console.log("b");
  const userId=req.user.id;
    console.log("c");
//  const Id=new mongoose.Types.ObjectId(userId);
//   if(!displayname||!dob||!gender||!about){
//     return res.status(401).json({
//         success:flase,
//         message:"please fill all the fields"
//     })
    
//   }
 const existing=await user.findOne({_id:userId});
   console.log("d");
if(!existing){
    return res.status(404).json({
        success:false,
        message:"sorry but user not found"
    })
}
  console.log("e");
const Profile=await profile.findByIdAndUpdate({_id:existing.profiledetails},{displayname,gender,about,phonenumber,dob,profession});
// existinguser=await user.findByIdAndUpdate({userId},{$push:{profiledetails:profile._id}},{new:true});
  console.log("f");
return res.status(200).json({
    success:true,
    message:"profile updated successfully",

})
  console.log("g");
    }
    catch(error){
          console.log("h");
  console.log(error);
        return res.status(402).json({
        success:false,
        message:"profile cant be updated"
    }) 
    }
}


exports.deleteprofile=async(req,res)=>{
    try{
        const userId=req.user.id;
        const existinguser=await user.findOne({_id:userId});
if(!existinguser){
    return res.status(404).json({
        success:false,
        message:"sorry but user not found"
    })
}

await profile.findByIdAndDelete({_id:existinguser.profiledetails});

 await course.updateMany(
      {studentsenrolled : userId },
      { $pull: { studentsenrolled: userId } } // Removes userId from array
    );
 
 await user.findByIdAndDelete({_id:userId});
 return res.status(200).json({
    success:true,
    message:"deleted successfully"
 })

    }

    catch(error){
        console.log(error);
         return res.status(400).json({
        success:false,
        message:"sorry but user not deleted"
    })
    }
}

exports.getuserdetails=async(req,res)=>{
    try{
        console.log("1p");

  const userId=req.user.id;
console.log("2p");
   const existinguser=await user.findOne({_id:userId});
   console.log("3p");
if(!existinguser){
    return res.status(404).json({
        success:false,
        message:"sorry but user not found"
    })
}
console.log("4p");
 return res.status(200).json({
    success:true,
    message:"fetched successfully",
    existinguser
 });

console.log("5p");


    }
    catch(error){
        console.log("6p");
 return res.status(400).json({
        success:false,
        message:"sorry but user details not found"
    })
    }
}


exports.updateprofileimage=async(req,res)=>{
    try{
const image=req.files.displayPicture;
console.log("1");
const userId=req.user.id;
console.log("2");
if(!userId){
     return res.status(401).json({
        success:false,
        message:"user not registered"
    })
}
console.log("3");
if(!image){
    console.log(image)
    return res.status(404).json({
        success:false,
        message:"sorry but don't have image to upload"
    })
}
console.log("4");

const uploadedimage=await imageupload(image);
console.log("5");
console.log("url ",uploadedimage.secure_url);
console.log("6");
const existinguser=await user.findOneAndUpdate({_id:userId},{image:uploadedimage.secure_url},{new:true});
console.log("7");
console.log("existinguser",existinguser);
console.log("8");
 return res.status(200).json({
        success:true,
        message:"image updated successfully",
        existinguser:existinguser
    })
    }
    catch(error){
        console.log("errro image upload");
        console.log("error whuke updating an image  ",error);
 return res.status(400).json({
        success:false,
        message:"sorry image cant be updated"
    })

    }
}


