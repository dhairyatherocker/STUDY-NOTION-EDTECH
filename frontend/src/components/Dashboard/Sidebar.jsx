import React,{useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
// import Sidebar from '../components/Dashboard/Sidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidelink from './Sidelink'
import ErrorBoundary from '../../pages/ErrorBoundary'
import { logout } from '../../services/apicaller'
import { sidebarLinks } from '../../assets/data/dashboard-links'
import Confirmationmodal from './Confirmationmodal'
import { IoSettingsOutline } from "react-icons/io5";
const Sidebar = () => {
    const {user}=useSelector((state)=>state.profile);
    const dispatch=useDispatch();
    const [confirmation,setconfirmation]=useState(null);
    const {loading:authloading}=useSelector((state)=>state.auth)
const {loading:profileloading}=useSelector((state)=>state.profile)
const navigate=useNavigate();

if(authloading||profileloading){
    return <div>Loading...</div>
}
  return (
    <div className="w-[222px] h-[3000px] z-[10] bg-[#161D29] fixed top-[52px] ">
      
 <div className="w-[222px] min-h-[190px] flex-col bg-[#161D29] pt-[20px] ">

    {
        sidebarLinks.map((ele,index)=>{
             if(ele?.type && user?.accounttype!=ele?.type) return null;
             else {
                return (
               
                     <Sidelink ele={ele} key={ele.id} />
                             )
             }
            
        })
    }
 </div>


<div className=" w-[190px] h-[1px] border-t border-[#838894] ml-[15px] mt-[15px]">

</div>

<div className="w-[222px] h-[76px] bg-[#161D29] flex-col pt-[20px]">

 
 <Sidelink ele={{name:"Settings",icon:"SettingsGear",path:"/dashboard/Settings"}} />

 <div className="flex justify-center" onClick={()=>setconfirmation(
{title1:"Are You Sure ?",
title2:"You will be logged out of your Account" ,
btn1:"Logout",
btn2:"Cancel",
btn1handler:()=>dispatch(logout(navigate)),
btn2handler:()=>setconfirmation(null)}
)}>

<div className="text-[15px] text-[#838894] font-bold pt-[10px]">Logout</div>

 </div>
{
  confirmation!=null && (<Confirmationmodal modaldata={confirmation}/>)
}
</div>


</div>

  )
}

export default Sidebar
