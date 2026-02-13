import { useState } from "react";
import {setLoading,setToken} from "../slices/authslice.jsx"
import {toast} from "react-hot-toast"
import {apiconnector} from "./apiconnector.jsx"
// import {setuser} from "../slices/profileslice.jsx"
import { useDispatch, useSelector } from "react-redux";
import { setuser } from "../slices/profileslice.jsx";
import {api, recommend,course} from "./apis.jsx";
const {RECOMMENDEDCOURSE}=recommend;
const {GETCOURSEIDS}=course;

// const {token}=useSelector((state)=>state.auth)l;
// export function getrecommendedcourse(token,courseId,setparticularId){
//    return async(dispatch)=>{

// dispatch(setLoading(true));
// const toastId=toast.loading("Loading...");
//      try{
//      const response = await apiconnector('PUT',RECOMMENDEDCOURSE,{token,courseId});
     
//     if(!response.data.success){
//     throw new Error(response.data.message);}
//     console.log("response on recommended course",response);
//     setparticularId(response.data.data);
  

//     }
//     // setcourse(response)
//     catch(error){
//     console.log(error);
//      }
//   toast.dismiss(toastId);
// dispatch(setLoading(false));
//    } 
// }
export async function getrecommendedcourse(token,courseId){


setLoading(true);
const toastId=toast.loading("Loading...");
     try{
     const response = await apiconnector('PUT',RECOMMENDEDCOURSE,{token,courseId});
      console.log("response on recommended course",response);
    if(!response.data.success){
    throw new Error(response.data.message);}
   
//     setparticularId(response.data.data.recommendations);
  toast.dismiss(toastId);
setLoading(false);
return response;

    }
    // setcourse(response)
    catch(error){
     toast.dismiss(toastId);
setLoading(false);
    console.log(error);
     }
  

}

// export function recommendcoursedetails(token,cousrseIds){
//     return async(dispatch)=>{
//     dispatch(setLoading(true));
//     const toastId=toast.loading("loading..");
//     try{
//     const response=await apiconnector('GET',)
//     }
//     catch(error){

//     }
//     }
// }

export async function getcourseId(token){
setLoading(true);
let result=[];
//  dispatch(setLoading(true));
 const toastId=toast.loading("Loading...");
     
     try{
    const response=await apiconnector("GET",GETCOURSEIDS,null, {
Authorization: `Bearer ${token}`,});
  console.log("respoinse cfourse iDS all",response);
if(!response.data.success) throw new Error(response.data.message);

result=response.data.response;
toast.dismiss(toastId);
setLoading(false); 
return result;
     
}
     catch(error){
    toast.dismiss(toastId);
    setLoading(false); 
    console.log(error);
     }
    

}




