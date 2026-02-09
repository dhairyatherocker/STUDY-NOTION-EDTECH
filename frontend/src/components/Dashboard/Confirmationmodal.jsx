import React from 'react'

const Confirmationmodal = ({modaldata}) => {
  return (
    <div className="relative flex-col gap-[10px] rounded w-[500px] left-[700px] bottom-[200px] border-2 border-[#161D29] pl-[40px] pt-[30px]">
    <div className="text-white font-bold text-[25px]">{modaldata.title1}</div>
    <div className="text-white font-semibold text-[20px]">{modaldata.title2}</div>

    <div className="flex justify-between  h-[200px] items-center w-[300px] "> 
     <div className="text-[18px] font-semibold rounded bg-[#FFD60A] height-[130px] w-[100px] flex justify-center items-center text-[#161D29] " onClick={modaldata?.btn1handler}>{modaldata.btn1}</div>
    <div className="text-[14px] height-[130px] rounded w-[100px] flex justify-center items-center bg-[#3f4455] text-[#161D29] font-bold" onClick={modaldata?.btn2handler}>{modaldata.btn2}</div>
    </div>
      
    </div>
  )
}

export default Confirmationmodal
