import React,{useEffect,useState} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import Nestedview from './Nestedview.jsx';
import {toast} from "react-hot-toast"
import { setStep } from '../../../slices/Courseslice.jsx';
import Modal from './Modal.jsx';
import {useForm} from "react-hook-form"
import { MdFormatLineSpacing } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import { setEditCourse } from '../../../slices/Courseslice.jsx';
import Thumbnail from './Thumbnail.jsx';
import { getsectiondetails } from '../../../services/coursecaller.jsx';
import { createsection,updatesection,deletesection,deletesubsection } from '../../../services/coursecaller.jsx';
// import { useSelector } from 'react-redux'
const Step2 = () => {
   const {
      register,
      handleSubmit,
      setValue,
      getValues,
      formState:{errors}
    }=useForm();
   
    useEffect(()=>{
      
  // const allSubsections = course.section.flatMap(section =>(section.flatMap(subsections=>subsections || [])));
  // console.log("all subsections ",allSubsections);
 
// console.log("all subsections ",allSubsections);
    })
     const dispatch=useDispatch();
     const {course,editCourse}=useSelector((state)=>state.course)
     const {user}=useSelector((state)=>state.profile)
     const {token}=useSelector((state)=>state.auth)
    const [editsection,seteditsection]=useState(null);
    const [modal,setmodal]=useState(false);
    const [checkcontent,setcheckcontent]=useState(null);
const editsectionhandler=async(id)=>{
  console.log("id of section ",id)
  try{
seteditsection(id);
 const response=await getsectiondetails(token,id);
 console.log("responsw on edit section",response)
setValue("sectionname",response.data.response.title);}
catch(error){
  console.log(error);
}
}

function crosshandler(){
  setmodal(false);
}
    const sectionhandler=async()=>{
      const currentvalues=getValues();
   if(editsection){

    if(currentvalues.sectionname!=null){
      console.log("course id",course._id)
 dispatch(updatesection(currentvalues.sectionname,editsection,token,course._id));
  seteditsection(null);
  setValue("sectionname","");
    }
    
   }
   else{
    if(currentvalues.sectionname!=""){
      let title=currentvalues.sectionname;
       dispatch(createsection(title,course._id,token));
    }
    else {
      toast.error("please enter section name");
    }
   }
    }
    function subsectionmaker(){
           
    }
    function submithandler(){
   if(course.section.length>0){
    dispatch(setStep("3"))
   }
   else{
    toast.error("at least add one section");
   }
    }
    function addlecturehandler(id){
     seteditsection(id);
     setmodal(true);
    }
    function updatesubsectionhandler(id){
    let allSubsections = (course?.section || []).flatMap(
  section => section?.subsections || []
);
let particularsub=allSubsections.filter((prev)=>prev._id==id);
setcheckcontent(particularsub);
console.log("content",checkcontent)
setmodal(true);
    }

    function deletesectionhandler(id){
      dispatch(deletesection(id,course._id,token))
    }
    function deletesubsectionhandler(id){
      dispatch(deletesubsection(id,course._id,token))
    }

    function backhandler(){
    dispatch(setEditCourse(course._id));
    dispatch(setStep("1"));
    }
  return (
    <div className="w-[665px] min-h-[228px] bg-[#161D29] ml-[100px] mt-[50px] relative z-1 pt-[20px] rounded-md pl-[20px]">
    <div className="text-[#F1F2FF] text-[24px] font-[600] ">Course Builder</div>
    <form onSubmit={handleSubmit(submithandler)}>
    <div className="mt-[20px]">
       <input 
      id="sectionname"
      type="text"
      placeholder="Add a section to build your course"
      {...register("sectionname",{required:true})}
      className="w-[617px] h-[48px] bg-[#2C333F] text-[#999DAA] rounded-md pl-[10px] shadow-[inset_0_-1px_0_0_rgba(255,255,255,0.18)]"
     />
    </div>
    <div onClick={sectionhandler} className=" mt-[30px] w-[188px] h-[48px] bg-[#161D29] rounded-md border-1 justify-center border-[#FFD60A] font-[500] text-[16px] flex items-center gap-[10px] text-[#FFD60A]" ><IoAddCircleOutline className="text-[#FFD60A] h-[18px] w-[18px] font-[500]" size={"18px"} /> {editsection?("Edit section name"):("Create Section")}</div>

      <div>
    {course.section.length>0 && (<Nestedview editsectionhandler={editsectionhandler} setmodal={setmodal} addlecturehandler={addlecturehandler} updatesubsectionhandler={updatesubsectionhandler} deletesectionhandler={deletesectionhandler} deletesubsectionhandler={deletesubsectionhandler}/>)}
      </div>
<div>
  {
  modal && (
    <Modal  checkcontent={checkcontent} crosshandler={crosshandler} editsection={editsection}/>
  )
  }
</div>
<div className="flex gap-[20px] mt-[30px] ml-[380px] mb-[10px]">
<div onClick={backhandler} className="h-[48px] w-[112px] rounded-[8px]  bg-[#2C333F]  flex justify-center items-center text-[16px] font-[600]  text-white relative top-[0px] right-[0px] shadow-[inset_0_-2px_0_0_rgba(255,255,255,0.18)]">Back</div>

<div onClick={submithandler} className="  h-[48px] w-[108px] rounded-[8px]  bg-[#FFD60A] shadow-[inset_0_-2px_0_0_rgba(255,255,255,0.18)] flex justify-center items-center text-[16px] font-[600]  text-[#161D29] relative top-[0px] right-[0px]">
  Next
</div>

</div>
 


    </form>
      
     
    </div>
  )
}

export default Step2
