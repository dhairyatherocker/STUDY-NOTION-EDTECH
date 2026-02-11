import React,{useEffect,useState} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import Nestedview from './Nestedview.jsx';
import {toast} from "react-hot-toast"
import { setStep } from '../../../slices/Courseslice.jsx';
import Modal from './Modal.jsx';
import {useForm} from "react-hook-form"
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
    <div className="w-[665px] min-h-[228px] bg-[#2C333F] ml-[100px] mt-[50px] relative z-1">
    <div className="text-[#F1F2FF] text-[24px] font-[600]">Course Builder</div>
    <form onSubmit={handleSubmit(submithandler)}>
    <div className="">
       <input 
      id="sectionname"
      type="text"
      placeholder="Add a section to build your course"
      {...register("sectionname",{required:true})}
      className="w-[617px] h-[48px] bg-[#5f5f62]"
     />
    </div>
    <button onClick={sectionhandler} className="" >{editsection?("Edit section name"):("Create Section")}</button>

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

<button onClick={submithandler} className="h-[48px] w-[544px] rounded-[8px]  bg-[#FFD60A] shadow-[inset_-2px_-2px_0px_0px_#FFFFFF82] flex justify-center items-center text-[16px] font-[600]  text-[#161D29] relative top-[0px] right-[0px]">
  Next
</button>

 <div onClick={backhandler} className="h-[48px] w-[444px] rounded-[8px]  bg-[#2C333F] shadow-[inset_0px_0px_0px_0px_#FFFFFF] flex justify-center items-center text-[16px] font-[600]  text-white relative top-[0px] right-[0px]">back</div>
    </form>
      
     
    </div>
  )
}

export default Step2
