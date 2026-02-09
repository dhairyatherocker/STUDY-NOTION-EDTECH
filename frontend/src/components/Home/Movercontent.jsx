import React from 'react'
// import {HomePageExplore} from "../../assets/data/HomePageExplore.jsx"
import Slide from "./Slide.jsx";
import { IoPeopleSharp } from "react-icons/io5";
import { ImTree } from "react-icons/im";
import { useState } from 'react';
import { HomePageExplore } from '../../assets/data/homepage-explore.jsx';
import bghome from "../../assets/images/bghome.svg"
import Button from './Button.jsx';



const Movercontent = (props) => {


    const category=props.category;
    const setcategory=props.setcategory;
    let filtereditems=props.filtereditems;
    // console.log("error",error);
    // console.log(filtereditems)
    // const changehandler=props.changehandler;
    function newhandler(tag){
    setcategory(tag);
  }
    // let filtereditems={};
    // filtereditems=HomePageExplore.filter(prev=>prev.tag===category);
       
    // const [info,setinfo]=useState(HomePageExplore[0]);
    
  return (
    <div className="pt-[20px]">
      <div className="flex gap-[40px] w-[780px] mx-auto bg-[#161D29] rounded-full h-[40px] items-center justify-center">
{
    HomePageExplore.map((ele,index)=>{
        return (
            <div className={`${ele.tag===category?"w-[120px] h-[30px] text-[15px] font-semibold bg-[#000814] text-[#f9f9f9] flex items-center justify-center rounded-full":"text-[#6E727F] font=semibold text-[15px] h-[30px] w-[120px] bg-[#161D29] flex justify-center items-center rounded-full "}`} key={index} onClick={()=>newhandler(ele.tag)}>
             {ele.tag}
            </div>
        )
    })
}

      </div>




<div className="flex gap-[40px] w-[1200px] h-[323px] mx-auto relative top-[100px] z-[1]">
{

filtereditems.map((ele,index)=>{
    return (
        <div key={index} className="bg-[#161D29] w-[341.33px] h-[300px] flex-col group  transition-all duration-200 hover:bg-[#F9F9F9] justify-around hover:shadow-[12px_12px_0px_0px_#FFD60A]" >
          
<div className="w-[341.33px] h-[244px] flex flex-col items-center border-b-2 border-dashed group-hover:border-[C5C7D4] border-[#424854] pt-[40px] gap-[40px]">
    <div className=" text-[#DBDDEA] font-bold text-[20px] group-hover:text-[#161D29]  transition-all duration-200 w-[293.33px] h-[28px]  ">
        {ele.heading}</div>
    <div className="w-[293.33px] h-[96px] text-[16px] font-[400px] group-hover:text-[#585D69] text-[#6E727F]">{ele.description}</div>
</div>

<div className="w-[341.33px] h-[56px] flex  justify-center items-center">
<div className="flex w-[97px] h-[24px] justify-between items-center">
    <div><IoPeopleSharp/></div>
    <div className="group-hover:text-[#0A5A72] text-[16px] font-semibold">{ele.level}</div>
</div>
<div className="flex  h-[24px] justify-between items-center w-[180.33px]  gap-[0]">
    <div className="pl-[80px] "><ImTree/></div>
    <div className="group-hover:text-[#0A5A72] text-[16px] font-semibold">{ele.lessionNumber} Lessons</div>
</div>
</div>

        </div>
    )
})



}

</div>


{/* <div className="w-full h-[40px] relative"><Button active={"true"}  linkto={"/catelog"} length={"false"} text={"true"} >Explore catelog</Button>
<Button>Learn more</Button></div> */}
<div   style={{ backgroundImage: `url(${bghome})` }} className="w-screen  bg-cover bg-center h-[420px] relative bg-[#F9F9F9] z-0 flex  gap-[0px] justify-center items-center">
<div className="flex gap-[40px]">

    <Button active={"true"}  linkto={"/catelog"} length={"false"} text={"true"} >Explore catelog</Button>
<Button>Learn more</Button>
</div>

 </div>



{/* <img src={bghome} width={vw} ></img> */}




 </div>
  )
}

export default Movercontent
