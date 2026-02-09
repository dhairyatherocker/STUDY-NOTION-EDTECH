const mongoose=require("mongoose");


const courseschema=new mongoose.Schema({
topic:{
    type:String,
    required:true
},
description:{
type:String,
required:true
},

language:{
type:String,
enum:["English","Hindi","Hinglish"],
required:true
},
category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"category",
    required:true
},

tags:[{
type:[String]
}
],
teacher:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
},
section:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"section"
    }
],
price:{
    type:String,
    required:true,
},
imageofcourse:{
    type:String,

},
studentsenrolled:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
],
rating:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"rating"
    }
],

duration:{
    type:String,
},

benefits:[
    {type:String}],
    startdate:{
        type:Date,
        
    },
    status:{
        type:String,
        enum:["Publish","Draft"],
        required:true
    }, 
    courseprogress:[{
     type:mongoose.Schema.Types.ObjectId,
        ref:"courseprogress"
     }]

},{timestamps:true})
module.exports=mongoose.model("course",courseschema);