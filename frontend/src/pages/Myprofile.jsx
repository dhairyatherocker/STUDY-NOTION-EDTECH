import React,{useEffect} from 'react'
import { useSelector } from 'react-redux';
import {useLocation} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { RiImageEditFill } from "react-icons/ri";
<RiImageEditFill />
// import { useLocation } from 'react-router-dom';
const Myprofile = () => {
  const navigate=useNavigate();
  const location=useLocation();
  const {user}=useSelector((state)=>state.profile)
  function edithandler(){
   navigate("/dashboard/settings")
  }
  useEffect(()=>{
    console.log("user in profile",user);
  })
  return (
    <div className="w-[1217px] h-[100vh] ml-[200px] mt-[60px] ">
      <div className="flex-col  pt-[30px] h-[72px] w-[1073px] mx-auto justify-between">
      <div className="text-[15px] text-[#838894]">Home  /  {location.pathname.split("/").at(-2)}  /  <span className="text-[#FFD60A]">{location.pathname.split("/").at(-1)}</span></div>
      <div className="text-[#F1F2FF]  text-[30px]"> My Profile</div>
      </div>
 
<div className="w-[892px] h-[366px] pt-[80px] ml-[140px]  ">
  <div className="w-[892px] h-[126px] bg-[#161D29] rounded-2xl flex ">
<div  className="w-[400px] h-[78px] pl-[20px] flex gap-[24px] items-center pt-[40px]"><img src={user?.image} className="rounded-full w-[58px] h-[58px]"/>
<div >
  <div className="text-[18px] text-[#F1F2FF]">{user?.firstname} {user?.lastname}</div>
  <div className="text-[14px] text-[#838894]"> {user?.email}</div>
</div>

</div>

<div onClick={edithandler} className="flex w-[96px] h-[40px] bg-[#FFD60A] rounded items-center gap-[8px] justify-center mt-[35px] ml-[350px]  hover:scale-95 transition-all duration-300">
<RiImageEditFill size={23}/>
<p className="text-[16px] text-[#000814]">Edit</p>
</div> 
  </div>

<div className="w-[892px] h-[220px] bg-[#161D29] rounded-2xl mt-[70px] flex-col gap-[20px]">
<div className="w-[844px] h-[40px] mx-auto flex items-center gap-[100px] ">
<p className="text-[20px] font-semibold text-[#F1F2FF] pt-[20px]">Personal Details</p>
<div onClick={edithandler} className="flex w-[96px] h-[40px] bg-[#FFD60A] rounded items-center gap-[8px] justify-center mt-[35px] ml-[490px]  hover:scale-95 transition-all duration-300" >
<RiImageEditFill size={23}/>
<p className="text-[16px] text-[#000814]">Edit</p>
</div>

</div>

<div className="w-[744px] h-[46px] flex gap-[500px] mt-[30px] mx-auto" >
  <div>
    <p className="text-[#838894] text-[14px]">First Name</p>
    <p className="text-[16px] text-[#F1F2FF]">{user?.firstname}</p>
  </div>
  <div>
    <p className="text-[#838894] text-[14px]">Last Name</p>
    <p className="text-[16px] text-[#F1F2FF]"> {user?.lastname}</p>
  </div>
</div>


<div className="w-[744px] h-[46px] flex gap-[350px] mt-[30px] mx-auto" >
  <div>
    <p className="text-[#838894] text-[14px]">Email</p>
    <p className="text-[16px] text-[#F1F2FF]">{user?.email}</p>
  </div>
  <div>
    <p className="text-[#838894] text-[14px]">Phone number</p>
    <p className="text-[16px] text-[#F1F2FF]"> {user?.profiledetails?.phonenumber?(user?.profiledetails?.phonenumber):("edit your details")}</p>
  </div>
</div>


</div>

</div>



    </div>

  )
}

export default Myprofile
