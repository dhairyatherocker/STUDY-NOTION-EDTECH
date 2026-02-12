const user=require("../models/User.js");
const course=require("../models/Course.js");
const mongoose=require("mongoose");
const Razorpay=require("razorpay");
const {otpmailer}=require("../utils/otpmailer.js");
const  courseEnrollmentEmail=require("../mail/templates/courseEnrollmentEmail.js");
const  paymentSuccessEmail=require("../mail/templates/paymentSuccessEmail.js")
const {instance}=require("./config/razorpay.js");
const crypto = require("crypto");
require("dotenv").config();
exports.capturepayment=async(req,res)=>{
  
  const {courses}=req.body;
  const userId=req.user.id;
console.log("course in capture payment",courses);
  if(courses.length==0) return res.json({success:false,message:"please provide courseId at capture payment section"});
 console.log("courses in  cap",courses);
  let totalamount=0;

  for(const courseId of courses){
    let Course;
   
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    return res.status(400).json({
      success: false,
      message: `Invalid courseId: ${courseId}`,
    });
  }
    try{
      Course=await course.findById(courseId);

      if(!course) return res.status(404).json({success:false,message:"course not found in capture payment process"});
      
      const uid=new mongoose.Types.ObjectId(userId);

      if(Course.studentsenrolled.includes(uid)) return res.status(409).json({success:false,message:"you are already enrolled in this course"});

      totalamount+=Course.price;
    }
    catch(error){
      console.log(error);
      return res.status(404).json({success:false,message:error.message});
    }
  }

  const options={
    amount:totalamount*100,
    currency:"INR",
    receipt:Math.random(Date.now()).toString(),
  }
 
 try{
  const paymentResponse=await instance.orders.create(options);
  return res.json({success:true,message:paymentResponse});
 }

 catch(error){
 console.log(error);
 return res.status(500).json({
  success:false,
  message:"capture payment failed"
 })
 }

}


exports.verifypayment=async(req,res)=>{
  const razorpay_order_id=req.body?.razorpay_order_id;
  const razorpay_payment_id=req.body?.razorpay_payment_id;
  const razorpay_signature=req.body?.razorpay_signature;
  const courses=req.body?.courses;
  const userId=req.user?.id;

  if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !course || !userId){ return res.status(200).json({success:false,
    message:"payment failed"
  })
  }

  let body=razorpay_order_id+"|"+razorpay_payment_id;

  const expectedsignature=crypto.createHmac("sha256",process.env.RAZORPAY_SECRET).update(body.toString()).digest("hex");
  if(expectedsignature==razorpay_signature){
    await enrollstudents(courses,userId);
    return res.status(200).json({success:true,message:"payment verified"});
  } 
     return res.status(200).json({success:"false", message:"Payment Failed"});                       
  
}

const enrollstudents=async(courses,userId)=>{

if(!courses || !userId)  throw new Error("Courses or UserId missing");

for(const course_id of courses){

try{
const enrolledcourse=await course.findOneAndUpdate({_id:course_id},{$push:{studentsenrolled:userId}},{new:true});

if(!enrolledcourse) return res.json({success:false,message:"course_id not found"});

const enrolleduser=await user.findOneAndUpdate({_id:userId},{$push:{courses:course_id}},{new:true});

 const emailResponse = await otpmailer(
            enrolleduser.email,
            `Successfully Enrolled into ${enrolledcourse.topic}`,
            courseEnrollmentEmail(enrolledcourse.topic, `${enrolleduser.firstname}`)
        ) 


}

 catch(error) {
            console.log(error);
            return res.status(500).json({success:false, message:error.message});
        }

}

}

exports.sendPaymentSuccessEmail = async(req, res) => {
    const {orderId, paymentId, amount} = req.body;

    const userId = req.user.id;

    if(!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({success:false, message:"Please provide all the fields"});
    }

    try{
        //student ko dhundo
        const enrolledStudent = await user.findById(userId);
        await otpmailer(
            enrolledStudent.email,
            `Payment Recieved`,
             paymentSuccessEmail(`${enrolledStudent.firstname}`,
             amount/100,orderId, paymentId)
        )
    }
    catch(error) {
        console.log("error in sending mail", error)
        return res.status(500).json({success:false, message:"Could not send email"})
    }
}


// const Course = require("../models/Course");
// const User = require("../models/User");
// const mongoose = require("mongoose");
// const crypto = require("crypto");
// const mailSender = require("../utils/mailSender");
// const { instance } = require("../config/razorpay");
// const courseEnrollmentEmail = require("../mail/templates/courseEnrollmentEmail");
// const paymentSuccessEmail = require("../mail/templates/paymentSuccessEmail");


// // ==========================
// // 1️⃣ CAPTURE PAYMENT
// // ==========================
// exports.capturePayment = async (req, res) => {
//   try {
//     const { courses } = req.body;
//     const userId = req.user.id;

//     if (!courses || courses.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Please provide course IDs",
//       });
//     }

//     let totalAmount = 0;

//     for (const courseId of courses) {
//       if (!mongoose.Types.ObjectId.isValid(courseId)) {
//         return res.status(400).json({
//           success: false,
//           message: "Invalid course id",
//         });
//       }

//       const course = await Course.findById(courseId);
//       if (!course) {
//         return res.status(404).json({
//           success: false,
//           message: "Course not found",
//         });
//       }

//       if (course.studentsEnrolled.includes(userId)) {
//         return res.status(409).json({
//           success: false,
//           message: "Already enrolled",
//         });
//       }

//       totalAmount += course.price;
//     }

//     const order = await instance.orders.create({
//       amount: totalAmount * 100,
//       currency: "INR",
//       receipt: Date.now().toString(),
//     });

//     return res.status(200).json({
//       success: true,
//       message: order,
//     });

//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Payment capture failed",
//     });
//   }
// };



// // ==========================
// // 2️⃣ VERIFY PAYMENT
// // ==========================
// exports.verifyPayment = async (req, res) => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       courses,
//     } = req.body;

//     const userId = req.user.id;

//     if (
//       !razorpay_order_id ||
//       !razorpay_payment_id ||
//       !razorpay_signature ||
//       !courses ||
//       courses.length === 0
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "Payment failed",
//       });
//     }

//     const body = razorpay_order_id + "|" + razorpay_payment_id;

//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_SECRET)
//       .update(body)
//       .digest("hex");

//     if (expectedSignature !== razorpay_signature) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid signature",
//       });
//     }

//     // enroll students
//     await enrollStudents(courses, userId);

//     return res.status(200).json({
//       success: true,
//       message: "Payment verified & enrolled",
//     });

//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };



// // ==========================
// // 3️⃣ ENROLL STUDENTS (NO res HERE)
// // ==========================
// const enrollStudents = async (courses, userId) => {
//   for (const courseId of courses) {

//     const course = await Course.findByIdAndUpdate(
//       courseId,
//       { $push: { studentsEnrolled: userId } },
//       { new: true }
//     );

//     if (!course) throw new Error("Course not found");

//     const student = await User.findByIdAndUpdate(
//       userId,
//       { $push: { courses: courseId } },
//       { new: true }
//     );

//     if (!student) throw new Error("User not found");

//     await mailSender(
//       student.email,
//       `Successfully Enrolled`,
//       courseEnrollmentEmail(course.courseName, student.firstName)
//     );
//   }
// };



// // ==========================
// // 4️⃣ PAYMENT SUCCESS EMAIL
// // ==========================
// exports.sendPaymentSuccessEmail = async (req, res) => {
//   try {
//     const { orderId, paymentId, amount } = req.body;
//     const userId = req.user.id;

//     const user = await User.findById(userId);

//     await mailSender(
//       user.email,
//       "Payment Successful",
//       paymentSuccessEmail(user.firstName, amount / 100, orderId, paymentId)
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Email sent",
//     });

//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Email failed",
//     });
//   }
// };




















// exports.createpayment=async(req,res)=>{
//     try{

// const {courseId}=req.body;
//     const userId=req.user.id;
   
//     if(!courseId){
//         return res.status(404).json({
//         success:false,
//         message:"course id not provided"
//         })
//     }
    
//     if(!await course.findById({courseId})){
//        return res.status(404).json({
//         success:false,
//         message:"course not available"
//         })
//     }

// const uid=new mongoose.Types.ObjectId(userId);

// course=await course.findById({courseId})
    
    
//     if(await wishcourse.studentsenrolled.includes(uid)){
//         return res.status(400).json({
//             success:false,
//             message:"user already enrolled in course"
//         })
//     }

//     const amount =wishcourse.price;
//     const currency="INR";
//     const options={
//         amount:amount*100,
//         currency,
//         receipt:Math.random(Date.now()).toString(),
//         notes:{
//             courseId:courseId,
//             userId:userId
//         }
//     }


// const paymentresponse=await instance.orders.create(options);
// console.log(paymentresponse);
// return res.status(200).json({
//     success:true,
//     paymentresponse,
//     message:"entry created in payment"
// })
//     }
    

//     catch(error){
// console.log("error while making an payment",error);
// return res.status(400).json({
//     success:false,
//     message:"sorry problem in making an payment"
// })

//     }

// }


// exports.verifysignature=async(req,res)=>{
//     try{
// const webhooksecret="123456789";

// const signature=req.haeders("x-razorpay-signature");

// const shashum=crypto.createHmac("sha256",webhooksecret);l
// shashum.update(JSON.stringify(req.body));
 

// const digest=shashum.digest("hex");

// if(signature===digest){
//     console.log("payment is authorised");


//     const {courseId,userId}=req.body.payload.payment.entity.notes;


// const enrolledcourse=await course.findOneAndUpdate({_id:courseId},{$push:{studentsenrolled:userId}},{new:true});

// const studentenrolled=await user.findOneAndUpadate({_id:userId},{$push:{courses:courseId}},{new:true});
// }
// const emailresponse=await otpmailer(studentenrolled.email,"course logged in",`you succesfully buy a course ${enrolledcourse.name}`)

// return res.status(200).json({
//     success:true,
    
//     message:"email send successfully user enrolled successfully"
// })
//     }

//     catch(error){

// return res.status(400).json({
//     success:false,
    
//     message:"students not enrolled"
// })
//     }
// }


