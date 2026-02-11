import React,{useEffect,useState} from 'react'
import { Link,Links } from 'react-router-dom'
import { getcoursedetails } from '../../services/coursecaller';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RatingStars from '../common/RatingStars';
import { settotalcourses } from '../../slices/cartslice';
import { RiGlobalLine } from "react-icons/ri";
// import { buycourse } from '../../services/coursecaller';
import { FaBuildingCircleArrowRight } from "react-icons/fa6";
import Coursereviews from '../reviews.jsx/Coursereviews';
import { FiMousePointer } from "react-icons/fi";
import { GrCompliance } from "react-icons/gr";
import { setfullcourse,setcompletedlectures,settotallectures,updatecompletedlectures } from '../../slices/Coursedetailsslice';
import { CiClock1 } from "react-icons/ci";
import { useLocation } from 'react-router-dom';
import { HiComputerDesktop } from "react-icons/hi2";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import Footer from '../common/Footer.jsx';
import { buyCourse } from '../../services/paymentcaller.jsx';
const Coursepage = () => {
const location=useLocation();
const dispatch=useDispatch();
const {token}=useSelector((state)=>state.auth)
const {user}=useSelector((state)=>state.profile)
const [details,setdetails]=useState(null);
const [viewsection,setviewsection]=useState([]);
const [viewsubsection,setviewsubsection]=useState([]);
const [benefits,setbenefits]=useState();
const [id,setid]=useState([]);
const navigate=useNavigate();
// count [lectures,setlectures]
// cont [sectiondata,setsectiondata]=useState([]);
// const {user}=useSelector((state)=>state.profile);
function buycaller(){
  const uniqueCourses = [...new Set(id)];
  dispatch(buyCourse(uniqueCourses,token,user,navigate,dispatch));
}
async function coursecaller(){

try{
const response=await getcoursedetails(location.pathname.split("/").at(-1));
console.log("reposne on coursecaller",response);
setdetails(response?.data?.Course);
dispatch(setfullcourse(response.data.Course));
setid(prev => [...new Set([...prev,response.data.Course._id])]);
console.log("details ",details)
}
catch(error){
console.log("error while coursecaller",error);
}
}
  useEffect(()=>{
   coursecaller();
  
   for(let i=0;i<details?.benefits.size();i++){
   if(benefits.length==0){
  setbenefits(details?.benefits?.[i])
   }
   else{
    setbenefits([...benefits,details?.benefits?.[i]]);
   }
   }
  },[])
  function carthandler(){
    dispatch(settotalcourses(details))
  }
  function countlectures(data){
    let lectures=0;
    details?.section.forEach((section)=>{
       lectures+=section?.subsections.length || 0
    })
    return lectures;
  }
  function sechandler(id){
    if(viewsection.includes(id)){
      return true;
    }
    return false;
  }
 function subhandler(id){
    if(viewsubsection.includes(id)){
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
  function setsubhandler(id){
   if(viewsubsection.includes(id)){
    setviewsubsection(viewsubsection.filter((ele) => ele !== id));
    }
 else if(viewsubsection.length>0){
    setviewsubsection([...viewsubsection,id])
   }
   else{
    setviewsubsection(id);
   }
  }
  function collapsehandler(){
    setviewsection([]);
    setviewsubsection([]);
  }
  function getaverage(ele){
    // console.log("ele length",ele.length)
if(ele==null){
return 0;
}
else if(ele.length==0 || ele==null){
    return 0;
}
else {
    let users=0;
    let rate=0;
    ele.forEach((rating)=>{
      users++;
     rate=Number(rate)+Number(rating?.rated)
    })
    console.log("users",users);
    console.log("rating stars",rate)
    return Number(rate/users);
}
}
  return (
    <div className="w-full h-full">
      <div className="bg-[#161D29] w-full h-[400px]">
            <div className="w-[768px] h-[354px] relative top-[100px] flex-col gap-[20px] ml-[180px]">
            <div className="text-[#838894]  h-[22px] text-[14px] font-[400] w-[354px]">Home / Learning / <span className="text-[#FFD60A]">{details?.category?.name}</span></div>
            <div className="w-[768px] h-[76px] text-[#F1F2FF] text-[30px] font-[500] mt-[10px]">{details?.topic}</div>
            <div className="w-[768px] h-[26px] text-[#999DAA] text-[14px] font-[400]">{details?.description}</div>
            <div className="w-[768px] h-[26px] flex gap-[10px] items-center mt-[10px]">
            <div className="flex gap-[10px] mt-[10px]">
              <div className="text-[18px] font-[600] text-[#E7C009]">{details?.rating?.length }</div>
              
              <div><RatingStars Review_Count={getaverage(details?.rating)}  Star_Size={"25"}/></div>
            </div>
            <div className="text-[16px] text-[#DBDDEA] font-[400] ">({details?.rating?.length} ratings)</div>
            <div className="text-[16px] text-[#DBDDEA] font-[400]">{details?.studentsenrolled?.length} students</div>
          
            </div>
            <Link><div className="text-[#DBDDEA] text-[16px] mt-[10px]">Created by {details?.teacher?.firstname} {details?.teacher?.lastname}</div></Link>
            <div className="text-[#DBDDEA] text-[16px] flex gap-[10px] mt-[10px]">
              <div>Created at {details?.createdAt}</div>
              <div className="flex gap-[4px] items-center">
               <RiGlobalLine/>
                <div>{details?.language}</div>
              </div>
            </div>
            </div>
      </div>

      <div>
<div className="w-[792px] h-[326px] text-[]  relative top-[40px] left-[40px]">
  <div  className="w-[792px] h-[206px] border-1 border-[#2C333F] text-[] pl-[50px] pt-[30px] mt-[0px] ml-[25px]">
    <div className="w-[728px] h-[68px] text-[#F1F2FF] text-[30px] font-[500]">What you will learn</div>
    <div className="mt-[20px]">
      {
        details?.benefits.map((ele,index)=>{
           const text = typeof ele === 'string' ? ele : String(ele);
    // Remove brackets and quotes if they exist
    const cleanText = text.replace(/[\[\]"]+/g, '');
          return (<div className="text-[14px] text-[#C5C7D4]" key={index}>
          {cleanText}
          </div>)
        })
      }
    </div>
   
  </div>
    {/* course section  */}
    <div className="w-[800px] ml-[30px] mt-[50px]">
<div className="w-[800px] h-[62px] flex-col gap-[10px] ">
  <div className="text-[#F1F2FF] text-[24px] font-[600]">
    Course content
  </div>
  <div className="w-[800px] h-[22px] text-[#C5C7D4] flex gap-[20px] mt-[10px]">
    <div className="w-[400px] h-[22px] text-[14px] font-[400] text-[#C5C7D4] ">{details?.section.length} sections .{countlectures(details?.section)} lectures  </div>
    <div onClick={()=>collapsehandler()}  className="w-[478px] h-[22px] text-[#FFD60A] flex-end text-[14px] font-[500] flex-end pl-[260px]">Collapse all sections</div>
  </div>
</div>

<div className="w-[803px] border-1 border-[#424854] mt-[20px]">
  {
    details?.section.map((ele)=>{
    
      return (
        <div  key={ele._id} className="border-1 border-[#424854]">
          <div  onClick={()=>setsechandler(ele._id)} className=" pl-[10px] w-[800px] h-[52px] flex items-center bg-[#2C333F]"><div className="w-[20px] flex-start h-[22px] text-[#F1F2FF] ">{sechandler(ele._id)?(<IoIosArrowUp className="pt-[4px] text-[20px] text-[#999DAA]" />):(<IoIosArrowDown className="pt-[4px] text-[20px] text-[#999DAA]"/>)}</div> <div className="text-[#F1F2FF] flex-start font-[500] text-[14px] w-[500px] h-[22px] pl-[5px]">{ele.title}</div> <div className="ml-[150px] text-[14px] font-[400] text-[#FFD60A] w-[66px] h-[22px]">{ele.subsections.length} lectures</div></div>
          <div className="w-[800px] bg-[#000814]">
            {
              sechandler(ele._id) && (
                <div className="w-[800px] bg-[#000814]">
                  {
                    ele?.subsections.map((sub)=>{
                      return (
                        <div key={sub._id} onClick={()=>setsubhandler(sub._id)} className="w-[728px] mx-auto mt-[20px] mb-[20px]">
                          <div className="text-[14px] font-[500] flex gap-[20px]">
                          <div><HiComputerDesktop className="text-[#F1F2FF] relative top-[3px]"/></div>
                          <div className="text-[14px] font-[500] text-[#F1F2FF]"> {sub.title}</div>
                          <div>{subhandler(ele._id)?(<IoIosArrowUp className="pt-[4px] text-[20px] text-[#999DAA]" />):(<IoIosArrowDown className="pt-[4px] text-[20px] text-[#999DAA]"/>)}</div>
                           
                          </div>
                          
                         <div>
                          {
                            subhandler(sub._id) && (
                              <div className="text-[#C5C7D4] text-[14px] font-[400] pl-[30px] mt-[10px]">
                                {sub.description}
                              </div>
                            )
                          }
                         </div>
                        
                        </div>
                      )
                    })
                  }
                </div>
              )
            }
          </div>
          <div></div>
        </div>
      )
    })
  }
</div>


    </div>
   <div className=" relative mt-[100px] ml-[25px]  w-[792px] h-[152px] flex-col gap-[20px]">
  <div className="text-white text-[20px] font-semibold">Author</div>
  <div className="w-[792px] h-[52px] flex items-center gap-[20px] mt-[20px]">
    <div><img src={details?.teacher?.image} className="w-[52px] h-[52px] rounded-full"/></div>
    <div className="font-[500] text-[16px] text-[#F1F2FF]">{details?.teacher?.firstname} {details?.teacher?.lastname}</div>
  </div>
  <div className="w-[792px] h-[44px] font-[400] text-[14px] text-[#C5C7D4] mt-[20px]">{details?.teacher?.email}</div>
</div>
</div>
{/* buy section  */}
<div>

  <div className="w-[384px] h-[669px] bg-[#2C333F] rounded-xl relative bottom-[640px] left-[900px]">
<div>

  <img src={details?.imageofcourse} className="w-[384px] h-[201px] rounded-xl"/>
</div>

<div className="w-[336px] h-[38px] text-[#F1F2FF] text-[30px] font-[700] pl-[25px] mt-[15px] mx-auto">
 Rs. {details?.price}
</div>
<div className="w-[336px] h-[142px] mx-auto flex-col gap-[20px]">
  <div onClick={()=>carthandler()} className=" h-[48px] w-[336px] rounded-[8px]  bg-[#FFD60A] shadow-[inset_-2px_-2px_0px_0px_#FFFFFF82] flex justify-center items-center text-[16px] font-[500]  text-[#161D29] relative top-[40px] right-[0px]">Add to Cart</div>
  <div onClick={()=>buycaller()}  className="mt-[20px] h-[48px] w-[336px] rounded-[8px]  bg-[#161D29] shadow-[inset_-2px_-2px_0px_0px_#404650] flex justify-center items-center text-[16px] font-[500]  text-[#F1F2FF] relative top-[40px] right-[0px]">Buy now</div>
  <div className="text-[14px] font-[400] text-[#DBDDEA] mt-[50px] ml-[60px]">30-Day Money-Back Guarantee</div>
</div>
<div className="w-[336px] h-[144px] mt-[80px] ml-[30px] flex-col gap-[10px] ">
<div className="text-[16px] font-[500] text-[#F1F2FF] pb-[20px]">
  This course includes:
</div>
<div className="text-[14px] font-[500] text-[#06D60A] flex gap-[10px] w-[336px] h-[22px] items-center "><CiClock1 /><p> 8 hours on-demand video</p></div>
<div className="text-[14px] font-[500] text-[#06D60A] flex gap-[10px] w-[336px] h-[22px] mt-[5px] items-center"><FiMousePointer /><p> Full Lifetime access</p></div>
<div className="text-[14px] font-[500] text-[#06D60A] flex gap-[10px] w-[336px] h-[22px]  mt-[5px]  items-center"><FaBuildingCircleArrowRight/><p> Access on Mobile and TV</p></div>
<div className="text-[14px] font-[500] text-[#06D60A] flex gap-[10px] w-[336px] h-[22px] mt-[5px]  items-center"><GrCompliance /><p> Certificate of completion</p></div>
</div>
  </div>
</div>
    <div className=""><Coursereviews details={details}/></div>
      </div>
 <Footer/>
    </div>
  )
}

export default Coursepage
