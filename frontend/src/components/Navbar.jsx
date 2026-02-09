import React,{useState,useEffect,useRef} from 'react'
import { Link } from 'react-router-dom';
import { NavbarLinks } from '../assets/data/navbar-links';
// import Logo-Full-Light from  "../assets/Logo/Logo-Full-Light.png"
import Logo_Full_Light from  "../assets/Logo/Logo-Full-Light.png";
// import { NavbarLinks } from '../assets/data/navbar-links.jsx';
import { matchPath } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import UseOnClickOutside from './Auth/UseOnClickOutside.jsx';
import { useSelector } from 'react-redux';
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import Profilemenu from './Auth/Profilemenu';
// import {categories} from "../services/apis.jsx";
import { apiconnector } from '../services/apiconnector.jsx';
import { api } from '../services/apis.jsx';
import { IoIosArrowDown } from "react-icons/io";
// import { IoIosArrowDown } from "react-icons/io";
const Navbar = () => {
const location=useLocation();
const [open,setopen]=useState(false);
const ref=useRef(null);
 UseOnClickOutside(ref, () => setopen(false))
function matchroute(route){
    return matchPath({path:route},location.pathname);
}

const {token}=useSelector((state)=>state.auth);
const {user}=useSelector((state)=>state.profile); 
const {cart}=useSelector((state)=>state.cart);
const [ink,setink]=useState([]);
// console.log("token",token);
// console.log("user ",user);
async function fetchlinks(){
  try{
const result =await apiconnector("GET",api.getallcategories);
// console.log("fetching sublinks",result);
// setlinks(result);
const response=result.data.getallcategory;
// console.log("respone ink",response);
  setink(response);
// console.log(result.data.getallcategory);
// console.log("inks",ink);
  }
  catch(error){
console.log("error in catalog",error)
  }
}
useEffect(()=>{
fetchlinks();
// console.log("ink",ink);
},[])
const tager=["/dashboard/my-profile","/dashboard/instructor","/dashboard/my-courses","/dashboard/add-course","/dashboard/enrolled-courses","/dashboard/purchase-history","/Dashboard","course","/dashboard/allcourses","/dashboard/cart"];
const isactive=()=>{
  console.log("location pathname",location.pathname.split("/").at(-2));
  if(tager.includes(location.pathname)){
    return true
  }
  else if(tager.includes(location.pathname.split("/").at(-2))){
    return true;
  }
  else return false;
}
  return (
    <div className={`${isactive()?"bg-[#161D29]":"bg-[#000814]"}  w-full h-[56px]  flex items-center fixed z-[10]`}>
      <div className="w-12/12 mx-auto flex gap-[10px]  justify-around-center items-center">
     <Link to="/" >
        <img src={Logo_Full_Light} className="w-[160px] h-[32px] ml-[160px]"></img>
     </Link>
 
<div className="flex gap-[40px] w-[816px] h-[32px] items-center mx-auto ml-[300px]">
{
NavbarLinks.map((ele,index)=>{
    return (

      
        ele.title==="Catalog"?<div key={index} onClick={()=>setopen(true)} className="  relative flex  h-[32px] items-center group ">
          <div className="w-[101px] h-[32px] flex justify-center items-center gap-[4px] ">
            <div className="text-[16px] font-[400px] text-[#DBDDEA]">{ele.title}</div>
            <IoIosArrowDown size={18} color="white" className="top-[2px] relative"/>
          </div>
            {open && (<div  className="w-[35px] h-[30px] left-[65px] top-[45px] rotate-z-45 bg-[#DBDDEA] absolute rounded-sm">
             </div>)

            }     
           
           { open && (
            <div ref={ref} onClick={(e)=>e.stopPropagation()} className="w-[250px] justify-around pt-[10px] rounded flex-col  absolute top-[50px] right-[-80px] min-w-[210px]  bg-[#DBDDEA] pb-[10px] ">

               {
                  ink.map((ele,index)=>{
                    return (

                        <Link to={`/categorypage/${ele.name}/${ele._id}`}>
                           <div onClick className="flex w-[230px] mx-auto pl-[10px] rounded-md items-center  h-[50px]  text-[#161D29] hover:bg-[#c5c8cc] hover:text-richblack-25 font-[400] text-[16px] ">{ele.name}</div>
                        </Link>

                  )})
                  


               }

            </div>
           )

           }

        </div>:<Link to={ele?.path} key={index} className="text-[16px] flex items-center">
            <p className={`${matchroute(ele?.path)?"text-[#FFD60A]":"text-[#DBDDEA]"} font-[400px] text-[16px]`}>{ele.title}</p>
        </Link>
      
    )
})



}

</div>


<div className="flex gap-[30px] w-[160px]  h-[29.88px] mr-[130px]">
{

user && user?.accounttype!=="instructor" && (
  <Link to="/cart" className="relative w-[35px] h-[25px] top-[5px]">
    <div className="">
      <IoCartOutline size={24}/>
  
  {
    cart>0 && (
      <span>
        {cart}
      </span>
    )
  }
    </div>
  
  </Link>
)
}

{
  user===null && (
    
<Link to="/login" className="text-white hover:scale-95 transition-all duration-300"><div className=" w-[78px] h-[40px] flex  justify-center items-center  rounded shadow-[inset_0px_-1px_0px_0px_#FFFFFF2E]  gap-[5px] text-[#999DAA] bg-[#3f4455] transition-all duration-200 hover:bg-[#161D29]">login</div></Link>
)}


{
  user===null && (
    <Link to="/Signup" className="text-white hover:scale-95 transition-all duration-300"><div className="  justify-center w-[80px] h-[40px] flex   items-center  rounded shadow-[inset_0px_-1px_0px_0px_#FFFFFF2E]  gap-[5px] text-[#999DAA] bg-[#3f4455] transition-all text-[16px] duration-200 hover:bg-[#161D29] ">signin</div></Link>
  )
}

{
  user!==null && (<Profilemenu/>)
  
}

</div>






      </div>


    </div>
  )
}

export default Navbar
