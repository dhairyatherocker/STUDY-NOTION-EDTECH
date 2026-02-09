const express=require("express");
const app=express();

// express -->express ek framework hai Node.js ka, jisse hum easily backend APIs bana sakte hain.
// app ek express application banata hai jisse hum routes aur middleware define karte hain.


require("dotenv").config();

// to upload env file

const mongoose=require("mongoose");
// to make connection between mongodb and express


const dbconnect=require("./config/Database.js");
const cloudconnect=require("./config/cloudinary.js");
const cookieParser = require('cookie-parser');
const cors=require("cors");
const fileUpload=require("express-fileupload");
const authroutes=require("./Routes/authroutes");
const profileroutes=require("./Routes/profileroutes");
const courseroutes=require("./Routes/courseroutes");
const recommenderroutes=require("./Routes/recommenderroutes");
const paymentroutes=require("./Routes/paymentroutes.jsx");
app.use(cookieParser());

// Cookies ko parse (read/write) karne ke liye use hota hai.
// Example: login hone ke baad JWT token ko cookie me store karna.

app.use(
    cors({
        origin:"http://localhost:3000",
        credentials:true,
    })
)

// Yeh allow karta hai ke frontend (jo localhost:3000 pe chal raha hai) backend se request kar sake.
// credentials:true ka matlab hai — cookies aur auth headers ko bhi bhejna allow hai.


app.use(express.json());
app.use(express.urlencoded({
    extended:true,
}))


// express.json() → JSON body ko parse kare.
// express.urlencoded() → HTML form se aaye data ko parse kare (for POST requests).

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)

// Yeh enable karta hai temporary file upload system.
// Jab koi user file upload karta hai (profile pic/course image), wo pehle /tmp folder me temporarily save hoti hai, fir Cloudinary pe upload hoti hai.


//port 

const port=process.env.PORT||4000;

app.listen(port,()=>{
    console.log(`app is running at ${port}`);
})


dbconnect();

cloudconnect();


app.use("/api/v1/auth",authroutes);
app.use("/api/v1/profile",profileroutes);
app.use("/api/v1/course",courseroutes);
app.use("/api/v1/recommender",recommenderroutes);
app.use("/api/v1/payment",paymentroutes);


