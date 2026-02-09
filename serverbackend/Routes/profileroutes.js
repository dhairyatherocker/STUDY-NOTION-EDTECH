const {Auth,isStudent,isInstructor,isAdmin}=require("../middlewares/Auth.js"); 
const {updateprofile,deleteprofile,getuserdetails,updateprofileimage}=require("../controllers/profilecontroller.js");
const express = require("express")
const router = express.Router(); 


// creating a profile  

router.delete("/deleteProfile",Auth,deleteprofile);

router.put("/updateProfile",Auth,updateprofile);
router.get("/getUserDetails",Auth,getuserdetails);
router.put("/updateDisplayPicture",Auth,updateprofileimage);

// router.get("/getEnrolledCourses",Auth,isStudent,)
// router.delete("/deleteProfile",Auth,deleteprofile);


module.exports=router;