import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import { TiTick } from "react-icons/ti";
const Addcourseform = () => {
  const dispatch=useDispatch();
const {step}=useSelector((state)=>state.course)
const Step=[
  {id:"1",name:"Course Information"},
  {id:"2",name:"Course Builder"},
  {id:"3",name:"Publish"}
  ];

  return (
    <div className="w-[800px] h-full  mt-[50px]">
    {/* timeline sec  */}
    
    <div className="w-[665px] h-[68px] flex items-center gap-[10px] ml-[240px] ">
  {
    Step.map((ele,index)=>{
        return (
         <div key={index} className="flex relative ">
                <div
  className={`flex justify-center relative bottom-[13px] items-center w-[34px] h-[34px] rounded-full  
    ${
      ele.id <= step
        ? ele.id == step
          ? "border-[#FFD60A] bg-[#151309] text-[#FFD60A] border-2"
          : "bg-[#FFD60A]"
        : "border-[#2C333F] text-[18px] text-[#838894] bg-[#424854]"
    }`}
>
  {ele.id < step ? <TiTick /> : ele.id}
</div>
            {/* border sec  */}

{
  ele.id!=3 && (

  
    <div  className={`relative left-[5px] w-[100px] h-[1px] ${ele.id<step?"border-dashed border-1 border-[#FFD60A]":"border-dashed border-1 border-[#2C333F]"} }`}></div>
   

    )
}
     


         </div>

    )})
  }

    </div>



    {/* line info section  */}
    <div className="w-[655px] flex gap-[45px] ml-[220px]">
      {
        Step.map((ele,index)=>{
          return (
            <div key={index} className={` text-[14px] font-[400] ${ele.id<step?"text-[#F1F2FF] ":" text-[#838894]"}`}>
              {ele.name}
            </div>
          )
        })
      }
    </div>
 {/* formsection  */}
    <div>

{
  step==="1" && (<Step1/>)
}
{
  step==="2" && (<Step2/>)
}
{
  step==="3" && (<Step3/>)
}
    </div>

    </div>
  )
}

export default Addcourseform
