const mongoose=require("mongoose");

const categoryschema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  description:{
    type:String
  },
  course:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"course",
    required:true
  }]

});
module.exports=mongoose.model("category",categoryschema);