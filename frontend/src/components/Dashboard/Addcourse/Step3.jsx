import React,{useState,useEffect} from 'react'
import { ImCheckboxChecked } from "react-icons/im";
import { BiCheckboxChecked } from "react-icons/bi";
import { useSelector,useDispatch } from 'react-redux';
import { publishcourse } from '../../../services/coursecaller';
import { ImCheckboxUnchecked } from "react-icons/im";
import { useNavigate } from 'react-router-dom';
import { resetCourseState } from '../../../slices/courseslice';
import {toast} from "react-hot-toast"
const Step3 = () => {
  // const [radio,setradio]=useState(false);
   const [isChecked, setIsChecked] = useState(false);
   const dispatch=useDispatch();
   const navigate=useNavigate();
   const {course}=useSelector((state)=>state.course);
   const {token}=useSelector((state)=>state.auth);
useEffect(()=>{
console.log("step 3 course",course)
})


  const handleToggle = () => {
    setIsChecked(!isChecked);
    console.log("checking status",isChecked);

  };
  function publishhandler(){
    if(!isChecked){
      toast.error("please check the box");
    }
    dispatch(publishcourse(course?._id,token));
    dispatch(resetCourseState());
     navigate("/dashboard/my-courses")
  }
  return (
    <div className="w-[665px] h-full relative left-[70px] top-[70px] ">
      <div className="w-[664px] h-[130px] bg-[#161D29] rounded-md pt-[10px] border-2 border-[#2C333F]">
        <div className="text-[24px] font-[600] text-[#F1F2FF] ml-[20px] ">Publish Settings</div>
        <div className="mt-[20px] ml-[20px] flex gap-[15px] items-center">
           {/* <input
        type="radio"
        checked={isChecked}
        onClick={handleToggle}
        className="appearance-none w-5 h-5 border-2 border-[#585D69] rounded-md checked-tick  focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all cursor-pointer"
      /> */}
{
  isChecked?<ImCheckboxChecked size={20}  onClick={handleToggle} className="bg-[#585D69]"/>:<ImCheckboxUnchecked size={20}  onClick={handleToggle}/>
}
<div className="text-[16px] font-[500] text-[#6E727F]">Make this Course Public</div>
        </div>
      </div>

<div className="flex gap-[20px] mt-[30px] ml-[280px] mb-[10px]">
<div onClick={()=>{dispatch(resetCourseState())
                    navigate("/dashboard/my-courses")}}  className="h-[48px] w-[164px] rounded-[8px]  bg-[#2C333F]  flex justify-center items-center text-[16px] font-[500]  text-white relative top-[0px] right-[0px] shadow-[inset_0_-2px_0_0_rgba(255,255,255,0.18)]">Save as a Draft</div>

<div onClick={()=>publishhandler()} className="  h-[48px] w-[199px] rounded-[8px]  bg-[#FFD60A] shadow-[-2px_-2px_0px_0px_white/51_inset] flex justify-center items-center text-[16px] font-[500]  text-[#161D29] relative top-[0px] right-[0px]">
Save and Publish
</div>

</div>

    </div>
  )
}

export default Step3
