import React,{useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {setLoading} from "../slices/authslice.jsx";
import OtpInput from "react-otp-input";
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import { signup } from '../services/apicaller.jsx';
import {toast} from "react-hot-toast";
import { FaRegClock } from "react-icons/fa";
import Spinner from '../components/Spinner.jsx';
const Verifyemail = () => {
  const {signupData,loading,}=useSelector((state)=>state.auth);
  const [otp,setOtp]=useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate();

  useEffect(()=>{
if(!signupData){
  navigate("/login");
}
  },[])

  function sethandler(){
console.log("signupdata",signupData);
const {firstname,lastname,email,password,confirmpassword,accounttype}=signupData;
if(!otp){
 toast.error("please enter the otp");
}

dispatch(signup(firstname,lastname,email,otp,password,confirmpassword,accounttype,navigate));

  }
  return (
    <div className=" w-vw h-vh flex justify-center items-center pt-[150px]">
{
  loading?(<Spinner/>):(

<div className=" flex-col gap-[20px]">
 <div className="w-[444px] h-[38px] text-[#F1F2FF] font-bold text-[30px]">Reset your password</div>

 <div className="w-[444px] h-[38px] text-[#AFB2BF] font-bold text-[18px] pt-[30px]">
        A verification code has been sent to you. Enter the code below
    </div>

<OtpInput
      value={otp}
      onChange={setOtp}
      numInputs={6}
       inputStyle={{
    width: "3rem",
    height: "3rem",
    margin: "0 0.5rem",
    fontSize: "1.5rem",
    borderRadius: 4,
    border: "1px solid #ccc",
    textAlign: "center",
   marginTop:"70px"
  
  }}
      renderSeparator={<span>-</span>}
      renderInput={(props) => <input {...props} />}
    />

<div onClick={sethandler} className=" mt-[50px] h-[48px] w-[444px] rounded-[8px]  bg-[#FFD60A] shadow-[inset_-2px_-2px_0px_0px_#FFFFFF82] flex justify-center items-center text-[16px] font-[600px]  text-[#161D29] relative ">Verify email </div>

<div>



</div>
 



<div className="flex w-[450px] justify-between pt-[0px]">
<div className="flex items-center w-[200px] gap-[10px] pt-[10px]">
  <FaArrowRight color="white"/>
  <p className="text-[#F1F2FF]">Back to login</p>
</div>
<div className="pt-[10px] text-[#47A5C5] flex gap-[4px]">
<FaRegClock className="pt-[6px]" size={20}/>
  <Link to="login" className="text-[#47A5C5]">Resend it </Link>

</div>

</div>




</div>




  )
}



     
      
    </div>
  )
}

export default Verifyemail
