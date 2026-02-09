import { useState } from "react";
import {setLoading,setToken} from "../slices/authslice.jsx"
import {resetcart} from "../slices/cartslice.jsx"
import {toast} from "react-hot-toast"
import {auth,profile,rating} from "./apis.jsx"
import {apiconnector} from "./apiconnector.jsx"
// import {setuser} from "../slices/profileslice.jsx"
import { useDispatch, useSelector } from "react-redux";
import { setuser } from "../slices/profileslice.jsx";
// import { setToken } from "../slices/authslice.jsx";
const {SIGNUP,LOGIN,SENDOTP,RESETPASSWORD,RESETPASSWORDINTERFACE,CHANGEPASSWORD}=auth;
const {USERDETAILS,UPDATEPROFILE, UPDATE_DISPLAY_PICTURE_API}=profile;
const {GIVINGRATING,GETALLRATING}=rating;

export function givingrating(rated,comment,token,courseId){
    return async(dispatch)=>{
        setLoading(true);
        const toastid=toast.loading("loading...");
        try{
          
         const response=await apiconnector("POST",GIVINGRATING,{rated,comment,token,courseId});
         if(!response.data.success){
            toast.error("you already gave rating");
            throw new Error(response.data.message)
         }

         setLoading(false);
         toast.dismiss(toastid);
         toast.success("rated successfully")


        }
        catch(error){
             setLoading(false);
         toast.dismiss(toastid);
   console.log(error);

        }
    }
}
export function getallrating(setreviews){
    return async(dispatch)=>{
        setLoading(true);
        const toastid=toast.loading("loading...");
        try{
          
         const response=await apiconnector("GET",GETALLRATING);
         if(!response.data.success){
            // toast.error("");
            throw new Error(response.data.message)
         }

         setLoading(false);
         toast.dismiss(toastid);
        //  toast.success(")
            setreviews(response.data.getrating);
            console.log("get all rating",response.data.getrating);

        }
        catch(error){
             setLoading(false);
         toast.dismiss(toastid);
   console.log(error);

        }
    }
}
