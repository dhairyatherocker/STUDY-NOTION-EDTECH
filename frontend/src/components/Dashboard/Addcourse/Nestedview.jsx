import React,{useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdFormatLineSpacing } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaCaretUp } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
const Nestedview = ({editsectionhandler,addlecturehandler,updatesubsectionhandler,deletesectionhandler,deletesubsectionhandler}) => {
  const [viewsection,setviewsection]=useState([]);
    const {course}=useSelector((state)=>state.course);
    const checkhandler=(id)=>{
        console.log("id of section",id)
    }
    function draghandler(id){
      console.log("yes section hits",id)
    if(viewsection.includes(id)){
      if(viewsection.length==1){
        setviewsection([])
      }
    setviewsection(viewsection.filter((ele) => ele !== id));
    }
  else if(viewsection.length>0){
    setviewsection([...viewsection,id])
   }
   else{
    setviewsection(id);
   }
  }
  function sechandler(id){
    if(viewsection.includes(id)){
      return true;
    }
    return false;
  }
  return (
    <div className="w-[617px] bg-[#2C333F] rounded-md pt-[10px] mt-[20px]">
      {
        course.section.map((ele)=>(
            <div key={ele._id}>
                <div className="flex justify-between w-[600px] pl-[20px] border-b-2 border-[#424854]  h-[48px]">
                <div className="flex items-center gap-[10px]">
                   <MdFormatLineSpacing className="text-[#6E727F]" size={18}/>
                    <div className="text-[#C5C7D4]">{ele.title}</div>
                </div>
                      
                    <div className="flex gap-[10px] mt-[10px]">
                        <div onClick={()=>editsectionhandler(ele._id)} ><MdEdit size={21} className="text-[#374957]"/></div>
                        <div onClick={()=>deletesectionhandler(ele._id)}><RiDeleteBin6Line size={21} className="text-[#374957]"/></div>
                         <div onClick={()=>draghandler(ele._id)} className="border-l-1 border-[#424854]">{sechandler(ele._id)?<div><IoMdArrowDropdown size={21} className="text-[#374957]" /></div>
:<div><FaCaretUp size={21} className="text-[#374957] "/></div>}</div>
                    </div>
                </div>

                 {
                    ele.subsections.length>0 && sechandler(ele._id) && (
                        ele.subsections.map((elem)=>{
                       return ( <div key={elem._id} className="flex justify-between items-center h-[46px] w-[600px] pl-[40px] border-b-1 border-[#424854]">
                       <div className="flex items-center gap-[10px]">
                            <MdFormatLineSpacing className="text-[#6E727F]" size={18}/>
                            <div className="text-[#C5C7D4]">{elem.title}</div>
                       </div>
                
                    <div className="flex gap-[10px]">
                        <div onClick={()=>updatesubsectionhandler(elem._id)}><MdEdit size={21} className="text-[#374957]"/></div>
                        <div onClick={()=>deletesubsectionhandler(elem._id)}><RiDeleteBin6Line size={21} className="text-[#374957]"/></div>
                    </div>
                </div>)   
                        })
                    )


                 }

            <div onClick={()=>addlecturehandler(ele._id)} className="mt-[20px] ml-[10px] w-[122px] flex gap-[0px] h-[24px] items-center"> <IoMdAdd size={20} className="text-[#FFD60A] font-[500]"/> <p className="text-[#FFD60A] text-[16px] w-[94px] h-[24px] font-[500]">Add Lecture</p></div></div>  
            

        )
        
        )
      }
    </div>
  )
}

export default Nestedview
