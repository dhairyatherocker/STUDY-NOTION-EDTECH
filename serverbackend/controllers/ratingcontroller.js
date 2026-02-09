const profile=require("../models/Profile.js");
const category=require("../models/category.js");
const user=require("../models/User.js");
const section=require("../models/Section.js");
const subsection=require("../models/subsection.js");
const {imageupload}=require("../utils/imageuploader.js");
// const course=require("../models/Course.js");
const rating=require("../models/Rating.js");
const course=require("../models/Course.js")
const mongoose=require("mongoose");

// giving rating 

exports.givingrating=async(req,res)=>{
    try{

const {courseId,rated,comment}=req.body;
const userId=req.user.id;

if(!courseId||!userId){
    return res.status(400).json({
        success:false,
        message:"please give all the fields"})
}

const Course=await course.findOne({_id:courseId});
if(!await Course.studentsenrolled.includes(userId)){
    return res.status(400).json({
        success:false,
        message:"sorry but user not enrolled"
    })
}

if(await rating.findOne({course:courseId,user:userId}) ){
    
 return res.status(400).json({
        success:false,
        message:"student already rated"
    })

}

const userrating=await rating.create({rated,comment,user:userId,course:courseId});

await course.findOneAndUpdate({_id:courseId},{$push:{rating:userrating._id}});

return res.status(200).json({
    success:true,
    message:"giving rating successfully",
    userrating,
})

    }
    catch(error){
console.log("error while giving rating",error);
return res.status(400).json({
    success:false,
    message:"giving rating failed"
})

    }
}


// average rating 

exports.getaveragerating=async(req,res)=>{
try{
const {courseId}=req.body;

const result=await rating.aggregate([
{
    $match:{
      course:new mongoose.Types.ObjectId(courseId)

    }
},
{
    $group:{
        _id:null,
        averagerating:{$avg:"rated"}
    }
}

])

if(result.length>0){
    return res.status(200).json({
    success:true,
    message:"getting average rating successfully",
    averagerating:result[0].averagerating,
})
}
}

catch(error){
console.log("error while fetching an average rating",error);

return res.status(400).json({
    success:false,
    message:"giving average rating failed"
})

}

}

// get all rating 

exports.getallrating=async(req,res)=>{
    try{
const getrating=await rating.find({}).sort({rated:"desc"}).populate("user")
.populate("course").exec();
return res.status(200).json({
    success:true,
    message:"fetched succesfully all reviews and rating",
    getrating
})

    }

    catch(error){
console.log("error while fetching an all rating",error);

return res.status(400).json({
    success:false,
    message:"giving all rating failed"
})

    }
}


