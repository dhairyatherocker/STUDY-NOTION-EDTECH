const mongoose=require("mongoose");

const progressschema=new mongoose.Schema({
  courseId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"course"
  },
  completedvideos:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"subsection"
    }
  ],
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  }
 

});
module.exports=mongoose.model("courseprogress",progressschema);