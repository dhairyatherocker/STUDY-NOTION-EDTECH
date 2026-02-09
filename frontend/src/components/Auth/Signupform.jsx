import React,{useState} from 'react'
// import { FaRegEye } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import {sendotp} from "../../services/apicaller.jsx"
import { setSignupData} from "../../slices/authslice.jsx"
import {useNavigate} from "react-router-dom"
import { useDispatch ,useSelector} from 'react-redux';
import {toast} from "react-hot-toast";
const Signupform = ({accounttype,setaccounttype,tabdata}) => {
  const signupdata=useSelector((state)=>state.auth.signupData)
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [data,setdata]=useState({firstname:"",
    lastname:"",
    email:"",
    password:"",
    confirmpassword:""
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

function submithandler(event){
event.preventDefault();
if(data.password!==data.confirmpassword){
  toast.error("password nad confirmpassword must be same");
  return;
}
const {email}=data;
 
// dispatch(sendotp(firstname,lastname,email,password,confirmassword,navigate))
const signupdata={...data,accounttype}
dispatch( setSignupData(signupdata))
 if (!signupdata.email) {
    toast.error("Email is required");
    return;
  }

dispatch(sendotp(email,navigate));
setdata({
  firstname:"",
  lastname:"",
  email:"",
  password:"",
  confirmpassword:""
});
setaccounttype("student");


}


  const [showpassword,setshowpassword]=useState(false);
   const [showconfirmpassword,setshowconfirmpassword]=useState(false);
  return (
    <div className="w-[444px] h-[450px] mt-[50px]">
   

<form  className="flex-col gap-[50px] h-[450px] w-[444px]" >
    {/* name field */}
        <div className="flex w-[444px] h-[76px] gap-[20px] ">
        <div className=" flex-col gap-[6px]">
          <div className="text-[#F1F2FF]   h-[22px] w-[72px] text-[14px] flex">
          
          <p className="w-[62px] h-[22px]">FirstName</p> <p className="text-[#EF476F] text-[14px]">*</p>
          </div>
          <div className="flex-col gap-[6px]">
           <input onChange={(e)=>changehandler(e)} type="text"  placeholder="Enter first name" name="firstname" value={data.firstname} className="  mt-[6px] pl-[5px] rounded shadow-[inset_0px_-1px_0px_0px_#FFFFFF2E] flex items-center w-[212px] h-[48px] justify-center gap-[5px] text-[#999DAA] bg-[#3f4455] transition-all duration-200 hover:bg-[#161D29]"/>
          </div>
        </div>
         

         <div className="flex-col gap-[6px] h-[76px]">
          <div className="text-[#F1F2FF]  h-[22px] w-[72px] text-[14px]">
           LastName<span className="text-[#EF476F] text-[14px]">*</span>
          </div>
          <div>
           <input type="text" onChange={(e)=>changehandler(e)}  placeholder="Enter Last name" name="lastname" value={data.lastname} className=" pl-[5px] rounded shadow-[inset_0px_-1px_0px_0px_#FFFFFF2E] flex items-center w-[212px] h-[48px] justify-center gap-[5px] text-[#999DAA] bg-[#3f4455] transition-all duration-200 hover:bg-[#161D29] mt-[6px]"/>
          </div>
        </div>

        </div>
         
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

<div className="flex w-[444px] h-[76px] gap-[20px] mt-[30px]">
        <div className="relative">
          <div className="text-[#F1F2FF]   h-[22px] w-[72px] text-[14px] flex">
          
          <p className="w-[62px] h-[22px]">Password</p> <span className="text-[#EF476F] text-[14px]">*</span>
          </div>
          <div>
           <input type={showpassword?"text":"password"}  onChange={(e)=>changehandler(e)}  placeholder="Enter password" name="password" value={data.password} className="mt-[6px] pl-[5px] rounded shadow-[inset_0px_-1px_0px_0px_#FFFFFF2E] flex items-center w-[212px] h-[48px] justify-center gap-[5px] text-[#999DAA] bg-[#3f4455] transition-all duration-200 hover:bg-[#161D29]"/>
          </div>
          <div onClick={()=>setshowpassword(!showpassword)} className="absolute left-[180px] bottom-[15px]">{showpassword? <FaRegEyeSlash/>:<FaRegEye/> }  </div>
        </div>
         

         <div className="relative">
          <div className="text-[#F1F2FF]  h-[22px] w-[72px] text-[14px]">
           confirmPassword<span className="text-[#EF476F] text-[14px]">*</span>
          </div>
          <div>
           <input type={showconfirmpassword?"text":"password"}  onChange={(e)=>changehandler(e)}  placeholder="Enter password" name="confirmpassword" value={data.confirmpassword} className="mt-[6px] relative pl-[5px] rounded shadow-[inset_0px_-1px_0px_0px_#FFFFFF2E] flex items-center w-[212px] h-[48px] justify-center gap-[5px] text-[#999DAA] bg-[#3f4455] transition-all duration-200 hover:bg-[#161D29]"/>
                
          </div>
   <div onClick={()=>setshowconfirmpassword(!showconfirmpassword)} className="absolute left-[180px] bottom-[15px]">{showconfirmpassword? <FaRegEyeSlash/>:<FaRegEye/> }  </div>
        </div>


{/* button */}


 <div >
    
 <div  onClick={(event)=>submithandler(event)}  className=" h-[48px] w-[444px] rounded-[8px]  bg-[#FFD60A] shadow-[inset_-2px_-2px_0px_0px_#FFFFFF82] flex justify-center items-center text-[16px] font-[600px]  text-[#161D29] relative top-[130px] right-[470px]">
  Create Account
 </div>
      
       
      
    

   </div>



        </div>
         

    




      </form>
</div>
      
      
    
  )
}

export default Signupform
