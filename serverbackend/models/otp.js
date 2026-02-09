const mongoose=require("mongoose");
const {otpmailer}=require("../utils/otpmailer.js");
const otpTemplate=require("../mail/templates/emailVerificationTemplate.js")
const otpschema=new mongoose.Schema({
  email:{
    type:String,
    required:true
  },
  otp:{
    type:String,
    required:true
  },
  date:{
    type:Date,
    default:Date.now(),
    expires:5*60
  }

},{timestamps:true});

async function sendverificationemail(email,otp){
  try{
const mailresponse=await otpmailer(email,"verification email for otp",otpTemplate(otp));
console.log("response getting after sending an email of otp",mailresponse);


  }
  catch(error){

console.log("error occurred while sending mail",error);
// throw error;

  }

 
}

 otpschema.pre("save",async function(next){
    await sendverificationemail(this.
    email,this.otp);
  })
module.exports=mongoose.model("Otp",otpschema);