import React,{useEffect,useState} from 'react'
import Lecture from './Lecture'
import { useDispatch,useSelector } from 'react-redux';
import { RxCross1 } from "react-icons/rx";
import { createsubsection,updatesubsection } from '../../../services/coursecaller';
import {useForm} from "react-hook-form"
const Modal = ({crosshandler,editsection,checkcontent}) => {
  const {token}=useSelector((state)=>state.auth);
  const {course}=useSelector((state)=>state.course);

  const dispatch=useDispatch();
   const {
      register,
      handleSubmit,
      setValue,
      getValues,
      formState:{errors}
    }=useForm();
useEffect(()=>{
if(checkcontent){
console.log("content",checkcontent[0])
  setValue("lecturevideo",checkcontent[0].videourl);
  setValue("lecturetitle",checkcontent[0].title);
  setValue("lecturedesc",checkcontent[0].description);

}
else {
  console.log("empty");
}
})
const subsectionhandler=()=>{
const currentvalues=getValues();
if(checkcontent){
  console.log("id of check",checkcontent[0]._id);
  console.log("check content course id",course._id);
  console.log("lectue title  ",currentvalues.lecturevideo);
 dispatch(updatesubsection(checkcontent._id,currentvalues.lecturetitle,currentvalues.lecturedesc,currentvalues.lecturevideo,token,course._id));

}
else{
  console.log("lectue title  ",currentvalues.lecturevideo);
  dispatch(createsubsection(editsection,currentvalues.lecturetitle,currentvalues.lecturedesc,currentvalues.lecturevideo,token,course._id));
}

}

  return (
    <div className="w-[665px] h-[780px] bg-[#161D29] flex-col gap-[20px] absolute z-10 top-[0px] rounded">
<div className="w-[665px] h-[58px] bg-[#424854] flex justify-between items-center pl-[20px] pr-[10px] rounded">
  <div className="text-[#FFFFFF] text-[20px] font-[600]">Editing Lecture</div>
<RxCross1 onClick={crosshandler} size={18} className="text-black font-[500]" />
</div>
<form className="pl-[40px] pt-[10px] w-[500px] h-[300px] flex-col gap-[10px]">
      <div className="w-[601px] h-[418px]">
           <Lecture label={"lecturevideo"} register={register} setValue={setValue} getValues={getValues}/>
      </div>

      <div className="w-[601px] h-[76px] flex-col gap-[10px]">
     <label htmlFor='lecturetitle' className="font-[400] text-[14px] text-[#F1F2FF]">Lecture Title <sub className="text-[#EF476F] text-[14px] font-[400]">*</sub></label>
      <input
        id="lecturetitle"
        placeholder="Please enter lecture title"
        {...register("lecturetitle",{required:true})}
        className="pl-[5px] rounded shadow-[inset_0px_-3px_0px_0px_#FFFFFF2E] flex items-center w-[601px] h-[48px] justify-center gap-[5px] text-[#999DAA] bg-[#3f4455] transition-all duration-200 hover:bg-[#161D29]"
      />
      {errors.lecturetitle && (<span>please enter lecture title</span>)}
      </div>

      <div  className="w-[601px] h-[108px] flex-col gap-[10px]">
 <label htmlFor='lecturedesc' className="font-[400] text-[14px] text-[#F1F2FF]">Lecture description <sub className="text-[#EF476F] text-[14px] font-[400]">*</sub></label>
      <textarea
        id="lecturedesc"
        placeholder="Please enter lecture description"
        {...register("lecturedesc",{required:true})}
        className="pl-[5px] rounded shadow-[inset_0px_-3px_0px_0px_#FFFFFF2E] flex items-center w-[601px] h-[108px] justify-center gap-[5px] text-[#999DAA] bg-[#3f4455] transition-all duration-200 hover:bg-[#161D29]"
      />
      {errors.lecturedesc && (<span>please enter lecture description</span>)}
   
      </div>

      <div className="w-[600px] flex pl-[400px] top-[40px] relative gap-[20px]">
        <div onClick={crosshandler} className="h-[48px] w-[444px] rounded-[8px]  bg-[#2C333F] shadow-[inset_0px_0px_0px_0px_#FFFFFF] flex justify-center items-center text-[16px] font-[600]  text-white relative top-[0px] right-[0px]">Cancel</div>
        <div onClick={subsectionhandler} className="h-[48px] w-[544px] rounded-[8px]  bg-[#FFD60A] shadow-[inset_-2px_-2px_0px_0px_#FFFFFF82] flex justify-center items-center text-[16px] font-[600]  text-[#161D29] relative top-[0px] right-[0px]">Save Edits</div>
      </div>
    </form>

    </div>
    
  )
}

export default Modal
