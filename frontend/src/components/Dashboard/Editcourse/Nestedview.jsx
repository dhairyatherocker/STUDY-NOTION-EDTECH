import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
const Nestedview = ({editsectionhandler,addlecturehandler,updatesubsectionhandler,deletesectionhandler,deletesubsectionhandler}) => {
    const {course}=useSelector((state)=>state.course);
    const checkhandler=(id)=>{
        console.log("id of section",id)
    }
  return (
    <div>
      {
        course.section.map((ele)=>(
            <div key={ele._id}>
                <div className="flex justify-between w-[600px] pl-[20px]">
                    <div className="text-white">{ele.title}</div>
                    <div className="flex gap-[10px]">
                        <div onClick={()=>editsectionhandler(ele._id)} ><MdEdit size={21} className="text-[#374957]"/></div>
                        <div onClick={()=>deletesectionhandler(ele._id)}><RiDeleteBin6Line size={21} className="text-[#374957]"/></div>
                    </div>
                </div>

                 {
                    ele.subsections.length>0 && (
                        ele.subsections.map((elem)=>{
                       return ( <div key={elem._id} className="flex justify-between w-[600px] pl-[20px]">
                    <div className="text-white">{elem.title}</div>
                    <div className="flex gap-[10px]">
                        <div onClick={()=>updatesubsectionhandler(elem._id)}><MdEdit size={21} className="text-[#374957]"/></div>
                        <div onClick={()=>deletesubsectionhandler(elem._id)}><RiDeleteBin6Line size={21} className="text-[#374957]"/></div>
                    </div>
                </div>)   
                        })
                    )


                 }

            <div onClick={()=>addlecturehandler(ele._id)} className="w-[200px] flex gap-[0px]"> <div><IoMdAdd size={21} className="text-[#FFD60A] font-[500]"/> <p className="text-[#FFD60A] text-[16px] font-[500]">Add Lecture</p></div></div>  
            </div>

        )
        
        )
      }
    </div>
  )
}

export default Nestedview
