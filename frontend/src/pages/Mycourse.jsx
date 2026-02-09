import React,{useEffect,useState} from 'react'
import {getallcourses} from "../services/coursecaller"
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegClock } from "react-icons/fa6";
import { SiTicktick } from "react-icons/si";
import { deletecourse } from '../services/coursecaller';
import { setCourse,setEditCourse,setStep } from '../slices/Courseslice';
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
const Mycourse = () => {
  const dispatch=useDispatch();
const {token}=useSelector((state)=>state.auth);
const {course,editCourse,step}=useSelector((state)=>state.course);
const {user}=useSelector((state)=>state.profile);
const navigate=useNavigate();
const [courses,setcourses]=useState(null);
const fetchcourses=async()=>{
  try{
  const result=await getallcourses(token);

  console.log("result of getting all courses of an instructor",result);
  if(result.data.success){
  setcourses(result.data.allcourse.courses);}
  }
  catch(error){
 console.log(error);
  }
}
  useEffect(()=>{
   fetchcourses();
   
  },[])

  function deletehandler(id){
   dispatch(deletecourse(token,id));
   fetchcourses();
  }
 function editcoursehandler(ele){
  console.log("ele in my course",ele);
   dispatch(setStep("1"));
   dispatch(setEditCourse(ele._id));
   dispatch(setCourse(ele));
     
      // console.log("you entwrred in edit course route");
  //  navigate("edit-course");
   setTimeout(() => {
     console.log("course in add course",course);
       console.log("step in add course",step);
       console.log("editCourse in add course",editCourse);
    navigate("/dashboard/add-course");
  }, 1000);

 }
  return (
    <div className="w-[1217px] h-full ">
      <div className="w-[1317px] h-[120px]  relative top-[70px] left-[220px] flex items-center ">
      <div className=" pl-[60px] flex-col gap-[20px]">
        <div className="w-[940px] h-[22px] text-[14px] text-[#838894]">Home / Dashboard / <span className="font-[500] text-[14px] text-[#FFD60A]"> Courses</span> </div>
        <div className="text-[#F1F2FF] relative w-[940px] h-[38px] text-[20px] font-[500] ">My Courses</div>
      </div>
       <div className="h-[48px] w-[109px] rounded-[8px]  bg-[#FFD60A] shadow-[inset_-2px_-2px_0px_0px_#FFFFFF82] flex justify-center items-center text-[16px] font-[600]  text-[#161D29] relative top-[0px] right-[0px]"> New</div>
      </div>
      {/* <div ClassName=" w-[1073px] h-[54px]    flex jauftify-around bg-[#161D29] fixed" >
      <div className="w-[754px] h-[54px] flex justify-center items-center text-[#AFB2BF] text-[14px] font-[500]">COURSES</div>
      <div className="w-[602PX] h-[54px] flex justify-center items-center text-[#AFB2BF] text-[14px] font-[500]">DURATION</div>
       <div className="w-[602PX] h-[54px] flex justify-center items-center text-[#AFB2BF] text-[14px] font-[500]">PRICE</div>
       <div className="w-[602PX] h-[54px] flex justify-center items-center text-[#AFB2BF] text-[14px] font-[500]">ACTIONS</div>
      </div> */}
<div className="w-[1217px] h-[54px] pl-[40px] relative gap-[700px]  top-[250px] left-[250px] flex items-center ">
      {/* <div className=" pl-[60px] flex-col gap-[20px]">
        <div className="w-[940px] h-[22px] text-[14px] text-[#838894]">Home / Dashboard / <span className="font-[500] text-[14px] text-[#FFD60A]"> Courses</span> </div>
        <div className="text-[#F1F2FF] relative w-[940px] h-[38px] text-[20px] font-[500] ">My Courses</div>
      </div>
       <div className="h-[48px] w-[109px] rounded-[8px]  bg-[#FFD60A] shadow-[inset_-2px_-2px_0px_0px_#FFFFFF82] flex justify-center items-center text-[16px] font-[600]  text-[#161D29] relative top-[0px] right-[0px]"> New</div> */}
       <div> <div className="text-[#AFB2BF] text-[14px] font-[500] W-[1200px] h-[54px] mb-[50px]">COURSES</div></div>
      <div className="w-[280px] gap-[60px] flex">
        <div className="text-[#AFB2BF] text-[14px] font-[500] w-[102px] h-[54px]">DURATION</div>
       <div className="text-[#AFB2BF] text-[14px] font-[500]  w-[102px] h-[54px]">PRICE</div>
       <div className="text-[#AFB2BF] text-[14px] font-[500]  w-[102px] h-[54px]">ACTIONS</div>
      </div>
       
      </div>

          <div className="w-[1317px] h-full relative  top-[130px] left-[220px] flex items-center" >
                {
                  courses==null ? (<div>No Courses Found</div>):(<div className="flex-col"> {courses.map((ele)=>{
                  
                  return (
                    <div key={ele._id} className="h-[180px] w-[1073px] flex items-center ml-[70px]">
                     <img src={ele?.imageofcourse} className="w-[221px] h-[148px] rounded"></img>
                     <div className="flex-col w-[550px] h-[180px]  gap-[20px] pt-[20px] pl-[20px]">
                      <div className="font-[600] test-[20px] text-[#F1F2FF] h-[28px] w-[490px]">{ele.topic}</div>
                      <div className="font-[400] test-[14px] text-[#AFB2BF] h-[44px] w-[490px]">{ele.description}</div>
                        <div className=""> </div>
                      <div className={`${ele?.status=="Draft"?"text-[#F37290] w-[82px] h-[24px] rounded-xl":"text-[#E7C009] w-[95px] h-[24px]  rounded-xl"} bg-[#2C333F] mt-[30px] flex items-center gap-[4px] pl-[4px] justify-center`}>{ele?.status=="Draft"?(<FaRegClock size={10}/>):(<SiTicktick size={10}/>)}  <div >{ele?.status=="Draft"?(<p className="text-[#F37290] text-[12px] font-[500]">Drafted</p>):(<p className="text-[#E7C009] text-[12px] font-[500]">Published</p>)}</div></div>
                    
                     </div>
                     <div className="w-[102px] h-[180px] text-[#AFB2BF] flex items-center ">20h 10m</div>
                     <div className="w-[102px] h-[180px] text-[#AFB2BF] flex items-center">{ele.price}</div>
                      <div className="w-[102px] h-[180px] text-[#AFB2BF]  gap-[20px] flex items-center"><RiDeleteBin6Line onClick={()=>deletehandler(ele._id)}/><MdEdit onClick={()=>editcoursehandler(ele)}/></div>
                    </div>
                  )
                  
                })}</div>) 
                }
          </div>
      </div>
  
  )
}

export default Mycourse
