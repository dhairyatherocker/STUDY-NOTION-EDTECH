const mongoose=require("mongoose");

const Sectionschema=new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  subsections:[
    {type:mongoose.Schema.Types.ObjectId,
        ref:"subsection",
        
    }
  ]

});
module.exports=mongoose.model("section",Sectionschema);