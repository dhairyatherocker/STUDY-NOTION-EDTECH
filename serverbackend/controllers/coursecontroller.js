const category=require("../models/category.js");
const user=require("../models/User.js");
const {imageupload}=require("../utils/imageuploader.js");
const course=require("../models/Course.js");
// const courseprogress=require("../models/Courseprogress.js");
const courseprogress=require("../models/Courseprogress.js");
const mongoose=require("mongoose");
exports.createcourse=async(req,res)=>{
try{
const {price,topic,description,language,categoryId,tags,benefits}=req.body;

const image=req.files.thumbnail;
console.log("tags in controller",tags);
console.log("benefits in controller",benefits);
console.log("image in controller",image)
console.log("topic in controller",topic)
console.log("desc in controller",description);
console.log("price in controller",price);
console.log("language in controller",language);
console.log("categoryId in controller",categoryId);

console.log("1");
if(!price||!topic||!description||!categoryId||!language||!benefits||!tags){
    return res.status(400).json({
    success:false,
    message:"please fill all the fields"
    })
}
console.log("2");
const userId=req.user.id;
let existinguser=await user.findById({_id:userId});
if(!existinguser){
    return res.status(404).json({
        success:false,
        message:"instructor details not found"
    })
}
console.log("3");
let existingcategory=await category.findOne({_id:categoryId});
if(!existingcategory){
     return res.status(404).json({
        success:false,
        message:"category  not found"
    })
}
console.log("4");
const uploadtocloudinary=await imageupload(image);
console.log("5");
const newcourse=await course.create({
    topic,description,price,language,category:categoryId,teacher:existinguser._id,tags,benefits,imageofcourse:uploadtocloudinary.secure_url,teacher:userId,status:"Draft"
})

console.log("6");
existinguser=await user.findByIdAndUpdate({_id:userId},{$push:{courses:newcourse._id}},{new:true});
existingcategory=await category.findOneAndUpdate({_id:categoryId},{$push:{course:categoryId}});
console.log("7");

 return res.status(200).json({
        success:true,
        message:"course created", 
        newcourse
    })

}
catch(error){
console.log("error while creating a course",error);
 return res.status(400).json({
        success:false,
        message:"problem in course creating"
    })
}

}


exports.getallcourses=async(req,res)=>{
    try{

const allcourses=await course.find({}).populate("rating");

if(!allcourses){
     return res.status(404).json({
        success:false,
        message:"courses not found"
    })
}
return res.status(200).json({
    success:true,
    message:"all courses fetched",
    allcourses
})
    }
    catch(error){
        console.log("error while getting all courses",error);
 return res.status(401).json({
        success:false,
        message:"not getting all courses"
    })


    }
}

exports.getcoursedetails=async(req,res)=>{
    try{
const {courseId}=req.body;

if(!courseId){
     return res.status(404).json({
        success:false,
        message:"course not found with these particular id"
    })
}
console.log("11");
const Course=await course.findOne({_id:courseId}).populate(
    {
        path:"teacher",
        populate: {
            path:"profiledetails"

            }
        
    }
)
.populate("category")
.populate("rating")
.populate("studentsenrolled")
.populate({
    path:"section",
    populate:{
        path:"subsections"
    }
}).populate({
    path:"courseprogress",
    populate:{
       path:"completedvideos" 
    }
})

.populate("teacher").exec();
console.log("12");

 


return res.status(200).json({
    success:true,
    message:"courses details fetched successfully",
    Course,

})

    }
    catch(error){
console.log("course fetching error",error);
return res.status(401).json({
    success:false,
    message:"course details can't be fetched"
})

    }
}

exports.getenrolledcourse=async(req,res)=>{

try{
console.log("1");
 const userId=req.user.id;
 console.log("2");
 if(!userId){
    return res.status(404).json({
        success:false,
        message:"sorry please logged in first",

    })
 }
 console.log("3");
const response=await user.findOne({_id:userId}).populate("profiledetails").populate({
    path:"courses",
    populate:{
        path:"section",
        populate:{
            path:"subsections"
        }
    }
    
}).populate("courseprogress");
console.log("4");
if(!response){
    return res.status(404).json({
        success:false,
        message:"user with this id not exist"
    })
}
console.log("5");

return res.status(200).json({
     success:true,
        message:"all courses found",
        response
})
console.log("6");

}
catch(error){
    console.log("7");
console.log(error);
}
}


exports.updatecourse=async(req,res)=>{
    try{
  const details=req.body;
  if(details.imageofcourse){
    const result=await imageupload(image);
  }
   const existingitem=await course.findOne({_id:details._id});
   
   const newcourse=await course.findByIdAndUpdate({_id:req._id},{topic:details.topic || existingitem.topic,description:details.description || existingitem.description ,price:details.price ||existingitem.price, imageofcourse:result.secure_url || existingitem.imageofcourse,category:details.category || existingitem.category , tags:details.tags || existingitem.tags ,status:details.status || existingitem.status,language:details.language || existingitem.language })

    return res.status(200).json({success:true,message:"course updated successfully",updatedcourse:newcourse});
    }
   
    catch(error){
     console.log(error);
     return res.status(509).json({success:false,meessage:error.message});
    }
}

exports.getallinstructorcourses=async(req,res)=>{
    try{
   const userId=req.user.id;
  
   const allcourse=await user.findOne({_id:userId}).populate("courses");
   return res.status(200).json({
    success:true,
    message:"all courses etched",
    allcourse
   })
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"not fetched",

        })
        console.log("error in controller to get courses ",error);
    }
}

exports.deletecourse=async(req,res)=>{
    try{
     const {courseId}=req.body;
     if(!courseId){
        return res.status(404).json({
            success:false,
            message:"sorry courseId not found"
        })
     }

     const response=await course.findByIdAndDelete({_id:courseId});
     return res.status(200).json({
        success:true,
        message:"course deleted successfully"
     })
    }
    catch(error){
          return res.status(401).json({
    success:false,
    message:"course can't be deleted"
})
    }
}
exports.buycourse=async(req,res)=>{
    try{
   const {courseId}=req.body;
  const userId=req.user.id
  if(!courseId){
    res.status(404).json({
        success:false,
        message:"courseId not found",

    })
  }
  const existinguser=await user.findOne({_id:userId});
  if(user._id===userId){
 return res.status(404).json({
        success:false,
        message:"sorry  user already have this course"
    })
  }
  const courseprog=await courseprogress.create({courseId:courseId,
                                               userId:userId})

  const verifycourse=await user.findByIdAndUpdate({_id:userId},{$push:{courses:courseId,courseprogress:courseprog._id}});
   let existingcourse=await course.findByIdAndUpdate({_id:courseId},{$push:{studentsenrolled:userId,courseprogress:courseprog._id}});
return res.status(200).json({
    success:true,
    message:"course added succesfully",
    verifycourse,

})

    }
    catch(error){
 console.log("error while adding a course",error);
 return res.status(201).json({
    success:false,
    message:"sorry but course cant be added"
 })
    }
}


exports.courseprogress = async (req, res) => {
  try {
    const { subsectionId, courseId } = req.body;
    
    // Correct way to get userId (assuming it's set by auth middleware)
    const userId = req.user._id; // NOT req.body.userId

    // Validate ObjectIds
    if (!mongoose.Types.ObjectId.isValid(userId) || 
        !mongoose.Types.ObjectId.isValid(courseId) || 
        !mongoose.Types.ObjectId.isValid(subsectionId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format"
      });
    }

    // Find or create progress record
    let courseprog = await courseprogress.findOneAndUpdate(
      { userId, courseId },
      { $setOnInsert: { completevides: [] } }, // Initialize if new
      { upsert: true, new: true }
    );

    // Check if subsection already completed
    if (courseprog.completedvideos.includes(subsectionId)) {
      return res.status(200).json({
        success: true,
        message: "Lecture already marked as completed",
        progress: courseprog
      });
    }

    // Update progress
    const progress = await courseprogress.findByIdAndUpdate(
      courseprog._id,
      { $push: { completedvideos: subsectionId } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Lecture marked as completed",
      progress
    });

  } catch (error) {
    console.error("Error in courseprogress:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to mark lecture as completed",
      error: error.message
    });
  }
};

exports.publishcourse=async(req,res)=>{
    try{
   const {courseId}=req.body;
  if(!courseId){
    return res.status(404).json({
        success:false,
        message:"course id not found"
    })
  }
   const updatecourse=await course.findByIdAndUpdate({_id:courseId},{status:"Publish"},{new:true});   

return res.status(200).json({
   success:true,
   message:"course published",
   updatecourse
})

    }
    catch(error){
  console.log(error);
   return res.status(404).json({
        success:false,
        message:"course can't be published"
    })
    }
}