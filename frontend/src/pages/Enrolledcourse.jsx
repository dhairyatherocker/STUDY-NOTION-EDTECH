import React,{useState,useEffect} from 'react'
import {toast} from "react-hot-toast"
import Navcourse from '../components/Dashboard/course/Navcourse'
import { useSelector,useDispatch } from 'react-redux'
import { getenrolledcourse } from '../services/coursecaller'
const Enrolledcourse = () => {
const {token}=useSelector((state)=>state.auth)
const [course,setcourse]=useState(null);
const [coursedata,setcoursedata]=useState(null);
const {loading}=useSelector((state)=>state.auth);
const getcourses=async()=>{
try{
const response=await getenrolledcourse(token);
console.log("response of course progress", response)
setcourse(response.courses);

setcoursedata(response.courseprogress);
}
catch(error){
console.log("error in enrolled corse",error);
}
}

useEffect(()=>{
getcourses();
},[]);




  return (
    <div className="flex justify-center items-center w-[1217px] h-[700px] ml-[100px]">
      
      {
        loading?(<div className="bg-white text-[20px] font-bold">Loading ...</div>):(<div>
          {
            course?(<div>
              <Navcourse course={course} coursedata={coursedata}/>
            </div>):(<div className="text-white text-[20px] font-bold">
              NO Courses Found
            </div>)
          }
        </div>)
      }


    </div>
  )
}

export default Enrolledcourse
