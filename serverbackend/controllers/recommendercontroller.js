// const mongoose= require("mongoose");
const user=require("../models/User.js");
const category=require("../models/category.js");
// const user=require("../models/User.js");
const course=require("../models/Course.js");
const courseprogress=require("../models/Courseprogress.js");
const mongoose=require("mongoose");
const rating=require("../models/Rating.js");
const axios = require("axios");
require("dotenv").config();

exports.getallcoursesrecommender = async (req, res) => {
  try {
    const allcourses = await course
      .find({})
      .populate({
        path: "category",
        select: "name"
      })
      .populate({
        path: "teacher",
        select: "firstname lastname"
      })
      .populate({
        path: "rating",
        select: "rated"
      })
      .populate({
        path: "studentsenrolled",
        select: "_id"
      })
      .populate({
        path: "section",
        select: "_id"
      })
      .select("topic description tags language price _id"); 
    // Only fetch required fields from course schema

    if (!allcourses) {
      return res.status(404).json({
        success: false,
        message: "No courses found",
      });
    }

    // Format data for your ML or CSV
    const formattedCourses = allcourses.map((course) => {
      const avgRating =
        course.rating.length > 0
          ? (
              course.rating.reduce((sum, r) => sum + (r.rating || 0), 0) /
              course.rating.length
            ).toFixed(1)
          : 0;

      return {
        id:course._id,
        topic: course.topic,
        description: course.description,
        tags: course.tags.join(", "),
        language: course.language,
        category: course.category?.name || "",
        teacher: `${course.teacher?.firstname || ""} ${course.teacher?.lastname || ""}`,
        sectionsCount: course.section?.length || 0,
        price: course.price,
        studentsEnrolled: course.studentsenrolled?.length || 0,
        avgRating: avgRating,
      };
    });

    return res.status(200).json({
      success: true,
      data: formattedCourses,
    });
  } catch (error) {
    console.log("Error while getting all courses", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};



exports.getalluserrecommender = async (req, res) => {
  try {
    const users = await user
      .find({ accounttype: "student" })
      .select("firstname lastname email courses _id")
      .populate({
        path: "courses",
        select: "_id topic rating price", // course topic + ratings array
        populate: {
          path: "rating",          // populate rating objects
          select: "rated user"    // rating.user + rating.rating
        }
      });

    if (!users) {
      return res.status(404).json({
        success: false,
        message: "users not found",
      });
    }

    let finaldata = [];

    users.forEach((u) => {
      const { firstname, lastname, email } = u;

      u.courses.forEach((course) => {
        // find rating given by THIS user inside course.rating[]
        let userRating = null;
        // let price=null;
        if (course?.rating && course?.rating?.length > 0) {
          const match = course.rating.find(
            (r) => r.user.toString() === u._id.toString()
          );
          userRating = match ? match.rated : null;
        }

        finaldata.push({
          firstname,
          lastname,                                                       
          email,
          id:u._id,
          price:course.price,
          courseId: course._id,
          courseName: course.topic,
          rating: userRating,
        });
      });
    });

    return res.status(200).json({
      success: true,
      data: finaldata,
    });

  } catch (error) {
    console.log("error while getting all users details", error);
    return res.status(500).json({
      success: false,
      message: "not getting all users details",
    });
  }
};


exports.getrecommendedcourse=async(req,res)=>{
try{

const {courseId}=req.body;
console.log("recommend",courseId);
console.log("recommend1");

if(!courseId){
return res.json({
  success:false,
  message:"don't get courseId"
})}
console.log("recommend2");
const mlResponse = await axios.get(
  `${process.env.RECOMMENDLINK}/${String(courseId)}`
);

console.log("recommend3");

  // const recommendations = mlResponse.data;
  const recommendations = mlResponse.data;
  console.log("all recommendations in controllers",recommendations);
console.log("recommend4");

    return res.status(200).json({
      success: true,
      data: recommendations
    });
   
console.log("recommend5");


}  

catch(error){
  console.log("recommend6");

return res.status(500).json({
      success: false,
      message: "Failed to fetch recommendations"
})  
}

}


exports.getcourseIds=async(req,res)=>{
  try{
   const userId=req.user.id;
   if(!userId){
    return res.json({
      success:false,
      message:"userId not found or token is missing"
    })
   }
   const courseIds=await user.findById({_id:userId});
   return res.status(200).json({
    success:true,
    response:courseIds.courses,
    message:"courses Ids fetched successfully"
   })
  }
  catch(error){
  console.log(error);
  return res.status(500).json({
    success:false,
    message:"something is wrong"
  })
  }
}

