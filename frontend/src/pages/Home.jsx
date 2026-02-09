import React, { useState } from 'react'
import { FaArrowRight } from "react-icons/fa";
import {Link} from "react-router-dom";
import Button from '../components/Home/Button';
import boxoffice from "../assets/Images/boxoffice.png"
// import { motion } from 'framer-motion';
import Allreviews from '../components/reviews.jsx/Allreviews.jsx';
import Blocks from '../components/Home/Blocks';
import Highlighttext from '../components/Home/Highlighttext';
import Pagings from '../components/Home/pagings.jsx';
import bghome from "../assets/Images/bghome.svg";
import frame from "../assets/Images/frame.png";
import Logo1 from "../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../assets/TimeLineLogo/Logo4.svg";
import TimeLineImage from "../assets/Images/TimeLineImage.png";
import Know_your_progress from "../assets/Images/Know_your_progress.png";
import Plan_your_lessons from "../assets/Images/Plan_your_lessons.svg";
import Compare_with_others from "../assets/Images/Compare_with_others.svg";
import Instructor from "../assets/Images/Instructor.png";
import Movercontent from '../components/Home/Movercontent.jsx';
// import { useState } from 'react';
import { HomePageExplore } from '../assets/data/homepage-explore.jsx';
import ErrorBoundary from './ErrorBoundary.jsx';




const Home = () => {
//  const [info,setinfo]=useState(HomePageExplore[0]);
  // const  [category,setcategory]=useState({
  // "Free"
  // });
  
  const [category,setcategory]=useState("Free");
  let filteritems=HomePageExplore.filter(prev=>prev.tag===category);
  let filtereditems=filteritems[0].courses;
  console.log("home",filteritems);
  return (
   <div className="w-screen h-screen bg-[#000814]">
   <section>
<div className="h-[276px] w-[913px] flex flex-col justify-between mx-auto">
<Link to="/signup" className=" no-underline ml-[330px] mt-[100px]">
  <div className="  rounded-full shadow-[inset_0px_-1px_0px_0px_#FFFFFF2E] flex items-center w-[227px] h-[36px] justify-center gap-[5px] text-[#999DAA] bg-[#3f4455] transition-all duration-200 hover:bg-[#161D29]">
  <p className="text-[16px] font-[500px] ">Become an Instructor</p><FaArrowRight ></FaArrowRight> </div>
 
</Link>

<div className="w-[913px] h-[108px] mx-auto">
  <div className="text-[36px] font-[1000px] text-[#F1F2FF] flex gap-[10px]  w-[913px] pl-[150px]"><p>Empower Your Future with</p> <Highlighttext text={"Coding skills"} gradient={"bg-[linear-gradient(118.19deg,#1FA2FF_-3.62%,#12D8FA_50.44%,#A6FFCB_104.51%)] bg-clip-text text-transparent"} size={"text-[36px]"} weight={"font-[1000px]"}></Highlighttext></div>
  <div className="text-[16px] font-[600px] text-[#838894] pt-[20px] pl-[20px] flex flex-col"><p className="pl-[40px]">with our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a </p><p className="pl-[80px]">wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.</p> </div>
</div>

</div>

<div className="flex w-[308px] h-[48px] ml-[600px] mt-[50px] gap-[24px]">
  <Button active={true} length={true} linkto={"/category"} text={true}>learn more</Button>
  <Button active={false} length={false} linkto={"/course"} text={false}> book a demo</Button>
</div>




<div className="mt-[50px] ml-[240px] w-[1035px] h-[515px] bg-[linear-gradient(123.77deg,#8A2BE2_-6.46%,#FFA500_59.04%,#F8F8FF_124.53%)] backdrop-blur-[68px] ">
<img src={boxoffice} className="w-[1035px] h-[515px]  top-[10px] relative z-10  " ></img>
 {/* <img src="/your-image.jpg" className="relative z-10 w-full" alt="Team Working" /> */}

  {/* Blue Blur Shadow Effect */}
  <div className="absolute inset-0 -z-10 w-[1005px] h-[415px] bg-blue-500 blur-3xl opacity-50 translate-x-2 translate-y-2"></div>
</div>


<div className="w-screen h-[522px] mt-[100px]">
<Blocks 
flexi={true} 
heading={<div className="text-[36px] font-[1000px] text-[#F1F2FF] flex flex-col"><div>Unlock your <Highlighttext text={"coding potential"} gradient={"bg-[linear-gradient(118.19deg,#1FA2FF_-3.62%,#12D8FA_50.44%,#A6FFCB_104.51%)] bg-clip-text text-transparent"} size={"text-[36px]"} weight={"font-[1000px]"}></Highlighttext></div><p>with our online courses.</p>
 </div>} 
subheading={<div className="font-[500px] text-[16px] text-[#838894]">Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.</div>} 
button1={
  {
    active:true,
    length:false,
    text:true,
    link:"/demo",
    content:`Try It Yourself` 
  }
}

button2={
  {
    active:false,
    length:true,
    text:false,
    link:"/category",
    content:"Learn More"
  }
}

codeblocks={`
<!DOCTYPE html>
<html>
head><>Example</
title><linkrel="stylesheet"href="styles.css">
/head>
body>
h1><ahref="/">Header</a>
/h1>
nav><ahref="one/">One</a><ahref="two/">Two</
a><ahref="three/">Three</a>
/nav>
`}

  ></Blocks>


</div>



<div className="w-screen h-[422px] mt-[100px]">
<Blocks 
flexi={false} 
heading={<div className="text-[36px] font-[1000px] text-[#F1F2FF] flex flex-col"><div>Start <Highlighttext text={"coding in seconds"} gradient={"bg-[linear-gradient(118.19deg,#1FA2FF_-3.62%,#12D8FA_50.44%,#A6FFCB_104.51%)] bg-clip-text text-transparent"} size={"text-[36px]"} weight={"font-[1000px]"}></Highlighttext></div>
 </div>} 
subheading={<div className="font-[500px] text-[16px] text-[#838894]">Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.</div>} 
button1={
  {
    active:true,
    length:false,
    text:true,
    link:"/demo",
    content:`Continue Lesson` 
  }
}

button2={
  {
    active:false,
    length:true,
    text:false,
    link:"/category",
    content:"Learn More"
  }
}

codeblocks={`
<!DOCTYPE html>
<html>
head><>Example</
title><linkrel="stylesheet"href="styles.css">
/head>
body>
h1><ahref="/">Header</a>
/h1>
nav><ahref="one/">One</a><ahref="two/">Two</
a><ahref="three/">Three</a>
/nav>
`}

  ></Blocks>


</div>

   </section>


   <section className="w-screen">

<div className="h-[820px] w-screen mt-[100px]">
<div>

<div className="text-[36px] font-[1000px] text-[#F1F2FF] flex gap-[10px] w-screen mx-auto justify-center">
 <p>Unlock the</p>  <Highlighttext text={"power of code"}  gradient={"bg-[linear-gradient(118.19deg,#1FA2FF_-3.62%,#12D8FA_50.44%,#A6FFCB_104.51%)] bg-clip-text text-transparent"} size={"text-[36px]"} weight={"font-[1000px]"}></Highlighttext>
</div>

<div className="h-[24px] font-[500px] text-[16px] text-[#838894] w-screen mx-auto flex justify-center mt-[10px]">
Learn to Build Anything You Can Imagine
</div>
</div>


{/* <Pagings active={"true"}></Pagings>
<Pagings active={"false"} className="ml-[100px]"></Pagings>
<Pagings active={"false"} className="ml-[100px]"></Pagings>
</div>
<div   style={{ backgroundImage: `url(${bghome})` }} className="w-screen  bg-cover bg-center h-[420px] relative bg-[#F9F9F9] z-0"> </div>
<div className="flex w-screen gap-[60px] relative bottom-[140px] mx auto justify-center">
<Button active={"true"}  linkto={"/catelog"} length={"false"} text={"true"} >Explore catelog</Button>
<Button>Learn more</Button> */}
<ErrorBoundary>
<Movercontent category={category} setcategory={setcategory} filtereditems={filtereditems} />

</ErrorBoundary>

{/* <div className="w-full h-[320px] bg-[url(${bghome})] "></div> */}


</div>


   </section>


   <section className="w-[screen] h-[1000px] bg-[#F9F9F9]">
    <div className="w-[1200px] h-[144px] mx-auto flex  pt-[150px]">
<div className="h-[88px] w-[594px] text-[#000814] text-[36px] font-semibold">

Get the skills you need for a <Highlighttext text={"job that is in demand"} gradient={"bg-[linear-gradient(117.52deg,_#5433FF_-4%,_#20BDFF_51.26%,_#A5FECB_106.52%)] bg-clip-text text-transparent text-3xl font-bold" } size={"text-[36px]"} weight={"font-[600px]"}></Highlighttext>

</div>

<div className="w-[594px] h-[144px] flex flex-col justify-between">
<div className="text-[#2C333F] text-[16px] font-semibold pt-[10px]">
  The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
</div>
<Button active={"true"}  linkto={"/catelog"} length={"false"} text={"true"} >Learn More</Button>
</div>

    </div>




<div className="w-[1200px] h-[545px] pt-[400px] flex mx-auto gap-[100px] items-center">
<div className="w-[410px] h-[432px] bg-[#F9F9F9] ">
  <div className="flex items-center gap-[24px]">
    <div><img src={Logo1}></img></div>
    <div>
      <p className="font-[600px] text-[18px] text-[#161D29]">Leadership</p>
      <p className="text-[16px] font-[400px]">Fully committed to the success company</p>
    </div>
  </div>
  <div className="h-[42px] border-l-2 border-dotted ml-[7px]"></div>

   <div className="flex items-center gap-[24px]">
    <div><img src={Logo2}></img></div>
    <div>
      <p className="font-[600px] text-[18px] text-[#161D29]">Responsibility</p>
      <p className="text-[16px] font-[400px]">Students will always be our top priority</p>
    </div>
  </div>
  <div className="h-[42px] border-l-2 border-dotted ml-[7px]"></div>



   <div className="flex items-center gap-[24px]">
    <div><img src={Logo3}></img></div>
    <div>
      <p className="font-[600px] text-[18px] text-[#161D29]">Flexibility</p>
      <p className="text-[16px] font-[400px]">The ability to switch is an important skills</p>
    </div>
  </div>
  <div className="h-[42px] border-l-2 border-dotted ml-[7px]"></div>





   <div className="flex items-center gap-[24px]">
    <div><img src={Logo4}></img></div>
    <div>
      <p className="font-[600px] text-[18px] text-[#161D29]">Solve the problem</p>
      <p className="text-[16px] font-[400px]">Code your way to a solution</p>
    </div>
  </div>
  
</div>



<div className=" w-[714px] h-[545px] relative">
<img src={TimeLineImage} className=" w-[714px] h-[545px]"></img>
<div className="w-[512px] h-[128px] bg-[#014A32] flex items-center gap-[80px] absolute top-[500px] right-[100px]">
<div className="flex w-[161px] h-[44px] gap-[10px] pl-[20px] ">
<div className="text-[#FFFFFF] text-[36px] font-bold">10</div>
<div className="w-[95px] h-[44px]">
  <p className="text-[24px] text-[#05A77B] font-semibold">Years</p>
  <p className="text-[24px] text-[#05A77B] font-semibold">Experiences</p>
</div>
</div>
<div className="border-r-2 w-[10px] h-[44px]"></div>
<div className="flex w-[161px] h-[44px] gap-[10px]">
<div className="text-[#FFFFFF] text-[36px] font-bold">250</div>
<div className="w-[95px] h-[44px]">
  <p className="text-[24px] text-[#05A77B] font-semibold">Types </p>
  <p className="text-[24px] text-[#05A77B] font-semibold">courses</p>
</div>
</div>
</div>
</div>





</div>




   </section>

   <section className="h-[800px] w-screen bg-[#F9F9F9]">

<div className="text-[36px]  text-[#000814] flex gap-[10px] w-screen mx-auto justify-center font-semibold items-center pt-[100px]">
 <p>Your swiss knife for </p>  <Highlighttext text={"learning any language"}  gradient={"bg-[linear-gradient(117.52deg,_#5433FF_-4%,_#20BDFF_51.26%,_#A5FECB_106.52%)] bg-clip-text text-transparent text-3xl font-bold"} size={"text-[36px]"} weight={"font-[1000px]"}></Highlighttext>
</div>
<div className="h-[24px] font-semibold text-[16px] text-[#2C333F] w-screen mx-auto flex justify-center mt-[10px]">
Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
</div>

<div className="w-[1103px] h-[450px] flex gap-[0] ">
<img src={Know_your_progress} className="relative left-[300px] pt-[100px] z-[0] "></img>
<img src={Compare_with_others} className="z-[1] relative left-[200px] pt-[100px] "></img>
<img src={Plan_your_lessons}></img>
</div>
   </section>


<section className="w-screen h-[625px] flex gap-[50px] justify-evenly mx-auto items-center">
<img src={Instructor} className="w-[616px] h-[545px]"></img>
<div className="w-[486px] h-[284px]  gap-[40px] flex flex-col">
<div className="text-[36px] font-semibold text-[#F1F2FF]">
  Become an <Highlighttext text={"Instructor"} gradient={"bg-[linear-gradient(118.19deg,#1FA2FF_-3.62%,#12D8FA_50.44%,#A6FFCB_104.51%)] bg-clip-text text-transparent font-semibold"} size={"text-[36px]"} weight={"font-[1000px]"}></Highlighttext>
</div>
<div className="text-[#838894] text-[16px] font-[600px]">
  Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
</div>

<Button active={"true"}  linkto={"/signup"} length={"false"} text={"true"} >start teaching</Button>

</div>
</section>

 
 <section className="mt-[100px]">
 <div className="w-full h-[100px] text-[#F2F2FF] font-[500] text-[28px] flex justify-center items-center">Reviews from other learners</div>
  <Allreviews/>
 </section>



   </div>
  )
}

export default Home;