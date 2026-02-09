const express = require("express");
const router = express.Router();

const {getallcoursesrecommender,getalluserrecommender,getrecommendedcourse,getcourseIds}=require("../controllers/recommendercontroller.js");

router.get("/getrecommendedcourses",getallcoursesrecommender);
router.get("/getrecommendedusers",getalluserrecommender);
router.put("/recommendation",getrecommendedcourse);
module.exports=router;