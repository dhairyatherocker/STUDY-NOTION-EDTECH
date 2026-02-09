import React,{useEffect,useState,useRef} from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player'
const Coursevideo = () => {
const location=useLocation();
const {sectiondata,fullcoursedata,completedlectures}=useSelector((state)=>state.viewcourse);
const [url,seturl]=useState(null);
const [subsec,setsubsec]=useState(null);
const [ended,setended]=useState(false);
const playerRef=useRef(null);
const navigate=useNavigate();

function isfirstvideo(){
let sectionId=location.pathname.split("/").at(-3);
let subsectionId=location.pathname.split("/").at(-1);
const section=sectiondata.findIndex((state)=>state?._id===sectionId);
const subsection=sectiondata?.[section]?.subsections.findIndex((state)=>state._id===subsectionId);

console.log("is section ",section);
console.log("is subsection ",subsection);


if(section==0 && subsection==0){
  return true;
}
return false;

}

function markhandler(){

}
function rewatchhandler(){
  setended(false);
  playerRef.current.seek(0);
}
function islastvideo(){
let sectionId=location.pathname.split("/").at(-3);
let subsectionId=location.pathname.split("/").at(-1);
let index=subsec.findIndex((state)=>state._id===subsectionId)
console.log("islast",index);

if(index===(subsec.length-1)){
  return true;
}
return false;

}

function nextvideo(){
let subsectionId=location.pathname.split("/").at(-1);
let sectionId=location.pathname.split("/").at(-3);
const index=subsec.findIndex((state)=>state._id===subsectionId)
console.log("Index of next video",index);
const section=sectiondata.findIndex((state)=>state?._id===sectionId);
// const sectioncollect=sectiondata.filter((state)=>state?._id===sectionId);
// const subindex=sectioncollect?.[0]?.subsections.findIndex((state)=>state._id==subsectionId)
 let secId;
if(index!==subsec.length-1){
 
  sectiondata.forEach((section)=>{
    section?.subsections.forEach((subsections)=>{
     if (subsections._id===subsec?.[index+1]?._id){
      secId=section._id
     } 
    })
  })

  navigate(`/course/Dashboard/${fullcoursedata?._id}/section/${secId}/subsectionId/${subsec?.[index+1]?._id}`)
}

else{
  navigate(`/course/Dashboard/${fullcoursedata?._id}/section/${sectiondata?.[section+1]?._id}/subsectionId/${subsec?.[index+1]?._id}`)
}
}

function prevvideo(){
  let subsectionId=location.pathname.split("/").at(-1);
let sectionId=location.pathname.split("/").at(-3);
const index=subsec.findIndex((state)=>state._id===subsectionId)
console.log("Index of next video",index);
const section=sectiondata.findIndex((state)=>state?._id===sectionId);
// const sectioncollect=sectiondata.filter((state)=>state?._id===sectionId);
// const subindex=sectioncollect?.[0]?.subsections.findIndex((state)=>state._id==subsectionId)

if(index!==0){
  let secId;
  sectiondata.forEach((section)=>{
    section?.subsections.forEach((subsections)=>{
     if (subsections._id===subsec?.[index+1]?._id){
      secId=section._id
     } 
    })
  })

  navigate(`/course/Dashboard/${fullcoursedata?._id}/section/${secId}/subsectionId/${subsec?.[index-1]?._id}`)
}

else{
   navigate(`/course/Dashboard/${fullcoursedata?._id}/section/${sectiondata?.[section+1]?._id}/subsectionId/${subsec?.[index+1]?._id}`)
}
}

useEffect(()=>{
  setended(false);
let subsectionId=location.pathname.split("/").at(-1);
console.log("subsectionId in video",subsectionId);
let sectionId=location.pathname.split("/").at(-3);
console.log("sectionId in video",sectionId);
// let section=sectiondata.findIndex((state)=>state?._id==sectionId);
// console.log("section Index",section)
const section=sectiondata.filter((state)=>state?._id===sectionId);
console.log("section in finder",section);
const subsection=section?.[0]?.subsections.filter((state)=>state._id===subsectionId);
console.log("subsection in finder",subsection);
// let subsectionIndex=sectiondata?.[section].subsections((state)=>state._id==subsectionId);
seturl(subsection?.[0]);
console.log("video url in course video",url);

const sec = sectiondata.flatMap(section => section?.subsections || []);
setsubsec(sec);
// console.log("sec collection",subsec)
// isfirstvideo();

},[location.pathname,fullcoursedata,sectiondata]);





  return (
    <div className="w-[1092px] h-[545px] relative top-[100px] left-[100]">
{/* <ReactPlayer url={url?.videourl} /> */}
<ReactPlayer 
  url={url?.videourl} 
  controls={true}
  width="100%"
  height="100%"
  ref={playerRef}
  onEnded={()=>setended(true)}
>



</ReactPlayer>
<div>
{
  ended && (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 ">

    <div onClick={()=>{
      rewatchhandler();
    }} 
    className="mt-[20px] ml-[20px] w-[80px] h-[38px] bg-[#FFD60A] rounded-xl font-[500] text-[16px] text-[#000814] flex justify-center items-center">
           Rewatch
        </div>
 
 {
  !completedlectures.includes(url?._id) && (<div onClick={()=>{
      markhandler();
    }} 
    className="mt-[20px] ml-[20px] w-[200px] h-[38px] bg-[#FFD60A] rounded-xl font-[500] text-[16px] text-[#000814] flex justify-center items-center">
           Mark As Completed
        </div>
)
 }

{
  islastvideo && (
      <div onClick={()=>{
      nextvideo()
    }} 
    className="mt-[20px] ml-[20px] w-[80px] h-[38px] bg-[#FFD60A] rounded-xl font-[500] text-[16px] text-[#000814] flex justify-center items-center">
          Next
        </div>
  )
}

 
    </div>
  )
}
</div>
<div className="w-[757px] h-[214px] mt-[20px] ml-[20px]">
  <div className="text-[#F1F2FF] text-[24px] font-[600]  ">{url?.title}</div>
  <div className="mt-[20px] text-[14px] text-[#C5C7D4] font-[500]">{url?.description}</div>
</div>

    </div>
  )
}

export default Coursevideo
