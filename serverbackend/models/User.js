const mongoose=require("mongoose");

const userschema=new mongoose.Schema({
    firstname:{
    type:String,
    required:true
    },
    lastname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    accounttype:{
        type:String,
        enum:["student","instructor","admin"],
        required:true
    },
    token:{
        type:String,
    },
    resetpasswordtime:{
        type:Date,
    },
    profiledetails:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"profile"
        },
    courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"course"
        }
    ],
     coursesprogress:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"courseprogress"
        }
    ],
    image:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        
    },courseprogress:[{
         type:mongoose.Schema.Types.ObjectId,
            ref:"courseprogress"
         }]
   
    
},{timestamps:true});

module.exports= mongoose.model("user",userschema);