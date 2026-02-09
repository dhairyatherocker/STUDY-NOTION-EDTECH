import React from 'react'
import { Link } from 'react-router-dom'
const Button = ({children,active,length,linkto,text}) => {
  return (
   <div>
    <Link to={linkto} className="no-underline">
 <div className={`h-[48px] ${length ? "w-[135px]":"w-[148px]"} rounded-[8px] ${active ? "bg-[#FFD60A] shadow-[inset_-2px_-2px_0px_0px_#FFFFFF82]":"bg-[#161D29]"} flex justify-center items-center text-[16px] font-[600px] ${text ? "text-[#161D29]" : "text-[#F1F2FF]"} shadow-[-2px_-2px_0px_0px_#FFFFFF2E_inset]  hover:scale-95 transition-all duration-300`}>
        {children}
       

    </div>
  </Link>
   </div>
        
   
   
  )
}

export default Button;
