import React from 'react'

const Tab = ({setaccounttype,accounttype,tabdata}) => {
  // const setaccounttype=props.setaccounttype;
  // const  accounttype=props.accounttype;
  // const   tabdata=props.tabdata;
  return (
    <div className="w-[230px] h-[44px] bg-[#3f4455] shadow-[inset_0_-1px_0_0_#ffffff2e] flex gap-[20px] rounded-full items-center pl-[15px] mt-[40px]">
      {
       tabdata.map((ele)=>{
        return(
            <div key={ele.id} onClick={()=>setaccounttype(ele.name)} className={`${ele.name==accounttype?("w-[100px] h-[36px] flex items-center justify-center bg-[#000814] text-[#F1F2FF] font-bold text-[16px] rounded-full"):("bg-[#3f4455] text-[#999DAA] text-[16px] font-bold rounded-full w-[97px]")}`}  >{ele.display}</div>
        )
       })  
      }
    </div>
  )
}

export default Tab
