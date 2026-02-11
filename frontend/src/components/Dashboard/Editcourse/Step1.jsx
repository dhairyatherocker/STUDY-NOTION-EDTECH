import React,{useState,useEffect} from 'react'
import { api } from '../../../services/apis.jsx';
import { apiconnector } from '../../../services/apiconnector.jsx';
import Tag from './Tag.jsx';
import { setStep,setCourse } from '../../../slices/Courseslice.jsx';
import { useSelector,useDispatch } from 'react-redux';
import { createcourse } from '../../../services/coursecaller.jsx';
import Benefits from './Benefits.jsx';
import {useForm} from "react-hook-form"
import Thumbnail from './Thumbnail.jsx';
import { IoIosArrowForward } from "react-icons/io";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
const {getallcategories}=api;
const Step1 = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState:{errors}
  }=useForm();
  const dispatch=useDispatch();
  const {course,editCourse}=useSelector((state)=>state.course)
  const [loading,setloading]=useState(false)
  const [category,setcategory]=useState([]);
  const {user}=useSelector((state)=>state.profile)
  const {token}=useSelector((state)=>state.auth)
 async function fetchcategory(){
  try{
  const response=await apiconnector("GET",getallcategories);
  console.log("response of category",response);
  setcategory(response.data.getallcategory);
  }
  catch(error){
 console.log("error while fetching category",error);
  }
 }

 useEffect(()=>{
  fetchcategory();
  console.log("edit in use effect",editCourse);
if(editCourse){
  console.log("course in use effect edit oues",course);
  console.log("course topic",course.title)
setValue("CourseTitle",course.title);
setValue("CourseShorDesc",course.description);
setValue("CoursePrice",course.price);
setValue("courseCategory",course.category);
setValue("courseLanguage",course.language);
setValue("courseTag",course.tags);
setValue("courseThumbnail",course.imageofcourse);
setValue("courseBenefits",course.benefits);
}
console.log("user in step 1 ",user);
console.log("course in use effect",course);
 })

  const isformupdated=()=>{
  const currentvalues=getValues();
  if(currentvalues.CourseTitle!=course.topic  || currentvalues.CourseShorDesc!=course.description || currentvalues.CoursePrice!=course.price || currentvalues.courseCategory!=course.category || currentvalues.courseLanguage!=course.language || currentvalues.courseTag!=course.tags || currentvalues.courseThumbnail!=course.imageofcourse || currentvalues.courseBenefits!=course.benefits){ return true;}
  else return false
 }

 const coursehandler=async(data)=>{
  console.log("1s")
  if(editCourse){
    if(isformupdated){
      const currentvalues=getValues();
      const formdata=new FormData();
      if(currentvalues.CourseTitle!=course.topic){
        formdata.append("topic",currentvalues.CourseTitle)
      }
      if(currentvalues.CourseShorDesc!=course.description){
        formdata.append("description",currentvalues.CourseShorDesc)
      }
      if(currentvalues.CoursePrice!=course.price){
        formdata.append("price",currentvalues.Courseprice)
      }
      if(currentvalues.courseCategory!=course.category){
        formdata.append("category",currentvalues.courseCategory)
      }
      if(currentvalues.courseLanguage!=course.language){
        formdata.append("language",currentvalues.courseLanguage)
      }
      if(currentvalues.courseTag!=course.tags){
        formdata.append("tags",currentvalues.courseTag)
      }
      if(currentvalues.courseThumbnail!=course.imageofcourse ){
        formdata.append("imageofcourse",currentvalues.courseThumbnail)
      }
      if( currentvalues.courseBenefits!=course.benefits){
        formdata.append("benefits",currentvalues.courseBenefits)
      }
      formdata.append("teacher",user._id)

    }
    console.log("2s")
  }
else {
  console.log("3s")
   const currentvalues=getValues();
      const formdata=new FormData();
      console.log("4s")
formdata.append("teacher",user._id)
console.log(data.CourseTitle)
formdata.append("topic",data.CourseTitle)
formdata.append("description",data.CourseShorDesc)
formdata.append("price",data.CoursePrice)
formdata.append("categoryId",data.courseCategory)
formdata.append("language",data.courseLanguage)
formdata.append("tags",data.courseTag)
// formdata.append("benefits",data.courseBenefits)
// console.log(data.courseTag)
// formdata.append("imageofcourse",data.courseThumbnail)
console.log("image",data.courseThumbnail)
formdata.append("benefits",data.courseBenefits)
console.log("5s")

 console.log("6s")
  // console.log("formdata of step1",formdata.get("thumbnail"))
  // console.log("formdata of step1",formdata.get(""))
  console.log("formdata of step1bnene",formdata.get("benefits")) 
  for (let [key, value] of formdata.entries()) {
    console.log(`${key}: ${value}`);
  }
  // const {topic}=formdata;
  // console.log("new method",topic); 
// try{
//   const response=await createcourse(formdata,token);
//   console.log("res while ",response);
// }
// catch(error){
// console.log(error);

// }
try{
  const tags=JSON.stringify(data.courseTag)
  const benefits=JSON.stringify(data.courseBenefits)
  const result= dispatch(createcourse(data.CourseTitle,data.CourseShorDesc,data.CoursePrice,data.courseCategory,data.courseLanguage,tags,benefits,data.courseThumbnail,token));
  console.log("result fetched",result);
  // if(result.data.success=="true"){
  //   console.log("1course")
  //    dispatch(setCourse(result.data.newcourse));
  //     console.log("2course")
  //    console.log("course fetching from slice",course);
  //     console.log("3course")
  //   dispatch(setStep("2"));
   
  // }

}
catch(error){
console.log("error while creating a course",error);
}
}}
 



  return (
<form  onSubmit={handleSubmit(coursehandler)}  className="w-[1100px] h-full ml-[150px] mt-[50px] flex-col gap-[20px]">
      
<div className="mx-auto h-[100px]">
  <label htmlFor='CourseTitle' className="font-[400] text-[14px] text-[#F1F2FF]">Course Title <sub className="text-[#EF476F] text-[14px] font-[400]">*</sub></label>
  <input 
  id="CourseTitle"
  placeholder="Enter Course Title"
  {...register("CourseTitle",{required:true})}
  className="pl-[5px] rounded shadow-[inset_0px_-3px_0px_0px_#FFFFFF2E] flex items-center w-[600px] h-[48px] justify-center gap-[5px] text-[#999DAA] bg-[#3f4455] transition-all duration-200 hover:bg-[#161D29]"/>
  {errors.CourseTitle && (
    <div> enter the course title</div>
  )}

</div>

<div className=" h-[200px]">
  <label htmlFor='CourseShorDesc'  className="font-[400] text-[14px] text-[#F1F2FF]">Course Short Description <sub className="text-[14px] text-[#EF476F] font-[400]">*</sub></label>
  <textarea
    id="CourseShorDesc"
    placeholder="Enter course description"
    {...register("CourseShorDesc",{required:true})}
    className="pl-[5px] rounded shadow-[inset_0px_-3px_0px_0px_#FFFFFF2E] flex items-center w-[600px] min-h-[140px] justify-center gap-[5px] text-[#999DAA] bg-[#3f4455] transition-all duration-200 hover:bg-[#161D29]"
  />
  {errors.CourseShorDesc && (<div>please enter course description</div>)}
</div>

<div className="mx-auto h-[100px]">
  <label htmlFor='CoursePrice' className="font-[400] text-[14px] text-[#F1F2FF]">Price <sub className="text-[#EF476F] text-[14px] font-[400]">*</sub></label>
  <input 
  id="CoursePrice"
  placeholder="Enter Price"
  {...register("CoursePrice",{required:true})}
  className="pl-[35px] rounded shadow-[inset_0px_-3px_0px_0px_#FFFFFF2E] flex items-center w-[600px] h-[48px] justify-center gap-[5px] text-[#999DAA] bg-[#3f4455] transition-all duration-200 hover:bg-[#161D29]"/>
  <HiOutlineCurrencyRupee size={18} className="relative bottom-[32px] left-[10px]" />
  {errors.CourseTitle && (
    <div> enter the course price</div>
  )}

</div>
      
<div className="mx-auto h-[100px]">
  <label htmlFor='CourseCategory' className="font-[400] text-[14px] text-[#F1F2FF]">Category <sub className="text-[#EF476F] text-[14px] font-[400]">*</sub></label>
  <select
  id='CourseCategory'
   defaultValue=""
            {...register("courseCategory", {required:true})}
         className="pl-[5px] rounded shadow-[inset_0px_-3px_0px_0px_#FFFFFF2E] flex items-center w-[600px] min-h-[40px] justify-center gap-[5px] text-[#999DAA] bg-[#3f4455] transition-all duration-200 hover:bg-[#161D29]" 
  >
    <option value="" disabled>choose a category</option>
    {
      category.map((ele,index)=>{
        return (
          <option key={index} value={ele?._id}>
            {ele.name}
          </option>
        )
      })
    }
  </select>
{errors.CourseCategory && (<div>please enter category</div>)}
</div>

<div className="mx-auto h-[100px]">
  <label htmlFor='CourseLanguage' className="font-[400] text-[14px] text-[#F1F2FF]">Course Language <sub className="text-[#EF476F] text-[14px] font-[400]">*</sub></label>
  <select
  id='CourseLanguage'
   defaultValue=""
            {...register("courseLanguage", {required:true})}
         className="pl-[5px] rounded shadow-[inset_0px_-3px_0px_0px_#FFFFFF2E] flex items-center w-[600px] min-h-[40px] justify-center gap-[5px] text-[#999DAA] bg-[#3f4455] transition-all duration-200 hover:bg-[#161D29]" 
  >
    <option value="" disabled>choose a Language</option>
     <option value="English" >English</option>
      <option value="Hinglish" >Hinglish</option>
       <option value="Hindi" >Hindi</option>
    
  </select>
{errors.CourseLanguage && (<div>please enter Language</div>)}
</div>

<div>
<Tag
   name="courseTag"
   label="Tags"
   register={register}
   errors={errors}
   setValue={setValue}
   getValues={getValues}
   
/>
</div>

{/* thumbanail of course  */}

<div>
<Thumbnail
   name="courseThumbnail"
   label="course Thumbnail"
   register={register}
   errors={errors}
   setValue={setValue}
   getValues={getValues}
/>

</div>



<div>
  <Benefits
    name="courseBenefits"
   label="Benefits"
   register={register}
   errors={errors}
   setValue={setValue}
   getValues={getValues}
   
  />
</div>
<div>
{
  editCourse && (<div className="ml-[500px] mt-[20px] w-[108px] h-[48px] rounded bg-[#2C333F] text-[16px] font-[500] flex justify-center items-center text-black">Save changes<IoIosArrowForward size={24} className="pl-[10px]"/></div>)
}
<button className="ml-[500px] mt-[20px] w-[108px] h-[48px] rounded bg-[#FFD60A] text-[16px] font-[500] flex justify-center items-center text-black">Next <IoIosArrowForward size={24} className="pl-[10px]"/></button>
</div>

 </form>
  )
}

export default Step1
