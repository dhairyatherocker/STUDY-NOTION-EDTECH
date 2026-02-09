const mongoose=require("mongoose");

const Ratingschema=new mongoose.Schema({
rated:{
    type:String,
    required:true
} ,
comment:{
    type:String,
    required:true
},
course:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"course"
},
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user" 
}
});
module.exports=mongoose.model("rating",Ratingschema);