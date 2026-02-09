const express = require("express")
const router = express.Router();

const {createcourse,getcoursedetails,getallcourses,getenrolledcourse,getallinstructorcourses,deletecourse,buycourse,courseprogress,publishcourse,updatecourse}=require("../controllers/coursecontroller.js");
const {createsection,deletesection,updatesection,getsectiondetails}=require("../controllers/sectioncontroller.js");
const {Auth,isStudent,isInstructor,isAdmin}=require("../middlewares/Auth.js");
const {createsubsection,updatesubsection,deletesubsection}=require("../controllers/subsectioncontroller.js");
const {createcategory,getallcategory,getcategory}=require("../controllers/categorycontroller.js");
const {givingrating,getaveragerating,getallrating}=require("../controllers/ratingcontroller.js");
const {getcourseIds}=require("../controllers/recommendercontroller.js");
// creating a course 

router.post("/createCourse",Auth,isInstructor,createcourse);


// update a course 

router.put("/updatecourse",Auth,isInstructor,updatecourse);
// get all courses 

router.get("/getAllCourses",getallcourses);

// marked progress 

router.post("/updateCourseProgress",Auth,courseprogress);

// get particular course 

router.post("/getCourseDetails",getcoursedetails);

// delete course 
router.delete("/deleteCourse",Auth,isInstructor,deletecourse)

// create section 


router.post("/addSection",Auth,isInstructor,createsection);

// getting  asection 

router.get("/getSection",Auth,isInstructor,getsectiondetails);
// updating a section 

router.put("/updateSection",Auth,isInstructor,updatesection);

// deleting a section 

router.delete("/deleteSection",Auth,isInstructor,deletesection);

// creating a subsection 

router.post("/addSubSection",Auth,isInstructor,createsubsection);


router.put("/updateSubSection",Auth,isInstructor,updatesubsection);


router.delete("/deleteSubSection",Auth,isInstructor,deletesubsection);


// create a category by admin 

router.post("/createCategory",Auth,isAdmin,createcategory);


router.get("/showAllCategories",getallcategory);


router.post("/categoryPageDetails",getcategory);



// rating and reviews 

router.post("/createRating",Auth,isStudent,givingrating);


router.get("/getAverageRating",getaveragerating);

router.get("/getReviews",getallrating);

// get enrolled course 
router.get("/getEnrolledCourses",Auth,isStudent,getenrolledcourse);
// router.get("/allinstructorcourse",Auth,allinstructorcourses)

router.get("/allinstructorcourse",Auth,getallinstructorcourses);

// buying a course 

router.post("/buycourse",Auth,isStudent,buycourse);

// publish course

router.post("/publishcourse",Auth,isInstructor,publishcourse)
router.get("/getcourseId",Auth,isStudent,getcourseIds);


module.exports=router;