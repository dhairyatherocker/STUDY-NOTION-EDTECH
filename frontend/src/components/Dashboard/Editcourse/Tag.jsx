import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux';
import { ImCross } from "react-icons/im";
const Tag = ({name,label,register,errors,setValue,getValues}) => {
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
           setrequirementlist([...requirementlist, requirement]);
        }
        else {
          setrequirementlist([requirement]);
        }
           
            //setRequirement("");
        }
        console.log("requirement",requirement)
        console.log("list",requirementlist);
        setrequirement("")       
      
    }
    const onRemove=(index)=>{
        const updatelist=[...requirementlist];
        updatelist.splice(index,1)
        setrequirementlist(updatelist)
    }
    const handlekeydown=(e)=>{
 if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submit or newline
      onAdd();
    }
    }
  return (
    <div className="mx-auto h-[100px]">
      <label htmlFor={name} className="font-[400] text-[14px] text-[#F1F2FF]">Tags <sub className="text-[#EF476F] text-[14px] font-[400]">*</sub></label>
      <input 
        id={name}
        placeholder="enter Tags"
         value={requirement}
        onChange={(e)=>setrequirement(e.target.value)}
         className="pl-[5px] rounded shadow-[inset_0px_-3px_0px_0px_#FFFFFF2E] flex items-center w-[600px] min-h-[40px] justify-center gap-[5px] text-[#999DAA] bg-[#3f4455] transition-all duration-200 hover:bg-[#161D29]" 
         onKeyDown={handlekeydown}
      />
         {
          errors.name && (<div>please give tags</div>)
         }
          {  requirementlist.length>0 && (
            requirementlist.map((ele,index)=>{
                return (
                    <div className="rounded w-[100px]  min-h-[30px]  text-[12px] text-[#F1F2FF] items-center bg-[#3f4455] flex justify-between mt-[10px] " key={index}>
                        <div className="pl-[5px]">{ele}</div>
                          <ImCross onClick={()=>onRemove(index)}  className="relative top-[0px] right-[5px]"/>
                    </div>
                )
            })
          )
            
          }

    </div>
  )
}

export default Tag
