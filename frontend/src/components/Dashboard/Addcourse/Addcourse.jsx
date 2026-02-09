import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Addcourseform from './Addcourseform'
import { useSelector } from 'react-redux'
const Addcourse = () => {
    const navigate=useNavigate();
    // const selector=useSelector();
    const {step}=useSelector((state)=>state.course);
    useEffect(()=>{
      //  console.log("course in add course",course);
       console.log("step in add course",step);
      //  console.log("editCourse in add course",editCourse);
      // console.log("you entered in edit course route");
    },[])
  return (
    <div className="w-[1150px] h-[800px] ml-[200px] flex">
      <div className="flex-col gap-[20px] w-[665px]">
      <div onClick={()=>navigate("/dashboard")} className="text-[15px] font-[500] text-[#838894] w-[545px] h-[22px] ">Add Course</div>
          <Addcourseform/>
      </div>
      <div className="w-[400px] h-[290px] bg-[#161D29] ml-[260px] mt-[150px] flex-col gap-[20px] fixed left-[800px]">
      <p className='text-[#F1F2FF] font-semibold text-[20px] pt-[20px]'>⚡Course Upload Tips</p>
        <ul className="text-[#F1F2FF] text-[12px] font-[500] list-disc pl-[20px] pt-[10px] flex-col gap-[10px] h-[300px] w-[]">
         <li className="text-[F1F2FF] text-[12px] font-[500] h-[20px]"> Set the Course Price option or make it free.</li>
         <li className="text-[F1F2FF] text-[12px] font-[500] h-[20px] ">Standard size for the course thumbnail is 1024x576.</li>
         <li className="text-[F1F2FF] text-[12px] font-[500] h-[20px]">Video section controls the course overview video.</li>
         <li className="text-[F1F2FF] text-[12px] font-[500] h-[20px]">Course Builder is where you create & organize a course.</li>
         <li className="text-[F1F2FF] text-[12px] font-[500] h-[40px]">Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
         <li className="text-[F1F2FF] text-[12px] font-[500] h-[40px]">Information from the Additional Data section shows up on the course single page.</li>
         <li className="text-[F1F2FF] text-[12px] font-[500] h-[20px]">Make Announcements to notify any important</li>
         <li className="text-[F1F2FF] text-[12px] font-[500] h-[20px]">Notes to all enrolled students at once.</li>
        </ul>
      </div>


    </div>
  )
}

export default Addcourse
