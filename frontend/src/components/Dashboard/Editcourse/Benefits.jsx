import React,{useState,useEffect} from 'react'
import { ImCross } from "react-icons/im";
import { useSelector } from 'react-redux';
const Benefits = ({name,label,register,errors,setValue,getValues}) => {
    const [requirement,setrequirement]=useState("")
    const [requirementlist,setrequirementlist]=useState([]);
     const {course,editCourse}=useSelector((state)=>state.course)
    useEffect(()=>{
       register(name,{required:true})
      
     
    },[])
    useEffect(()=>{
   setValue(name,requirementlist)
    },[requirementlist])

    const onAdd=()=>{
       if(requirement) {
        if(requirementlist.length>0){
            setrequirementlist([...requirementlist, requirement]);}
          else {setrequirementlist([requirement])}
            //setRequirement("");
        }
        console.log("benefitsr",requirement)
        console.log("benefits",requirementlist);
        setrequirement("")       
      
    }
    const onRemove=(index)=>{
        const updatelist=[...requirementlist];
        updatelist.splice(index,1)
        setrequirementlist(updatelist)
    }
//     const handlekeydown=(e)=>{
//  if (e.key === "Enter") {
//       e.preventDefault(); // Prevent form submit or newline
//       onAdd();
//     }
//     }
  return (
    <div>
      <label htmlFor={name} className="font-[400] text-[14px] text-[#F1F2FF]">Benefits <sub className="text-[#EF476F] text-[14px] font-[400]">*</sub></label>
      <input 
        id={name}
        placeholder="enter benefits"
        value={requirement}
        onChange={(e)=>setrequirement(e.target.value)}
         className="pl-[5px] rounded shadow-[inset_0px_-3px_0px_0px_#FFFFFF2E] flex items-center w-[600px] min-h-[40px] justify-center gap-[5px] text-[#999DAA] bg-[#3f4455] transition-all duration-200 hover:bg-[#161D29]" 
        
      />
      {errors.name && (<div>please enter the benefits</div>)}
<div onClick={onAdd} className="text-[18px] font-[700] text-[#FFD60A] mt-[10px]">ADD</div>
   
          {  requirementlist.length>0 && (
            requirementlist.map((ele,index)=>{
                return (
                    <div className="rounded min-w-[100px] max-w-[200px] min-h-[20px] max-h-[50px] text-[12px] text-[#F1F2FF] items-center bg-[#3f4455] flex justify-between mt-[10px] " key={index}  >
                        <div className="pl-[5px]">{ele}</div>
                          <ImCross onClick={()=>onRemove(index)} size={12} className="relative top-[0px] right-[5px]"/>
                    </div>
                )
            })
          )
            
          }

    </div>
  )
}

export default Benefits

