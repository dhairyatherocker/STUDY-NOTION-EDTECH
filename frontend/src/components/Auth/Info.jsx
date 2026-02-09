import React from 'react'

const Info = ({desc1,desc2,lighted}) => {
  
  return (
    <div>
      <div className="w-[444px] h-[114px] font-bold text-[#F1F2FF] text-[30px]">{desc1}</div>
      <div className="w-[444px] h-[40px] font-semibold text-[#999DAA] text-[18px]" >{desc2} <span className="w-[444px] h-[40px] font-semibold text-[#47A5C5] text-[16px] font-edu ">{lighted}</span></div>
     
    </div>
  )
}

export default Info;
