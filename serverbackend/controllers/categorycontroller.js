const category=require("../models/category.js");
const user=require("../models/User.js");
const mongoose=require("mongoose");
const course=require("../models/Course.js");
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

exports.createcategory=async(req,res)=>{
    try{

const {name,description}=req.body;
const createtag=await category.create({name:name,description:description});
return res.status(200).json({
    success:true,
    message:"category created successfully"
})
    }
    catch(error){
console.log("error while making an category",error);
return  res.status(400).json({
    success:false,
    message:"category not created"
})

    }
}

exports.getallcategory=async(req,res)=>{
    try{

const getallcategory=await category.find({},{name:true,description:true}).populate("course");
return res.status(200).json({
    success:true,
    message:"all tag fetched successfully",
    getallcategory
})
    }
    catch(error){
        console.log("error while fetching all category  ",error);
return  res.status(400).json({
    success:false,
    message:"not getting all category"
})

    }
}

exports.getcategory=async(req,res)=>{
     try {
      const { categoryId } = req.body
      console.log("PRINTING CATEGORY ID: ", categoryId);
      console.log(typeof(categoryId))
      // Get courses for the specified category
       const categoryObjectId = new mongoose.Types.ObjectId(categoryId);
           console.log("type of categroyobject id",typeof(categoryObjectId));

      const selectedCategory = await course.find({category:categoryObjectId}).populate("category").populate("rating")
 
  
      //console.log("SELECTED COURSE", selectedCategory)
      // Handle the case when the category is not found
      if (!selectedCategory) {
        console.log("Category not found.")
        return res
          .status(404)
          .json({ success: false, message: "Category not found" })
      }
      // Handle the case when there are no courses
      if (selectedCategory.length === 0) {
        console.log("No courses found for the selected category.")
        return res.status(404).json({
          success: false,
          message: "No courses found for the selected category.",
        })
      }
  
      // Get courses for other categories

      const categoriesExceptSelected = await course.find({
        category: { $ne:categoryObjectId },
      }).populate("rating")
      // let differentCategory = await course.findOne(
      //   categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)].categor
      //     ._id
      // )
      //  .populate("course")
      //   //console.log("Different COURSE", differentCategory)
      // // Get top-selling courses across all categories
      // const allCategories = await category.find()
      //   .populate("course")
      // const allCourses = allCategories.flatMap((category) => category.course)
      const mostSellingCourses = categoriesExceptSelected
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)
       // console.log("mostSellingCourses COURSE", mostSellingCourses)
      res.status(200).json({
        success: true,
        data: {
          selectedCategory,
          categoriesExceptSelected,
          mostSellingCourses,
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
}