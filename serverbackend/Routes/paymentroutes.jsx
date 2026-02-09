const express = require("express")
const router = express.Router();
const {capturepayment,verifypayment,enrollstudents,sendPaymentSuccessEmail}=require("../controllers/razorpaycontroller.js");
const {Auth,isStudent,isInstructor,isAdmin}=require("../middlewares/Auth.js");
router.post("/capturepayment",Auth,isStudent,capturepayment);
// router.post("/verifypayment",Auth,isStudent,verifypayment);
router.post("/verifypayment",Auth,isStudent,verifypayment);
router.post("/sendPaymentSuccessEmail",Auth,isStudent,sendPaymentSuccessEmail);
module.exports=router;