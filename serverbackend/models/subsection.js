const mongoose=require("mongoose");

const subsectionschema=new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  timeduration:{
    type:String
  },
  description:{
    type:String
  },
  videourl:{
    type:String
  }

});
module.exports=mongoose.model("subsection",subsectionschema);