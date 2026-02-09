import { useState } from "react";
import {setLoading,setToken} from "../slices/authslice.jsx"
import {resetcart} from "../slices/cartslice.jsx"
import {toast} from "react-hot-toast"
import { setStep,setCourse } from "../slices/courseslice.jsx";
import {auth,profile,course} from "./apis.jsx"
import {apiconnector} from "./apiconnector.jsx"
// import {setuser} from "../slices/profileslice.jsx"
import { useDispatch, useSelector } from "react-redux";
import { setuser } from "../slices/profileslice.jsx";
// import { setToken } from "../slices/authslice.jsx";
const {SIGNUP,LOGIN,SENDOTP,RESETPASSWORD,RESETPASSWORDINTERFACE,CHANGEPASSWORD}=auth;
const {USERDETAILS,UPDATEPROFILE, UPDATE_DISPLAY_PICTURE_API}=profile;
const {ENROLLEDCOURSE,CREATECOURSE,CREATESECTION,GETSECTION,UPDATESECTION,CREATESUBSECTION,UPDATESUBSECTION,DELETESECTION,DELETESUBSECTION,GETALLCOURSES,DELETECOURSE,GETCOURSEDETAILS,BUYCOURSE,PUBLISHCOURSE,GETALLCOURSE, UPDATECOURSE}=course;

export async function getenrolledcourse(token){
    const toastid=toast.loading("loading ...");
    let result=[];
    setLoading(true);
    try{
     const response=await apiconnector("GET",ENROLLEDCOURSE,null, {
     Authorization: `Bearer ${token}`,
      })
      console.log("response of enrolled course",response);
      if(!response.data.success){
         throw new Error(response.data.message);
      }

      result=response.data.response;

    }
    catch(error){
      console.log("error in enroled course",error);
         toast.error("courses not fetched");
    }
    setLoading(false);
   toast.dismiss(toastid);
   return result;
}

export function createcourse(topic,description,price,category,language,tags,benefits,thumbnail,token){
   // const {course}=useSelector((state)=>state.course);
   return async(dispatch)=>{
      console.log("testing tags",tags);
      console.log("testing benefits",benefits);
      
      // console.log("category",categoryId)
      dispatch(setLoading(true))
      const toastId=toast.loading("loading ..")
      let result;
      try{
     const response=await apiconnector("POST",CREATECOURSE,{topic,description,price,categoryId:category,language,tags,benefits,thumbnail,token}, {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        })  
        if(!response.data.success){
         throw new Error(response.data.message);
        }
        console.log("response while creating course",response);
        console.log("response success",response.data.success);


        toast.success("course created successfully");
        toast.dismiss(toastId);
      dispatch(setLoading(false))
      if(response.data.success){
         dispatch(setCourse(response.data.newcourse));
         // console.log("course in fetching caller",course);
       dispatch(setStep("2"));
       
      }
        return response.data.success;
          
      }
      catch(error){
          toast.success("course created successfully");
        toast.dismiss(toastId);
         toast.error("course not created")
    console.log(error);
      }
      
   }
}


export function createsection(title,courseId,token){
  return async(dispatch)=>{
      dispatch(setLoading(true))
      const toastId=toast.loading("loading ..")
try{
const response=await apiconnector("POST",CREATESECTION,{title,courseId,token});
if(!response.data.success){
  throw new Error(response.data.message);
}
toast.success("section created suceessfully");
console.log("section response  ",response);
dispatch(setCourse(response.data.sectionincourse));

}
catch(error){
console.log("error in create subsection  ",error);
}
toast.dismiss(toastId);
      dispatch(setLoading(false))
  }
}

// export function createsection(title,courseId,token){
//   return async(dispatch)=>{
//       dispatch(setLoading(true))
//       const toastId=toast.loading("loading ..")
// try{
// const response=await apiconnector("POST",CREATESECTION,{title,courseId,token});
// if(!response.data.success){
//   throw new Error(response.data.message);
// }
// toast.success("section created suceessfully");
// console.log("section response  ",response);
// dispatch(setCourse(response.data.sectionincourse));

// }
// catch(error){
// console.log("error in create subsection  ",error);
// }
// toast.dismiss(toastId);
//       dispatch(setLoading(false))
//   }
// }


export async function getsectiondetails(token,sectionId){
 let result=[];
 try{
  setLoading(true);
  const toastid=toast.loading("toast loading ...");
  const response=await apiconnector("GET",GETSECTION,null,{
     Authorization: `Bearer ${token}`,
    },{sectionId});

    if(!response.data.success){
      setLoading(false);
    toast.dismiss(toastid);
      throw new Error(response.data.message);
    }

    result=response;
     setLoading(false);
    toast.dismiss(toastid);
    return result;

 }
 catch(error){
  return result;
 console.log("error in giving section ",error);
 }
}

export function updatesection(title,sectionId,token,courseId){
  return async(dispatch)=>{
     setLoading(true);
  const toastid=toast.loading("toast loading ...");
    try{
  const response=await apiconnector("PUT",UPDATESECTION,{token,title,sectionId,courseId});
  if(!response.data.success){

      throw new Error(response.data.message);
    }
  console.log("response of section name change",response)
  dispatch(setCourse(response.data.Course))
    toast.success("section name changed");
         
    }

    catch(error){
  console.log("error while updateing section  ",error);
    }
    setLoading(false);
    toast.dismiss(toastid);
  }
}
export function createsubsection(sectionId,title,description,video,token,courseId){
  return async(dispatch)=>{
  setLoading(true);
  const toastid=toast.loading("toast loading ...");
    try{
      console.log(typeof(courseId));
      console.log("courseId fetch",courseId)
const response=await apiconnector("POST",CREATESUBSECTION,{sectionId,courseId,title,description,token,video},{
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        });
 if(!response.data.success){

      throw new Error(response.data.message);
    }
 console.log("response of section name change",response)
  dispatch(setCourse(response.data.newcourse))
    toast.success("lecture inserted successfully");
    }
    catch(error){
 console.log("error while creating subsection  ",error);
    }
    setLoading(false);
    toast.dismiss(toastid);
  }
}

export function updatesubsection(subsectionId,title,description,video,token,courseId){
  return async(dispatch)=>{
  setLoading(true);
  const toastid=toast.loading("toast loading ...");
    try{
      console.log(typeof(courseId));
      console.log("courseId fetch",courseId)
const response=await apiconnector("PUT",UPDATESUBSECTION,{subsectionId,courseId,title,description,token,video},{
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        });
 if(!response.data.success){

      throw new Error(response.data.message);
    }
 console.log("response of section name change",response)
  dispatch(setCourse(response.data.newcourse))
    toast.success("lecture updated successfully");
    }
    catch(error){
 console.log("error while updating subsection  ",error);
    }
    setLoading(false);
    toast.dismiss(toastid);
  }
}


export function deletesection(sectionId,courseId,token){
  return async(dispatch)=>{
  setLoading(true);
  const toastid=toast.loading("toast loading ...");
    try{
      console.log(typeof(courseId));
      console.log("courseId fetch",courseId)
const response=await apiconnector("DELETE",DELETESECTION,{sectionId,courseId,token});
 if(!response.data.success){

      throw new Error(response.data.message);
    }
 console.log("response of section name change",response)
  dispatch(setCourse(response.data.newcourse))
    // toast.success("lecture updated successfully");
    }
    catch(error){
 console.log("error while updating subsection  ",error);
    }
    setLoading(false);
    toast.dismiss(toastid);
  }
}
export function deletesubsection(subsectionId,courseId,token){
  return async(dispatch)=>{
  setLoading(true);
  const toastid=toast.loading("toast loading ...");
    try{
      console.log(typeof(courseId));
      console.log("courseId fetch",courseId)
const response=await apiconnector("DELETE",DELETESUBSECTION,{subsectionId,courseId,token});
 if(!response.data.success){

      throw new Error(response.data.message);
    }
 console.log("response of section name change",response)
  dispatch(setCourse(response.data.newcourse))
    // toast.success("lecture updated successfully");
    }
    catch(error){
 console.log("error while updating subsection  ",error);
    }
    setLoading(false);
    toast.dismiss(toastid);
  }
}


export async function getallcourses(token){
let result=[];
setLoading(true);
const toastid=toast.loading("toast loading ...");
try{

  const response=await apiconnector("GET",GETALLCOURSES,null,{
     Authorization: `Bearer ${token}`,
    });
  if(!response.data.success){
    
      throw new Error(response.data.message);
    }

    console.log("fetching all courses",response);
    result=response;

}
catch(error){
 
console.log("error while getting all courses of instructor ",error)
}
setLoading(false);
    toast.dismiss(toastid);
return result;
}

export function deletecourse(token,courseId){
return async(dispatch)=>{
  setLoading(true);
  const toastid=toast.loading("toast loading ...");
    try{
     
const response=await apiconnector("DELETE",DELETECOURSE,{courseId,token});
 if(!response.data.success){

      throw new Error(response.data.message);
    }
 console.log("response of section name change",response)
  dispatch(setCourse(response.data.newcourse))
    // toast.success("lecture updated successfully");
    }
    catch(error){
 console.log("error while updating subsection  ",error);
    }
    setLoading(false);
    toast.dismiss(toastid);
  }
}

export async  function getcoursedetails(courseId){
  const toastId=toast.loading("loading..."); 
  setLoading(true);
  let result=[];
  try{
  const response=await apiconnector("POST",GETCOURSEDETAILS,{courseId});
  if(!response.data.success){

      throw new Error(response.data.message);
    }
    result=response;
    console.log("response on fetch course details ",response.data.success)
     setLoading(false);
    toast.dismiss(toastId);
    return result;
  }
  catch(error){
     setLoading(false);
    toast.dismiss(toastId);
 console.log("error while fetching course details",error);

  }
  return result;
}

export function buycourse(courseId,token){
return async(dispatch)=>{
  setLoading(true);
  const toastid=toast.loading("toast loading ...");
    try{
     
const response=await apiconnector("POST",BUYCOURSE,{courseId,token});
 if(!response.data.success){
      throw new Error(response.data.message);
    }
 console.log("response when buying course",response)
  // dispatch(setCourse(response.data.newcourse))
    toast.success("course buyed successfully");
    }
    catch(error){
 console.log("error while buying course ",error);
    }
    setLoading(false);
    toast.dismiss(toastid);
  }  
}

export function publishcourse(courseId,token){
  return async(dispatch)=>{
     setLoading(true);
  const toastid=toast.loading("loading ...");
    try{
   const response=await apiconnector("POST",PUBLISHCOURSE,{courseId,token});
   if(!response.data.success){
    throw new Error(response.data.message);
   }

   toast.success("course has been published")
    }
    catch(error){
  console.log(error);

    }
     setLoading(false);
    toast.dismiss(toastid);
  }
}


export async function allcourses(){
let toastId=toast.loading("loading..."); 
setLoading(true);
let result=[];

try{
const response=await apiconnector("GET",GETALLCOURSE);

if(!response.data.success){
    throw new Error(response.data.message);
   }
   result=response.data.allcourses;
   
console.log("result",result);
 toast.dismiss(toastId);
setLoading(false);
   
return result
}
catch(error){
     setLoading(false);
    toast.dismiss(toastId);
  console.log(error);
}
return result
}

export async function updatecourse(formdata,token){
let toastId=toast.loading("loading..."); 
setLoading(true);
let result=[];

try{
const details=formdata;  
const response=await apiconnector("PUT",UPDATECOURSE,{details,token});
if(!response.data.success){
  throw new error(response.data.message);
}
  result=response.data.updatedcourse;

console.log("response in update course caller",response);
 toast.dismiss(toastId);
setLoading(false);
return result;
}

catch(error){
  setLoading(false);
    toast.dismiss(toastId);
  console.log(error);
}
return result;
}

