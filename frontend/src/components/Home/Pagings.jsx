import React from 'react'
import { IoPeopleSharp } from "react-icons/io5";
import { ImTree } from "react-icons/im";
const Pagings = ({active}) => {

    if(active=="true")
  return (
    <div className={'w-[341.33px] h-[300px]  shadow-[12px_12px_0px_0px_#FFD60A]'}>
      
<div className="bg-[#FFFFFF] w-[341.33px] h-[244px] border-b-2 border-dashed border-black flex flex-col gap-[40px]">
<h2 className="font-[1000px] text-[20px] text-[#161D29] w-[293.33px] h-[28px] mt-[20px] ml-[20px]">Learn HTML</h2>

<p className="text-[16px] weight-[600px] text-[#585D69] w-[293.33px] h-[96px] ml-[20px]">This course covers the basic concepts of HTML including creating and structuring web pages, adding text, links, images, and more.</p>
</div>
<div className="bg-[#FFFFFF] w-[341.33px] h-[56px] flex gap-[150px] items-center">

<div className="w-[97px] h-[24px] flex gap-[8px] items-center ml-[10px]">

<IoPeopleSharp />
<div className="weight-[500px] text-[16px] text-[#0A5A72]">Begineer</div>
</div>

<div className="w-[180.33px] h-[24px] flex items-center gap-[8px]">
<ImTree />
<div className="w-[78px] h-[24px] text-[#0A5A72]">6 Lessons</div>
</div>

</div>

    </div>
  )

  else {
    return (
 <div className={'w-[341.33px] h-[300px] '}>
      
<div className="bg-[#161D29] w-[341.33px] h-[244px] border-b-2 border-dashed border-black flex gap-[60px] flex-col ">
<h2 className="font-[1000px] text-[20px]  w-[293.33px] h-[28px] text-[#DBDDEA] pt-[20px] pl-[20px]">Learn HTML</h2>

<p className="text-[16px] weight-[400px] text-[#6E727F] w-[293.33px] h-[96px] ml-[20px]">This course explores advanced topics in HTML5 and CSS3, including animations, transitions, and layout techniques</p>
</div>
<div className='bg-[#161D29] w-[341.33px] h-[56px] flex justify-between items-center gap-[150px]'>

<div className="w-[97px] h-[24px] flex gap-[8px] pl-[10px] items-center">

<IoPeopleSharp />
<div className="weight-[500px] text-[16px] text-[#838894]">Begineer</div>
</div>

<div className="w-[180.33px] h-[24px] flex gap-[7px] items-center">
<ImTree />
<div className="w-[78px] h-[24px] text-[#838894]">6 Lessons</div>
</div>

</div>

    </div>


    )
  }
}

export default Pagings;
