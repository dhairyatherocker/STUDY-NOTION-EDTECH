import React from 'react'
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { FaEarthAmericas } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import Footer from './common/footer';
import { country } from '../assets/data/countrycode';
import Allreviews from './reviews.jsx/Allreviews';
const contactus = () => {
  return (
    <div className="w-full h-full bg-[#000814]">
    
    <div className="w-[1150px] h-[979px] flex  gap-[100px] mx-auto pt-[70px]">
<div className="w-[450px] h-[390px] bg-[#424854] rounded">

<div className="flex-col">
<div className="flex w-[402px] h-[98px] pl-[20px] pt-[40px] gap-[10px]">
      <HiOutlineChatAlt2/>
    <div className="flex flex-col text-[14px] text-[]"><p className="text-[18px] font-bold text-[#DBDDEA]">Chat on us</p>
    <p className="font-semibold text-[#999DAA]">Our friendly team is here to help. @mail address </p>
    </div>
</div>

<div className="flex w-[402px] h-[98px] pl-[20px] pt-[40px] gap-[10px]">
      <FaEarthAmericas/>
    <div className="flex flex-col text-[14px] text-[]"><p className="text-[18px] font-bold text-[#DBDDEA]">Visit us</p>
    <p className="font-semibold text-[#999DAA]">Come and say hello at our office HQ. Here is the location/ address </p>
    </div>
</div>

<div className="flex w-[402px] h-[98px] pl-[20px] pt-[40px] gap-[10px]">
      <IoCall/>
    <div className="flex flex-col text-[14px] text-[]"><p className="text-[18px] font-bold text-[#DBDDEA]">Call us</p>
    <p className="font-semibold text-[#999DAA]">Mon - Fri From 8am to 5pm +123 456 7890 </p>
    </div>
</div>

</div>


</div>


<div className="w-[698px] h-[799px] bg-[#000814] border border-[#424854] rounded-lg">
<div className="w-[594px] h-[124px] mx-auto pt-[30px] gap-[10px] ">
  <div className="font-bold text-[36px] text-[#DBDDEA]">Got a Idea? We’ve got the skills. Let’s team up</div>
  <div className="font-semibold text-[#999DAA]" >Tall us more about yourself and what you’re got in mind.</div>
</div>
<div className="flex-col gap-[10px]">
  <form>

<div className="w-[594px] h-[76px] pt-[60px] mx-auto flex gap-[20px]">
  <div className="flex-col gap-[5px]">
    <p className="h-[22px] w-[287px] text-[#DBDDEA] text-[14px] font-[400px]">First Name</p>
    <input type="text" placeholder="Enter first name" className=" pl-[5px] rounded shadow-[inset_0px_-1px_0px_0px_#FFFFFF2E] flex items-center w-[287px] h-[48px] justify-center gap-[5px] text-[#999DAA] bg-[#3f4455] transition-all duration-200 hover:bg-[#161D29]"></input>
  </div>
  
<div className="flex-col gap-[5px]">
    <p className="h-[22px] w-[287px] text-[#DBDDEA] text-[14px] font-[400px]">Last Name</p>
    <input type="text" placeholder="Enter last name" className=" pl-[5px] rounded shadow-[inset_0px_-1px_0px_0px_#FFFFFF2E] flex items-center w-[287px] h-[48px] justify-center gap-[5px] text-[#999DAA] bg-[#3f4455] transition-all duration-200 hover:bg-[#161D29]"></input>
  </div>


</div>

<div className="flex-col gap-[5px] pt-[80px] mx-auto w-[594px] h-[76px] ">
    <p className="h-[22px] w-[287px] text-[#DBDDEA] text-[14px] font-[400px]">Email</p>
    <input type="text" placeholder="Enter your email" className=" pl-[5px] rounded shadow-[inset_0px_-1px_0px_0px_#FFFFFF2E] flex items-center w-[594px] h-[48px] justify-center gap-[5px] text-[#999DAA] bg-[#3f4455] transition-all duration-200 hover:bg-[#161D29]"></input>
  </div>
<div className="flex-col gap-[5px] pt-[80px] mx-auto w-[594px] h-[76px] ">
  <p className="h-[22px] w-[287px] text-[#DBDDEA] text-[14px] font-[400px]">Phone Number</p>
  <div >
{/* <select name="country-codes">
{
  country.map((ele,index)=>{
   
    ele.country==="India"? (
      <option selected value={ele.country}>{ele.code}</option>
    )):()
   
  })
}
</select> */}

<div> <input type="number" placeholder="enter your number"
 className=" pl-[5px] rounded shadow-[inset_0px_-1px_0px_0px_#FFFFFF2E] flex items-center w-[594px] h-[48px] justify-center gap-[5px] text-[#999DAA] bg-[#3f4455] transition-all duration-200 hover:bg-[#161D29]"></input></div>
  </div>
</div>

 <div className="w-[594px] max-w-xl rounded-xl bg-richblack-800 p-6 mt-[100px]">
      {/* Message textarea */}
      <label className="mb-2 block text-sm text-richblack-200">
        Message
      </label>

      <textarea
        placeholder="Enter your message"
        rows={4}
        className="pl-[5px] rounded shadow-[inset_0px_-1px_0px_0px_#FFFFFF2E] flex items-center w-[594px] h-[158px] justify-center gap-[5px] text-[#999DAA] bg-[#3f4455] transition-all duration-200 hover:bg-[#161D29]"
      />

      {/* Button */}
      <button
        className="mt-6 w-[594px] rounded-lg bg-yellow-400 py-3 font-semibold text-richblack-900 transition hover:bg-yellow-300"
      >
        Send Message
      </button>
    </div>
</form>
</div>


</div>
</div>
<Allreviews/>
<Footer/>
    </div>
  )
}

export default contactus;
