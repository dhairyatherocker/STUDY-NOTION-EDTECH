// import React,{useEffect,useState} from 'react'
// import { allcourses } from '../services/coursecaller';
// import { useDispatch } from 'react-redux';
// import RatingStars from '../components/common/RatingStars';
// import { FaRupeeSign } from "react-icons/fa";
// const Allcourses = ({particularId}) => {
// const dispatch=useDispatch();
// const [course,setcourse]=useState([]);

// function filteredcourse(){
// }

// const getallcourses=async()=>{
// try{

// const response=await allcourses();
// // console.log("allcourses",allcourses);

// setcourse(response);
// console.log("response of fuck courses",response);
// filteredcourse();
// }
// catch(error){
// console.log(error);
// }

// }
// useEffect(()=>{
// if (particularId.length > 0 && course.length > 0) {
//     const filtered = course.filter(courses =>
//       particularId.includes(courses._id)
//     );
//    console.log("filtered course",filtered);
//     setcourse(filtered);}  

// },[particularId,course]);
// useEffect(()=>{
// getallcourses();
 
// },[])

// function getaverage(ele){
//     console.log("ele length",ele.length)
// if(ele.length==0){
//     return 0;
// }
// else {
//     let users=0;
//     let rate=0;
//     ele.forEach((rating)=>{
//       users++;
//      rate=Number(rate)+Number(rating?.rated)
//     })
//     console.log("users",users);
//     console.log("rating stars",rate)
//     return Number(rate/users);
// }
// }



// }

// export default Allcourses
import React from "react";
import RatingStars from "../components/common/RatingStars";
import { FaRupeeSign } from "react-icons/fa";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const Allcourses = ({ course }) => {

  function getaverage(ratings = []) {
    if (ratings.length === 0) return 0;
    const total = ratings.reduce((acc, r) => acc + Number(r.rated), 0);
    return (total / ratings.length).toFixed(1);
  }

useEffect(()=>{
  console.log("filtered course full detail",course);
},[course]);
  
  
    return (
    <div className="w-[1217px] h-full bg-[#000814]">
      <div className="w-[1217px] h-[120px] relative left-[270px] top-[100px]">
        <div className="w-[1073px] h-[22px] font-[400] text-[14px] text-[#838894]">
            Home / Dashboard / <span className="font-[500] text-[14px] text-[#FFD60A]">Courses</span>
        </div>
        <div className="w-[1073px] h-[38px] text-[30px] font-[500] text-[#F1F2FF] mt-[20px]">
        
            Courses You may like</div>
      </div>


    <div className="w-[1217px] h-full flex flex-wrap relative left-[200px] top-[150px] gap-[20px] pl-[70px]">
     

        {
            course.map((ele)=>{
                return (
                    <Link to={`/course/${ele?._id}`}  key={ele?._id} >

                          <div  className="w-[350px] h-[250px]">
                   <div className="w-[300px] h-[150px] rounded-md"><img src={ele?.imageofcourse} className="w-[300px] h-[150px] rounded-md"/></div>
                   <div className="pt-[10px]">
                    <div className="font-[500] text-[16px] text-[#F1F2FF] ">{ele?.topic}</div>
                    <div className="flex gap-[10px] mt-[5px]">
                        <div className="text-[#FFD60A]">{getaverage(ele?.rating)}</div>
                        <div><RatingStars Review_Count={getaverage(ele?.rating)} /></div>
                    </div>
                    <div className="w-[350px] flex items-center gap-[5px] text-[#F1F2FF]"><FaRupeeSign/> <p>{ele?.price}</p> </div>
                   </div>
                </div>
                    </Link>
                 
                )
               
            })
        }
    </div>

    </div>
  )
  
};

export default Allcourses;

