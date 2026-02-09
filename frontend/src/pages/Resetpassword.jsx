import React,{useState} from 'react'
import {toast} from "react-hot-toast";
import {resetpassword} from "../services/apicaller.jsx"
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Resetpassword = () => {
    const navigate=useNavigate;
    const dispatch=useDispatch();
const [usermail,setusermail]=useState("");
const [mirror,setmirror]=useState(false);
const [data,setdata]=useState({
    email:""
    });
function changehandler(e){
    setdata((prev) => {
    return {
      ...prev,
      [e.target.name]: e.target.value
      
    };3
  });
  console.log(data);
}
function sethandler(){
    // if(data.email==null){
    //     toast.error("please enter email");
    //     return;
    // }
    const {email}=data;
    setusermail(data.email);
    dispatch(resetpassword(email,setmirror,navigate));
    setdata({
        email:""
    })
} 

function resendhandler(){
    dispatch(resetpassword(usermail,setmirror,navigate)); 
}

  return (
    <div className="w-full h-full flex justify-center items-center ">
<div className="w-[508px] h-[448px] flex flex-col gap-[10px]">
{
 !mirror&&(
    <div className="w-[444px] h-[38px] text-[#F1F2FF] font-bold text-[30px]">Reset your password</div>
 )

}

{
    mirror && (
        <div className="w-[444px] h-[38px] text-[#F1F2FF] font-bold text-[30px]">Check email</div>
    )
}

{
    mirror && (
        <div className="w-[444px] h-[38px] text-[#AFB2BF] font-bold text-[18px]">`We have sent the reset email to  {usermail}`</div>
    )
}

{
    !mirror &&  (<div className="w-[444px] h-[38px] text-[#AFB2BF] font-bold text-[18px]">
         Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery
    </div>
       
    )
}


{
   !mirror && (
    <div className="flex-col w-[444px] h-[76px] mt-[30px] relative ">
          <div className="text-[#F1F2FF]  h-[22px] w-[72px] text-[14px]">
           Email<span className="text-[#EF476F] text-[14px]"> *</span>
          </div>
          <div className="mt-[6px]">
           <input type="email" onChange={(e)=>changehandler(e)}  placeholder="Enter your email" name="email" value={data.email}  className=" pl-[5px] rounded shadow-[inset_0px_-1px_0px_0px_#FFFFFF2E] flex items-center w-[444px] h-[48px] justify-center gap-[5px] text-[#999DAA] bg-[#3f4455] transition-all duration-200 hover:bg-[#161D29]"/>
          </div>
        </div>

   )
}

{
    !mirror && (
        <div onClick={sethandler} className=" h-[48px] w-[444px] rounded-[8px]  bg-[#FFD60A] shadow-[inset_-2px_-2px_0px_0px_#FFFFFF82] flex justify-center items-center text-[16px] font-[600px]  text-[#161D29] relative top-[40px]">Reset Password </div>
    )
}


{
    mirror && (
         <div onClick={resendhandler} className=" h-[48px] w-[444px] rounded-[8px]  bg-[#FFD60A] shadow-[inset_-2px_-2px_0px_0px_#FFFFFF82] flex justify-center items-center text-[16px] font-[600px]  text-[#161D29] relative top-[30px] ">Resend Email </div>
    )
}

</div>
    </div>
  )
}

export default Resetpassword
