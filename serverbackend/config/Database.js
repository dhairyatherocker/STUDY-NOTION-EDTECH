const mongoose=require("mongoose");
require("dotenv").config();
const dbconnect=async(req,res)=>{
    try{
await mongoose.connect(process.env.DB_URL);
console.log("db connection successful");
    }
    catch(error){
console.log("error while db connection",error);
console.log("db connection not successful");

    }
}
module.exports=dbconnect;