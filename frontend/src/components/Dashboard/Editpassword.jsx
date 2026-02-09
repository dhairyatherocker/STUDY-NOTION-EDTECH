import React,{useState} from 'react'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
const Editpassword = ({data,setdata,edithandler,sendhandler}) => {
    const [showpassword,setshowpassword]=useState(false);
       const [shownewpassword,setshownewpassword]=useState(false);
  return (
   <div className="w-[792px] h-[170px] bg-[#161D29] mt-[40px] flex-col border-1 rounded-xl border-[#2C333F]">
<div className="text-[#F1F2FF] text-[18px] font-[600] pl-[30px] mt-[10px]">
  Password
</div>



<div className="flex  ml-[30px] gap-[100px] mt-[20px]">

        <div className="relative">
          <div className="text-[#F1F2FF]   h-[22px] w-[92px] text-[14px] flex">
          
          <p className="w-[92px] h-[22px]">Old Password</p> <span className="text-[#EF476F] text-[14px]">*</span>
          </div>
          <div>
           <input type={showpassword?"text":"password"}  onChange={(event)=>edithandler(event)}  placeholder="Enter old password" name="oldpassword" value={data.oldpassword} className="mt-[6px] pl-[5px] rounded shadow-[inset_0px_-1px_0px_0px_#FFFFFF2E] flex items-center w-[312px] h-[48px] justify-center gap-[5px] text-[#999DAA] bg-[#3f4455] transition-all duration-200 hover:bg-[#161D29]"/>
          </div>
          <div onClick={()=>setshowpassword(!showpassword)} className="absolute left-[270px] bottom-[15px]">{showpassword? <FaRegEyeSlash/>:<FaRegEye/> }  </div>
        </div>
         

         {/* <div className="flex w-[444px] h-[76px] gap-[20px] mt-[0px]"> */}
                 <div className="relative">
                   <div className="text-[#F1F2FF]   h-[22px] w-[102px] text-[14px] flex">
                   
                   <p className="w-[102px] h-[22px]">New Password</p> <span className="text-[#EF476F] text-[14px]">*</span>
                   </div>
                   <div>
                    <input type={showpassword?"text":"password"}  onChange={(event)=>edithandler(event)}  placeholder="Enter New password" name="newpassword" value={data.newpassword} className="mt-[6px] pl-[5px] rounded shadow-[inset_0px_-1px_0px_0px_#FFFFFF2E] flex items-center w-[312px] h-[48px] justify-center gap-[5px] text-[#999DAA] bg-[#3f4455] transition-all duration-200 hover:bg-[#161D29]"/>
                   </div>
                   <div onClick={()=>setshownewpassword(!shownewpassword)} className="absolute left-[270px] bottom-[15px]">{shownewpassword? <FaRegEyeSlash/>:<FaRegEye/> }  </div>
                 </div>
                  
       
       


</div>
  <div onClick={()=>sendhandler()} className="flex w-[96px] h-[40px] bg-[#FFD60A] rounded items-center gap-[8px] justify-center mt-[85px] ml-[650px]  hover:scale-95 transition-all duration-300">
         
        Edit
         </div>

       </div>
  )
}

export default Editpassword;
