import React from 'react'
import RatingStars from "../common/RatingStars.jsx"
import { Link,Links } from 'react-router-dom'
const Coursecard = ({course}) => {

  function getaverage(ele){
    console.log("ele length",ele.length)
if(ele.length==0){
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
    <div className="w-[500px] h-[300px]">
      <Link to={`/course/${course._id}`}>
     <div className="w-[400px] h-[400px] ">
      <img src={course?.imageofcourse} className="h-[200px]  w-[400px] rounded-xl"/>
      <div className="w-[800px] h-[200px] mt-[20px]">
    <div className="text-[#F1F2FF] text-[17px] font-[500]">{course?.topic}</div>
    <div className="flex w-[800px] gap-[10px]">
        <div className="text-[#FFD60A]">{getaverage(course?.rating)}</div>
        <div><RatingStars Review_Count={getaverage(course?.rating)}   Star_Size={"25px"}/></div>
        <div className="text-[#AFB2BF]">{course?.rating.length}</div>
    </div>
    <div className="text-[#F1F2FF] mt-[10px]">Rs .{course?.price}</div>
      </div>
    </div>
</Link>
    </div>

   
  )
}

export default Coursecard
