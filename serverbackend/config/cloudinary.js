const cloudinary = require('cloudinary').v2
require("dotenv").config();

const cloudconnect=()=>{
    try{
   cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
   })
   console.log("cloudinary connection successful")
    }
    catch(error){
      console.log("error while cloudinary connection",error);
  console.log("cloudinary connection not successful");
    }
}
module.exports=cloudconnect