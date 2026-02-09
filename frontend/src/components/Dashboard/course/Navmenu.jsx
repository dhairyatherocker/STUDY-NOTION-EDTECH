import React from 'react'

const Navmenu = ({coursetype,setcoursetype}) => {
const items=[
    {
   id:"1",
   name:"All",
   w:"57",
   h:"36px"
    },
    {
    id:"2",
    name:"Pending",
     w:"63px",
   h:"36px"
    },
    {
     id:"3",
     name:"Completed",
      w:"121px",
   h:"36px"
    }
]

  return (
    <div className="bg-[#161D29] w-[295px] h-[44px] rounded-3xl flex gap-[28px] pl-[10px] items-center">
      {
        items.map((ele)=>{
            return (
                 <div onClick={()=>setcoursetype(ele.name)} className={`${coursetype===ele.name?"bg-[#000814] text-[#F1F2FF] rounded-3xl":"text-[#999DAA]"} text-[16px] font-[700] min-w-[67px] max-w-[121px] h-[36px] flex items-center justify-center`}>
                {ele.name}
            </div>
            )
           
        })
      }

    </div>
  )
}

export default Navmenu
