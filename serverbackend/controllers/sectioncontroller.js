const category=require("../models/category.js");
const user=require("../models/User.js");
const section=require("../models/Section.js");
const course=require("../models/Course.js");
exports.createsection=async(req,res)=>{
    try{
const {title,courseId}=req.body;
const userId=req.user.id;
console.log("21");
if(!title||!courseId){
    return res.status(401).json({
        success:false,
        message:"please fill all the details"
    })
}
// const Id=new mongoose.Types.ObjectId(courseId)
console.log("22");
const newsection=await section.create({title});
console.log("23");
let sectionincourse=await course.findByIdAndUpdate(courseId,{$push:{section:newsection._id}},{new:true}).populate({
    path:"section",
    populate:{
        path:"subsections"
    }
}).exec();
// sectionincourse=await course
console.log("24");
return res.status(200).json({
    success:true,
    message:"section created successfully",
    sectionincourse
})
console.log("25");
    }
    catch(error){
console.log("error while creating an section",error);
return res.status(400).json({
    success:false,
    message:`problem in making section`
    
})

    }
}


exports.deletesection=async(req,res)=>{
    try{

const {sectionId,courseId}=req.body;
 if(!sectionId||!courseId){
    return res.status(400).json({
    success:false,
    message:"please fill all the fields"
})
 }
const deletedsection=await section.findByIdAndDelete(sectionId);
const newcourse=await course.findOne({_id:courseId}).populate({
    path:"section",
    populate:{
        path:"subsections"
    }
}).exec();
return res.status(200).json({
    success:true,
    message:"section deleted successfully",
    newcourse
})

    }
    catch(error){

return res.status(401).json({
    success:false,
    message:`error while deletng section ${error.message}`
})
    }
}


exports.updatesection=async(req,res)=>{
    try{

const {title,sectionId,courseId}=req.body;
 if(!sectionId||!title||!courseId){
    return res.status(400).json({
    success:false,
    message:"please fill all the fields"
})
 }
const updatedsection=await section.findByIdAndUpdate(sectionId,{title},{new:true});
const Course=await course.findOne({_id:courseId}).populate({
    path:"section",
    populate:{
        path:"subsections"
    }
}).exec();;
return res.status(200).json({
    success:true,
    message:"section updated successfully",
    Course
})

    }
    catch(error){

return res.status(401).json({
    success:false,
    message:`error while updating section ${error.message}`
})
    }
}
exports.getsectiondetails=async(req,res)=>{
    try{
        console.log("1se")
    let sectionId=req.params.sectionId || req.query.sectionId;
//    sectionId=JSON.stringify(sectionId);
console.log(typeof(sectionId));
  console.log("2se")
    const userId=req.user.id;
      console.log("3se")
    if(!userId||!sectionId){
        return res.status(404).json({
            success:false,
            message:"please fill all the fields"
        })
    }
      console.log("4se")

    const response=await section.findById(sectionId);
      console.log("5se")
    return res.status(200).json({
        success:true,
        message:"section details fetched",
        response

    })
      console.log("6se")
    }
    catch(error){
          console.log("7se")
        return res.status(400).json({
            success:false,
            message:"sorry but something wrong"
        })
        console.log("error in backend of getting section  ",error)
    }
}



