import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import { IoIosArrowUp } from "react-icons/io";
import { Link,Links } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { IoCheckboxOutline } from "react-icons/io5";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { HiOutlineDesktopComputer } from "react-icons/hi";
const CourseSidebar = ({setmodal}) => {

const {fullcoursedata,sectiondata,totallectures,completedlectures}=useSelector((state)=>state.viewcourse);
const [viewsection,setviewsection]=useState([`${location.pathname.split("/").at(-3)}`]);
const {user}=useSelector((state)=>state.profile);
useEffect(()=>{
console.log("sectiondata in courseslider",sectiondata);
console.log("fullcourse data in slide bar",fullcoursedata);
console.log("completedlectures  in slide bar",completedlectures);
})

function sechandler(id){
    if(viewsection.includes(id)){
      return true;
    }
    return false;
  }

function setsechandler(id){
    if(viewsection.includes(id)){
    setviewsection(viewsection.filter((ele) => ele !== id));
    }
  else if(viewsection.length>0){
    setviewsection([...viewsection,id])
   }
   else{
    setviewsection(id);
   }
  }
  function checkhandler(ele){
    if(completedlectures.length===0){
      return false;
    }
   else if(completedlectures.includes(ele)){
      return true;
    }
    return false;
  }
  return (
    <div className="w-[300px] h-[100vh] bg-[#161D29] border-1 border-[#2C333F] ">
     <div className="relative top-[100px] flex-col">
      <div className="w-[163px] h-[26px] relative left-[20px]  flex "><div className="w-[210px] font-[700] text-[16px] text-white">{fullcoursedata?.topic}</div><div className="w-[40px] text-[#06D6A0] font-[700] text-[16px] pl-[0px]">{completedlectures?.length}/{totallectures}</div></div>
        <div onClick={()=>setmodal(true)} className="mt-[20px] ml-[20px] w-[139px] h-[48px] bg-[#FFD60A] rounded-xl font-[500] text-[16px] text-[#000814] flex justify-center items-center">
           Add Review 
        </div>
     </div> 
     <div className="w-[240px] h-[1px] border-1 border-[#2C333F] relative top-[120px] left-[20px]"></div>
     <div className="relative top-[120px]">
{
  sectiondata.map((section)=>{
    return (
<div className="mt-[10px] w-[300px] " key={section._id}>
  <div className="flex justify-between w-[300px] mx-auto bg-[#2C333F] h-[54px] items-center border-b-1 border-[#424854] ">
  <div className="font-[500] text-[14px] text-[#F1F2FF] ml-[20px]">{section.title}</div> <div className="mr-[20px]">{sechandler(section._id)?<div onClick={()=>setsechandler(section._id)} ><IoIosArrowUp size={20} className="w-[20px] height-[20px] text-[#999DAA]"/></div>:<div onClick={()=>setsechandler(section._id)}><IoIosArrowDown size={20} className="w-[20px] height-[20px] text-[#999DAA]"/></div>}</div></div>
<div> 
{
sechandler(section._id) && (<>
  { 

  section?.subsections.map((subsection)=>{
    return (
      <div key={subsection._id}>
      <Link to={`/course/Dashboard/${fullcoursedata._id}/section/${section._id}/subsectionId/${subsection._id}`}>

         {
          checkhandler(subsection._id)?<div className="flex w-[300px] pl-[20px]">
           <IoCheckboxOutline className="text-[#6E727F] "/> <div className="w-[46px] h-[22px] text-[#6E727F] text-[14px] font-[400]">{subsection.title}</div> <div>{checkhandler(subsection._id)?<div><HiOutlineComputerDesktop size={10} className="text-[#838894] "/></div>:<div ><IoCheckboxOutline size={10} className="text-[#C5C7D4] "/></div>}</div>
          </div>:
         <div className="flex w-[300px] gap-[10px] items-center">
           <MdOutlineCheckBoxOutlineBlank/> <div>{subsection.title}</div> <div>{checkhandler(subsection._id)?<div><HiOutlineComputerDesktop size={16} className="text-[#838894] "/></div>:<div ><HiOutlineDesktopComputer size={16} className="text-[#C5C7D4] "/></div>}</div>
          </div>
         }
      </Link>
        
      </div>
    )
  })
}
</>

)
}

</div>

</div>
    )
  }) 
}
  
  </div>


    </div>
  )
}

export default CourseSidebar
