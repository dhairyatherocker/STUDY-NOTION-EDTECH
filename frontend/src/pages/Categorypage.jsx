import React,{useEffect,useState} from 'react'
import { useLocation } from 'react-router-dom'
import Coursecard from '../components/course/Coursecard'
import { getcategory } from '../services/categorycaller'
import { useSelector,useDispatch } from 'react-redux'
import CourseSlider from '../components/course/Courseslider'
// import { useSelector } from 'react-redux'

const Categorypage = () => {
    const dispatch=useDispatch();
    const [categorydata,setcategorydata]=useState(null);
    const [tab,settab]=useState("Most Popular")
    const {token}=useSelector((state)=>state.auth)
    const [button,setbutton]=useState("Most popular")
    const location=useLocation();
   
const fetchcategorydata=async()=>{
   const id=location.pathname.split("/").at(-1);
     console.log("category id  ",id);
      dispatch(getcategory(id,setcategorydata));
    
}
   useEffect(()=>{
     fetchcategorydata();
        console.log("categorydata",categorydata);
   },[])

  return (
    <div>
      <div className="w-full h-[340px] bg-[#2C333F]">
        <div className="relative left-[150px] top-[100px]">
          <div className=" text-[#838894]  w-full h-[50px] text-[16px] font-[500] ">Home  / catalog  /  <span className="text-[#FFD60A]">{location.pathname.split("/").at(-2)}</span></div>
            <div className="text-[30px] font-[600] text-[#F1F2FF]">{categorydata?.selectedCategory[0]?.category?.name}</div>
            <div className="text-[15px] font-[400] text-[#838894] mt-[20px]">{categorydata?.selectedCategory[0]?.category?.description}</div>
        </div>
      </div>

<div className="w-11/12 mx-auto">
  <div className="text-[30px] text-[#F1F2FF] font-[600] mt-[30px]">Courses to get you started</div>


<div>
  <div className="flex gap-[20px] mt-[20px] border-b-2  border-amber-50">
    <div onClick={()=>setbutton("Most Popular")} className={`flex justify-center z-[10] text-[15px] w-[130px] h-[40px] text-[#F1F2FF] ${button=="Most Popular"?"text-[#FFD60A]  border-b-4 border-[#FFD60A]":"text-[#F1F2FF]"}`}>Most Popular</div>
    <div  onClick={()=>setbutton("New")} className={`flex justify-center z-[10] text-[15px] w-[70px] h-[40px] text-[#F1F2FF] ${button=="New"?"text-[#FFD60A] border-b-4 border-[#FFD60A]":"text-[#F1F2FF]"}`}>New</div>
  </div>
  <div className="mt-[100px]">
    <CourseSlider content={categorydata?.selectedCategory
} />
  </div>
  
</div>


</div>


<div className="w-11/12 mx-auto">
  <div className="text-[30px] text-[#F1F2FF] font-[600] mt-[50px]">Top courses </div>
   <div className="mt-[100px]">
    <CourseSlider content={categorydata?.categoriesExceptSelected} />
  </div>
</div>

<div  className="w-11/12 mx-auto mt-[100px]">
  <div  className="text-[30px] text-[#F1F2FF] font-[600] mt-[0px] ml-[15px]">Frequently Bought</div>
  <div className="flex-wrap flex    w-10/12 mt-[40px] ml-[40px] gap-[50px]">
    {
    categorydata?.mostSellingCourses.map((course,index)=>{
      return (
 <Coursecard course={course} key={index}/>
      )
    })

  }
  </div>
  
</div>
    </div>
  )
}

export default Categorypage
