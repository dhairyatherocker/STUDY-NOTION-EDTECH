const nodemailer=require("nodemailer");
require("dotenv").config();
// import {otpTemplate} from "../mail/templates/emailVerificationTemplate";


exports.otpmailer=async(email,title,body)=>{
    try{
             let transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            port: 587, // or 465 for secure
             secure: false, // true for port 465, false for 587
          auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }


        })
        let info=await transporter.sendMail({
            from:`"Studynotion" <${process.env.MAIL_USER}>`,
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
        })
        console.log("transporter of otp",info);
    }
    catch(error){
        console.log("error while sending an otp in utils \n",error);

    }
}