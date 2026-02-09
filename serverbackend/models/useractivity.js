const mongoose=require("mongoose");

const useractivityschema=new mongoose.Schema({
 userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  action: {
    type: String, 
    enum: ["view", "click", "watch", "purchase"],
  },
 
},{timestamps:true})

module.exports=mongoose.model("useractivity",useractivityschema);