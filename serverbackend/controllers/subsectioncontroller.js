const category=require("../models/category.js");
const user=require("../models/User.js");
const section=require("../models/Section.js");
const course=require("../models/Course.js");
const subsection=require("../models/subsection.js");
const mongoose = require('mongoose');
const {imageupload}=require("../utils/imageuploader.js");
const { ObjectId } = mongoose.Types;
exports.createsubsection=async(req,res)=>{
    try{
console.log("1ss");
const {title,description,sectionId,courseId}=req.body;
// const objectId = new ObjectId(courseId)
  console.log(typeof(courseId));
      console.log("courseId fetchcc",courseId)
console.log("2ss");
const video=req.files.video;
console.log("3ss");
if(!title||!description||!video||!sectionId||!courseId){
    return res.status(400).json({
        success:false,
        message:"please give all the fields"})
}
console.log("4ss");
const result=await imageupload(video);
console.log("video result",result)
console.log("5ss");
const newsubsection=await subsection.create({title,description,videourl:result.url});
console.log("6ss");
const updatedsection=await section.findByIdAndUpdate(sectionId,{$push:{subsections:newsubsection._id}},{new:true});
console.log("7ss");
const newcourse=await course.findOne({_id:courseId}).populate({
    path:"section",
    populate:{
        path:"subsections"
    }
}).exec();
console.log("8ss");
 return res.status(200).json({
        success:true,
        message:"section updated successfully",
        newcourse
        })
        console.log("9ss");
    }
    catch(error){
        console.log("10ss");
 return res.status(400).json({
        success:false,
        message:`${error.message}`})

    }
}


exports.updatesubsection=async(req,res)=>{
    try{
const {subsectionId,title,description,courseId}=req.body;
const Video=req.files.video;
console.log("subsectionId",subsectionId);
console.log("courseId",subsectionId);
console.log("title",title);
console.log("description",description);
console.log("Video",Video);
if(!title||!description||!Video||!subsectionId||!courseId){
    return res.status(400).json({
        success:false,
        message:"please give all the fields"})
}
const result=await imageupload(Video);
const updatedsubsection=await subsection.findByIdAndUpdate(subsectionId,{title,description,videourl:result.url});
const newcousre=await course.findOne({_id:courseId}).populate({
    path:"section",
    populate:{
        path:"subsections"
    }
}).exec();
return res.status(200).json({
        success:true,
        message:"subsection updated successfully",
        newcourse
        })
       
    

    }
    catch(error){
console.log(error);
return res.status(400).json({
        success:false,
        message:`${error.message}`})

    }
}


exports.deletesubsection=async(req,res)=>{
    try{
 const {subsectionId,courseId}=req.body;

 if(!subsectionId){
 return res.status(400).json({
        success:false,
        message:"please give all the fields"})

 }

 const deletedsubsection=await subsection.findByIdAndDelete({_id:subsectionId});
const newcourse=await course.findOne({_id:courseId}).populate({
    path:"section",
    populate:{
        path:"subsections"
    }
}).exec();;
 return res.status(200).json({
        success:true,
        message:"subsection deleted successfully",
        newcourse
        })

    }

    catch(error){

return res.status(400).json({
        success:false,
        message:`${error.message}`})

    }
}