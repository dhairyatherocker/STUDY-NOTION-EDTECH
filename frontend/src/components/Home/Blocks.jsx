import React from 'react'
import Button from './Button'
// import { TypeAnimation } from 'react-type-animation';
import Typeanimation from './Typeanimation';

const Blocks = ({heading,subheading,flexi,button1,button2,codeblocks}) => {


const codeSequence = codeblocks.split("\n").flatMap((line) => [line, 500]);
    
  return (
    <div className={`w-[1035px] h-[422px] gap-[150px]  flex ${flexi ? "flex" :"flex-row-reverse"} items-center mx-auto`}>
    
<div className="w-[486px] h-[284px] flex flex-col gap-[20px]">
<div className=" w-[486px] h-[168px] ">
{heading}
</div>
<div className="w-[486px] h-[72px] ">
    {subheading}
</div>

<div className="flex gap-[20px]">
    <Button active={button1.active} length={button1.length} text={button1.text}>{button1.content}</Button>
      <Button active={button2.active} length={button2.length} text={button2.text}>{button2.content}</Button>
</div>
</div>


 <div className="w-[450px] h-[258px] flex">
<div className="w-[30px] text-center text-[#6E727F]">
<p>1</p>
<p>2</p>
<p>3</p>
<p>4</p>
<p>5</p>
<p>6</p>
<p>7</p>
<p>8</p>
<p>9</p>
<p>10</p>
<p>11</p>


</div>

{/* const codeSequence = codeblocks.split("\n").flatMap((line) => [line, 500]); */}

<div className="w-[420px] h-[258px]">
<Typeanimation></Typeanimation>
</div>

 </div>



    </div>
  )
}

export default Blocks;






