 const mongoose=require("mongoose");

const profileschema=new mongoose.Schema({
    displayname:{
        type:String,
    },
    gender:{
        type:String,
        enum:["Male","Female","Other"]
    },
    dob:{
        type:Date,
    },
  
  about:{
    type:String,
  },
 profession:{
  type:String
 },
  phonenumber:{
    type:String,
  }
});
module.exports=mongoose.model("profile",profileschema);
