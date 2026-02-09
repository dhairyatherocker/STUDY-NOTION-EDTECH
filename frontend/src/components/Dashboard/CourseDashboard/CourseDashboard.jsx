import React,{useEffect,useState} from 'react'
import CourseSidebar from './CourseSidebar'
import { useDispatch ,useSelector} from 'react-redux'
import { Outlet, useParams } from 'react-router-dom';
import StarRating from './Starrating';
import { useLocation } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component'
import { givingrating } from '../../../services/ratingcaller';
import { getcoursedetails } from '../../../services/coursecaller'
import { RxCross2 } from "react-icons/rx";
import { setfullcourse,settotallectures,setcompletedlectures,updatecompletedlectures,setsectiondata } from "../../../slices/Coursedetailsslice"
const CourseDashboard = () => {
const location=useLocation();
const [modal,setmodal]=useState(false);
 const [rating, setRating] = useState(0);
 const [reviewfield,setreviewfield]=useState("");

// const [Rating,setRating]=useState("1")
const dispatch=useDispatch();
const {user}=useSelector((state)=>state.profile);
const {token}=useSelector((state)=>state.auth)
const {totallectures,sectiondata,fullcoursedata}=useSelector((state)=>state.viewcourse);
async function initialhandler(){
let courseId=location.pathname.split("/").at(-5);
let sectionId=location.pathname.split("/").at(-3);
let subsectionId=location.pathname.split("/").at(-1);

try{
let result=await getcoursedetails(courseId);
console.log("course result in dashbord",result);

dispatch(setfullcourse(result?.data?.Course));
let lectures=0;
 result?.data?.Course?.section.forEach((section)=>{
       lectures+=section?.subsections.length || 0
    });
    // console.log("userId",user._id)
   console.log("lectures in coursecdashboard",lectures)
dispatch(settotallectures(lectures));
console.log("sectiondata printing",result?.data?.Course?.section)
dispatch(setsectiondata(result?.data?.Course?.section));

let userProgress = result?.data?.Course?.courseprogress?.filter(
  (progress) => progress.userId === user?._id
);

console.log("userprogress in dash",userProgress);
// Get completed videos or empty array if none
const completedVideos = userProgress?.[0]?.completedvideos || [] ;

console.log("completed videos", completedVideos);
dispatch(setcompletedlectures(completedVideos));
//  console.log("totallectures in course dashboard",totallectures);
    console.log("sectiondata in course dashboard",sectiondata);
    console.log("fullcoursedata in course dashboard",fullcoursedata);
  
}

catch(error){
console.log("error while fetching course details in dashboard",error)
}

}


useEffect(()=>{
// const {courseId}=useParams();
console.log("user data",user)
initialhandler();

},[])


const ratingChanged = (newRating) => {
  console.log(newRating);
};


function reviewhandler(){
 let courseId=location.pathname.split("/").at(-5);
 if(reviewfield==null || rating==0){
  toast.error("please enter all the fields")
 }
 dispatch(givingrating(rating,reviewfield,token,courseId));

}

  return (
    <div className="w-full h-full bg-[#000814] flex">
      
<div className="w-[300px]">
<CourseSidebar setmodal={setmodal}/>
</div>

<div className="w-[1092px] h-full">
    <Outlet/>
</div>

{
  modal && (

    <div className="w-[665px] h-[487px] absolute z-[10]  top-[100px] left-[400px]">
      <div className="w-[665px] h-[58px] bg-[#2C333F] flex justify-between items-center border-b-2 rounded-t-xl">
       <div className="text-[#F1F2FF] font-[600] text-[18px] ml-[20px] ">Add Review</div>
          <RxCross2 onClick={()=>setmodal(false)} className="text-[#F1F2FF] mr-[20px]"/>
      </div>
      <div className="w-[665px] h-[429px] bg-[#161D29] flex-col">
<div className="flex-col gap-[20px] ml-[205px] pt-[40px]">
<div className="flex gap-[20px]"><img src={user?.image} className="h-[52px] w-[52px] rounded-full"/>
  <div className="text-[#F1F2FF] text-[16px] font-[600] ">
    <p>{user?.firstname} {user?.lastname}</p>
    <p className="font-[400] text-[14px] text-[#F1F2FF]">posting publicly</p>
  </div></div>
  </div>
  <div className="ml-[210px] mt-[20px]">
     
        <StarRating 
        rating={rating} 
        onRatingChange={setRating} 
      />
  </div>
<div className="flex-col gap-[10px] pl-[30px] mt-[20px]">
<div className="font-[400] text-[14px] text-[#F1F2FF]">Add your experience <span className="text-[#EF476F] text-[14px] font-[400]">*</span></div>
    <textarea className="w-[601px] h-[139px] mt-[10px] bg-[#424854] rounded-md text-[#999DAA] text-[16px] font-[500] pl-[20px] pt-[10px]" placeholder="Share Details of your own experience for this course"
      name="reviewfield"
      value={reviewfield}
      onChange={(e)=>{setreviewfield(e.target.value)
       console.log("reviewfield",reviewfield)}}
    />
</div>

<div className="w-[665px] h-[180px] flex ml-[350px] mb-[10px]">
          <div onClick={()=>setmodal(false)} className="mt-[20px] ml-[20px] w-[101px] h-[48px] bg-[#2C333F] rounded-md font-[500] text-[16px] text-[#F1F2FF] flex justify-center items-center">
           Cancel 
        </div>
     <div onClick={()=>reviewhandler()} className="mt-[20px] ml-[20px] w-[128px] h-[48px] bg-[#FFD60A] rounded-md font-[500] text-[16px] text-[#000814] flex justify-center items-center">
           Save Edits
        </div>
</div>

      </div>
    </div>
  )
}
    </div>
  )
}

export default CourseDashboard
