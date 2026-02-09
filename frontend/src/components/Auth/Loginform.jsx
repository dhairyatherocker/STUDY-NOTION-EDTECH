import React,{useState} from 'react'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import {toast} from "react-hot-toast"
import {login} from "../../services/apicaller.jsx";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Loginform = () => {

const dispatch=useDispatch();
const navigate=useNavigate();

 const [data,setdata]=useState({
    email:"",
    password:""
  })
 function changehandler(event) {
  setdata((prev) => {
    return {
      ...prev,
      [event.target.name]: event.target.value
      };
  });
  console.log(data);
}

function loginhandler(){
// if(data.email==null||data.password==null){
//   toast.error("enter all the fields");
//   return;
// }
const {email,password}=data
dispatch(login(email,password,navigate));
setdata(
  {
    email:"",
    password:""
  }
)

}


  const [showpassword,setshowpassword]=useState(false);

  return (
    <div className="w-[444px] h-[198px] flex-col gap-[20px]">
      <form>
 {/* email */}

 <div className="flex-col w-[444px] h-[76px] mt-[30px]">
          <div className="text-[#F1F2FF]  h-[22px] w-[72px] text-[14px]">
           Email<span className="text-[#EF476F] text-[14px]"> *</span>
          </div>
          <div className="mt-[6px]">
           <input type="email" onChange={(e)=>changehandler(e)}  placeholder="Enter your email" name="email" value={data.email}  className=" pl-[5px] rounded shadow-[inset_0px_-1px_0px_0px_#FFFFFF2E] flex items-center w-[444px] h-[48px] justify-center gap-[5px] text-[#999DAA] bg-[#3f4455] transition-all duration-200 hover:bg-[#161D29]"/>
          </div>
        </div>


{/* password */}


<div className="relative mt-[20px]">
          <div className="text-[#F1F2FF]   h-[22px] w-[72px] text-[14px] flex">
          
          <p className="w-[62px] h-[22px]">Password</p> <span className="text-[#EF476F] text-[14px]">*</span>
          </div>
          <div>
           <input type={showpassword?"text":"password"}  onChange={(e)=>changehandler(e)}  placeholder="Enter password" name="password" value={data.password} className="mt-[6px] pl-[5px] rounded shadow-[inset_0px_-1px_0px_0px_#FFFFFF2E] flex items-center w-[444px] h-[48px] justify-center gap-[5px] text-[#999DAA] bg-[#3f4455] transition-all duration-200 hover:bg-[#161D29]"/>
          </div>
          <div onClick={()=>setshowpassword(!showpassword)} className="absolute left-[400px] bottom-[15px]">{showpassword? <FaRegEyeSlash/>:<FaRegEye/> }  </div>

          <div onClick={()=>resetpagehandler} className="absolute left-[350px] w-[444px] text-[12px] font-[400px] text-[#47A5C5] h-[20px]"><Link to="/resetpassword">forgot password</Link></div>
        </div>
         

         {/* button  */}



         <div onClick={loginhandler} className=" h-[48px] w-[444px] rounded-[8px]  bg-[#FFD60A] shadow-[inset_-2px_-2px_0px_0px_#FFFFFF82] flex justify-center items-center text-[16px] font-[600px]  text-[#161D29] relative top-[40px] right-[0px]">
  Sign in
 </div>
 
      </form>
    </div>
  )
}

export default Loginform
