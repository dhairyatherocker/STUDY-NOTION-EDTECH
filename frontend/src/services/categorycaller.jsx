import { useState } from "react";
import {setLoading,setToken} from "../slices/authslice.jsx"
import {resetcart} from "../slices/cartslice.jsx"
import {toast} from "react-hot-toast"
import {auth,profile,category} from "./apis.jsx"
import {apiconnector} from "./apiconnector.jsx"
// import {setuser} from "../slices/profileslice.jsx"
import { useDispatch, useSelector } from "react-redux";
import { setuser } from "../slices/profileslice.jsx";
// import { setToken } from "../slices/authslice.jsx";
const {SIGNUP,LOGIN,SENDOTP,RESETPASSWORD,RESETPASSWORDINTERFACE,CHANGEPASSWORD}=auth;
const {USERDETAILS,UPDATEPROFILE, UPDATE_DISPLAY_PICTURE_API}=profile;
const {GETCATEGORY}=category;

export  function getcategory(categoryId,setcategorydata){
    return async (dispatch)=>{
   
    // const dispatch=useDispatch();
   const toastid= toast.loading("loading...");
dispatch(setLoading(true));
     
try{

const response=await apiconnector("POST",GETCATEGORY,{categoryId});
if(!response.data.success){
    throw new Error(response.data.message);
}

console.log("response getting on fetch all category or selected category ",response);
setcategorydata(response?.data?.data);
}
catch(error){
console.log("erorr while fetching all get category ",error);
}
toast.dismiss(toastid);
   dispatch(setLoading(false));

    }
   
}