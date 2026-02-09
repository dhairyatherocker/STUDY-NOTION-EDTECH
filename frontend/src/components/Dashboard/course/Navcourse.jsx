import React,{useState,useEffect} from 'react'
import Navmenu from './Navmenu'
import ProgressBar from "@ramonak/react-progress-bar";
import {toast} from "react-hot-toast"
import { LuFileCheck } from "react-icons/lu";
import {Link,Links} from "react-router-dom"
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiOutlineDotsVertical } from "react-icons/hi";
const Navcourse = ({course,coursedata}) => {
const [coursetype,setcoursetype]=useState("All");
const [view,setview]=useState();
const [data,setdata]=useState(null);
const [prog,setprog]=useState(null);
useEffect(()=>{
  console.log("subsectionId",course?.[3]?.section?.[0]?.subsections?.[0]?._id);
   
})
function viewhandler(id){
  if(view.includes(id)) setview();
setview(id)
} 

function openhandler(id){
  if(view==null) return false
 else if(view.includes(id)) return true;
  else return false;
}
function progresshandler(ele){
  console.log("coursedata in ",coursedata)
let courseprog=coursedata.filter((state)=>state.courseId===ele._id);
console.log("courseprog to view",courseprog);
let lectures=0;
 ele?.section.forEach((section)=>{
       lectures+=section?.subsections.length || 0
    });
    if(ele.lectures==0){
      return 0;
    }
    else if(courseprog.completedvideos==null){
        return 0;
    }
    else {
    let calc=  (courseprog.completedvideos.length/lectures)*100;
    return calc;    }
}
  return (
    
    <div className="w-[1217px] h-full relative left-[200px] top-[50px]">
     {/* sub div  */}
<div className="h-[580px] w-[1217px]">

{/* section 1 */}

<div className="w-[1217px] h-[120px] flex-col gap-[40px]">
  {/* section name  */}
  <div className="h-[22px] w-[1073px] font-500 text-[14px] text-[#838894]">Home / Dashboard / <span className="text-[#FFD60A]">Enrolled Courses</span></div>

  <div className="w-[1073px] h-[38px] text-[30px] font-[500] text-[#F1F2FF] pt-[10px]">Enrolled Courses</div>
</div>

{/* sectuon 2 */} 

<div className="h-[44px] w-[1217px] relative left-[0px] top-[0px]">
<Navmenu coursetype={coursetype} setcoursetype={setcoursetype} />
</div>

{/* section 3 */}

<div className="w-[1162px] h-[390px] flex-col relative top-[50px]">

{/* brown section  */}

<div className="flex   rounded-xl">
  <div className="w-[582px] h-[54px] text-[#C5C7D4] font-[500] text-[16px] bg-[#2C333F] pl-[20px] pt-[10px] rounded-tl-md">Course Name</div>
  <div className="w-[234px] h-[54px] text-[#C5C7D4] font-[500] text-[16px] bg-[#2C333F] pl-[20px] pt-[10px]">Durations</div>
  <div className="w-[234px] h-[54px] text-[#C5C7D4] font-[500] text-[16px] bg-[#2C333F] pl-[20px] pt-[10px]">Progress</div>
  <div className="w-[112px] h-[54px] text-[#C5C7D4] font-[500] text-[16px] bg-[#2C333F] pl-[20px] pt-[10px] rounded-tr-md"></div>
</div>

<div>
  {
    course.map((ele,index)=>{
      return(
         <div className="w-[1162px] h-[84px] border-1 justify-center items-center flex" key={index}>
         <Link to={`/course/Dashboard/${ele?._id}/section/${ele?.section?.[0]?._id}/subsectionId/${ele?.section?.[0]?.subsections?.[0]?._id}`}>
           <div className="flex gap-[30px] pr-[0px] items-center w-[478px] h-[84px] pt-[5px]  ">
            <div><img src={ele?.imageofcourse} className="w-[52px] h-[52px] rounded-md"/></div>
            <div className="flex-col gap-[10px]">
              <div className="font-[500] text-[16px] text-[#F1F2FF]">{ele?.topic}</div>
              <div className="font-[400] text-[16px] text-[#838894]">{ele?.description}</div>
            </div>
          </div>
         </Link>
         
          <div className="font-[500] text-[16px] text-[#C5C7D4] w-[234px] h-[84px] flex justify-center items-center">
          {
            ele?.duration?(<p>{ele?.duration}</p>):(<p>2 h 30 min</p>) 
          }
            
          </div>
           <div className="w-[234px] h-[84px] flex-col gap-[10px] pt-[12px]">
            <div className="font-[600] text-[12px] text-[#C5C7D4] ">Progress {progresshandler(ele) || 0}%</div>
          <ProgressBar completed={progresshandler(ele) || 50} maxCompleted={100} className="w-[202px] h-[8px] mt-[8px]" />
           </div>
          <div  className="w-[112px] h-[84px] text-[#C5C7D4] flex justify-center items-center "><HiOutlineDotsVertical onClick={()=>viewhandler(ele._id)} /></div>
          {
          openhandler(ele._id)   && (
              <div className="  w-[207px] h-[100px] bg-[#424854] left-[1000px] top-[10px] z-[10] rounded-xl flex-col gap-[20px] pl-[20px] justify-center items-center pt-[20px] ">
                <div className="font-[600] text-[16px] text-[#F1F2FF] flex gap-[12px] w-[183px] h-[32px] items-center"><LuFileCheck /> <p>Mark as Completed</p></div>
                <div  className="font-[600] text-[16px] text-[#F1F2FF] flex gap-[12px] w-[183px] h-[32px] items-center"><RiDeleteBin6Line /><p>Remove</p></div>
                <Link></Link>
              </div>
            )
          }
         </div>
       
      )
    })
  }
  
</div>


</div>

</div>

</div>
  )
}

export default Navcourse
