import {React,useRef,useEffect,useState} from 'react';
import { VscSignOut } from "react-icons/vsc";
import { VscDashboard } from "react-icons/vsc";
import {useSelector,useDispatch} from "react-redux";
import { BsCart3 } from "react-icons/bs";
import { logout } from '../../services/apicaller';
// import { logout } from '../../slices/profileslice';
import {Link,useNavigate} from "react-router-dom"
import { MdDashboard } from "react-icons/md";
import UseOnClickOutside from './UseOnClickOutside';
const Profilemenu = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {user}=useSelector((state)=>state.profile)
  
  useEffect(()=>{
console.log("user menu  ",user);
  },[user])
  const [open,setopen]=useState(false);
  const ref=useRef(null);
  UseOnClickOutside(ref, () => setopen(false))
if(!user) return null;
  return (
    <div className="w-[80px] h-[30px]  flex items-center ">
{/* { 
  user.accounttype==="student" && (
   <div>
    <BsCart3/> 
   </div>
  )
}    */}
<div onClick={()=>setopen(true)} className="relative z-[10]">

{ <div className="rounded-full w-[29px] h-[30px] " >
  <img src={user?.image} className="rounded-full "></img>

</div> 


}


{
  open && (
   <div onClick={(e)=>e.stopPropagation()} className="absolute top-[40px] w-[130px] h-[85px] right-[-70px]   z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-[#3f4043]  " ref={ref}>
   <Link to="/Dashboard/my-profile">
    <div className="flex w-full items-center gap-[20px] py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-[#FFFFFF2E] hover:text-richblack-25  font-bold text-[#DBDDEA] ">
      <div>Dashboard</div>
      <MdDashboard size={22} />
    </div>
    
   </Link>
   <div className="hover:bg-richblack-700 hover:text-richblack-25 flex items-center">
    <div onClick={()=>dispatch(logout(navigate))} className="flex w-full items-center gap-[20px] py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-[#FFFFFF2E] hover:text-richblack-25 font-bold text-[#DBDDEA]">
      <div>logout</div>
      <div size={22}><VscSignOut/></div>
    </div>
   </div>
</div>
  )
}

</div>



    </div>
  )
}

export default Profilemenu
