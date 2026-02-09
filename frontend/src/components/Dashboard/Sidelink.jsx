import React,{useState} from 'react'
import * as Icons from "react-icons/vsc"
import { Link } from 'react-router-dom'
import * as IoIcons from "react-icons/io5"
import { useSelector } from 'react-redux'
import { useLocation,matchPath } from 'react-router-dom'
const Sidelink = ({ele}) => {
    const {user}=useSelector((state)=>state.auth);
const location=useLocation();
const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }

console.log(`ele ${ele.name}`,ele?.path);
const isActive = matchRoute(ele.path);
console.log("active",isActive);
const Iconcomponent=Icons[ele?.icon] || IoIcons[ele?.icon]

console.log("icon",ele);
// console.log(`<Iconcomponent/>`)

  return (
    
<Link to={ele.path} >
<div className={`${isActive?"text-[#FFD60A] text-[14px]  font-[500] bg-[#58502b] border-l-4 border-yellow-500":"text-[#838894] bg-[#161D29] font-[600] "} text-[14px] h-[44px] flex gap-[14px] items-center justify-center font-bold ` }>

      {Iconcomponent &&  (<Iconcomponent size={25} className={`${isActive?"text-[#FFD60A] w-[16px] h-[40px] ":"w-[16px] h-[16px] text-[#838894]"} w-[16px] h-[16px] `}/>)}

      <div  className="text-[15px]">
        {ele.name}
      </div>
      
    </div>  

</Link>


    
    
  )
}

export default Sidelink
