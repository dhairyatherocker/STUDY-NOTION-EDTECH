import React,{useState} from 'react'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import {toast} from "react-hot-toast";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetpasswordtoken } from '../services/apicaller';
import { useLocation } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import { Links } from 'react-router-dom';
const Resetpasswordinterface = () => {
  const location=useLocation();
   const navigate=useNavigate;
      const dispatch=useDispatch();
const [showpassword,setshowpassword]=useState(false);
   const [showconfirmpassword,setshowconfirmpassword]=useState(false);
let [data,setdata]=useState({ 
    newpassword:"",
    confirmnewpassword:""
  })


function changehandler(e) {
  setdata((prev) => {
    return {
      ...prev,
      [e.target.name]: e.target.value
      
    };
  });
}
  

  function sethandler(){
    


    const {newpassword,confirmnewpassword}=data;
    if(!newpassword||!confirmnewpassword){
      toast.error("enter all the fields");
      return;
    }

 


  const token=location.pathname.split('/').at(-1);
  console.log("token we got",token);
   dispatch(resetpasswordtoken(newpassword,confirmnewpassword,token,navigate,setmirror));

  }
  const [mirror,setmirror]=useState(false);
  return (

    <div className="w-full h-full flex justify-center gap-[20px] items-center">
    {
        
        !mirror&&(

<div className="w-[508px] h-[586px] flex-col gap-[15px] ">
      
 <div className="w-[444px] h-[38px] text-[#F1F2FF] font-bold text-[30px]">Choose  new password</div>

<div className="w-[444px] h-[38px] text-[#AFB2BF] font-bold text-[18px] pt-[10px]">
        Almost done. Enter your new password and youre all set.
    </div>


 {/* pasword field  */}

 <div className="relative">
          <div className="text-[#F1F2FF]   h-[22px] w-[102px] text-[14px] flex">
          
          <p className="w-[102px] h-[22px] pt-[40px]">new Password</p> <span className="text-[#EF476F] text-[14px] top-[40px] relative">*</span>
          </div>
          <div>
           <input type={showpassword?"text":"password"}  onChange={(e)=>changehandler(e)}  placeholder="Enter password" name="newpassword" value={data.newpassword} className="mt-[50px] pl-[5px] rounded shadow-[inset_0px_-1px_0px_0px_#FFFFFF2E] flex items-center w-[312px] h-[48px] justify-center gap-[5px] text-[#999DAA] bg-[#3f4455] transition-all duration-200 hover:bg-[#161D29]"/>
          </div>
          <div onClick={()=>setshowpassword(!showpassword)} className="absolute left-[280px] bottom-[15px]">{showpassword? <FaRegEyeSlash/>:<FaRegEye/> }  </div>
        </div>
 
<div className="relative">
          <div className="text-[#F1F2FF]  h-[22px] w-[72px] text-[14px]">
          <div className="w-full flex  gap-[4px]"><p>confirm new Password</p><span className="text-[#EF476F] text-[14px]">*</span></div> 
          </div>
          <div>
           <input type={showconfirmpassword?"text":"password"}  onChange={(e)=>changehandler(e)}  placeholder="Enter password" name="confirmnewpassword" value={data.confirmnewpassword} className="mt-[6px] relative pl-[5px] rounded shadow-[inset_0px_-1px_0px_0px_#FFFFFF2E] flex items-center w-[312px] h-[48px] justify-center gap-[5px] text-[#999DAA] bg-[#3f4455] transition-all duration-200 hover:bg-[#161D29]"/>
                
          </div>
   <div onClick={()=>setshowconfirmpassword(!showconfirmpassword)} className="absolute left-[280px] bottom-[15px]">{showconfirmpassword? <FaRegEyeSlash/>:<FaRegEye/> }  </div>
        </div>



 {/* mark field  */}





{/* button field  */}


 <div onClick={sethandler} className=" h-[48px] w-[444px] rounded-[8px]  bg-[#FFD60A] shadow-[inset_-2px_-2px_0px_0px_#FFFFFF82] flex justify-center items-center text-[16px] font-[600px]  text-[#161D29] relative top-[40px]">Reset Password </div>



      </div>


        )
    }

    {
        mirror && (
            <div>
 <div className="w-[444px] h-[38px] text-[#F1F2FF] font-bold text-[30px]">Reset complete!</div>
<div className="w-[444px] h-[38px] text-[#AFB2BF] font-bold text-[18px]">
        All done! We have sent an email to m***********@gmail.com to confirm
    </div>
    

      <div  className=" h-[48px] w-[444px] rounded-[8px]  bg-[#FFD60A] shadow-[inset_-2px_-2px_0px_0px_#FFFFFF82] flex justify-center items-center text-[16px] font-[600px]  text-[#161D29] relative top-[40px]"><Link to="/login">Return to login</Link> </div>
            </div>
        )
    }
      
    </div>
  )
}

export default Resetpasswordinterface
