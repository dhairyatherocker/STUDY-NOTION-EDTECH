const express = require("express")
const router = express.Router();
const {otpsender,signup,signin,changepassword}=require("../controllers/Authcontroller.js");
const {Auth,isStudent,isInstructor,isAdmin}=require("../middlewares/Auth.js");
const {resetpassword,resetpasswordinterface}=require("../controllers/resetpassword.js");
// create account
router.post("/signup",signup);

// login account 

router.post("/login",signin);

// change password 
 
router.put("/changepassword",Auth,changepassword);

// sending an otp 
router.post("/sendotp",otpsender);

//forgot password 

router.post("/resetpassword",resetpassword);


// interface for resest password token 
router.put("/reset-password-token",resetpasswordinterface);


module.exports=router;
