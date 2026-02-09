import { useState } from "react";
import {setLoading,setToken} from "../slices/authslice.jsx"
import {resetcart} from "../slices/cartslice.jsx"
import {toast} from "react-hot-toast"
import {auth,profile} from "./apis.jsx"
import {apiconnector} from "./apiconnector.jsx"
// import {setuser} from "../slices/profileslice.jsx"
import { useDispatch, useSelector } from "react-redux";
import { setuser } from "../slices/profileslice.jsx";
// import { setToken } from "../slices/authslice.jsx";
const {SIGNUP,LOGIN,SENDOTP,RESETPASSWORD,RESETPASSWORDINTERFACE,CHANGEPASSWORD}=auth;
const {USERDETAILS,UPDATEPROFILE, UPDATE_DISPLAY_PICTURE_API}=profile;
export function sendotp(email,navigate){

return async (dispatch)=>{

const toastid= toast.loading("loading...");
dispatch(setLoading(true));
     
     try{
      // console.log("email ",email);
    
      const response =await apiconnector("POST",auth.SENDOTP,{email,checkUserPresent:true})
    //  console.log("1");
    console.log(response.data.success);
    if(!response.data.success){
        throw new Error(response.data.message);
    }
        //  console.log("2");
    toast.success("otp sent successfully");
    navigate("/verifyemail");
        //  console.log("3");
     }

     catch(error){
     console.log(error);
          // console.log("4");
     toast.error("otp not sended");
     }
          // console.log("5");
   toast.dismiss(toastid);
   dispatch(setLoading(false));
        // console.log("6");
   }}


   export function signup(firstname,lastname,email,otp,password,confirmpassword,accounttype,navigate){
    return async (dispatch)=>{
        dispatch(setLoading(true));
        const toastid=toast.loading("Loading ...")
        try{
          // console.log("otp  ",otp);
          // console.log(typeof otp); 
          //  console.log(typeof firstname); 
          //   console.log(typeof password); 
          
          
            const response=await apiconnector("Post",SIGNUP,{firstname,lastname,email,otp,password,confirmpassword,accounttype,checkUserPresent:true});

            console.log(response.data.success);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            // console.log(response)
            toast.success("signup successfull");
            navigate("/login");

        }
        catch(error){
         console.log("error in services ",error);

        }
         toast.dismiss(toastid);
         dispatch(setLoading(false));
    }
   }


   export function login(email,password,navigate){

    return async (dispatch)=>{
          dispatch(setLoading(true));
        const toastid=toast.loading("Loading ...")
      try{

const response=await apiconnector("Post",LOGIN,{email,password,checkUserPresent:true});
console.log(response.data.success);
console.log("response while login",response);

if(!response.data.success){
    throw new Error(response.data.message);
}

toast.success("login successful");

dispatch(setToken(response.data.token));

const image=response?.data?.existinguser?.image?response?.data?.existinguser?.image:`https://api.dicebear.com/5.x/initials/svg?seed=${response.data.existinguser.firstname} ${response.data.existinguseruser.lastname}`

dispatch(setuser(response.data.existinguser));
console.log("login response  ",response);
console.log("login image",image);
localStorage.setItem("token", JSON.stringify(response.data.existinguser.token));
navigate("/dashboard/my-profile")

        }
        catch(error){
 console.log("error in services ",error);
        }

          toast.dismiss(toastid);
   dispatch(setLoading(false));
    }

   }


export function resetpassword(email,setmirror,navigate){
    return async (dispatch)=>{
        dispatch(setLoading(true));
        const toastid=toast.loading("Loading ...") 
      try{
  const response =await apiconnector("POST",RESETPASSWORD,{email});
  console.log(response.data.success);

  if(!response.data.success){
    throw new Error(response.data.message);
  }
toast.success("reset password link send successfully to your email");
setmirror(true)

       
      }

      catch(error){
  console.log(error);
  console.log("error while sending an link of reset")

      }

 toast.dismiss(toastid);
   dispatch(setLoading(false));
    }
}
   

export function resetpasswordtoken(newpassword,confirmnewpassword,token,navigate,setmirror){
  return  async (dispatch)=>{
     dispatch(setLoading(true));
        const toastid=toast.loading("Loading ...") 
        try{
        //  console.log("token2  ",token);
const response=await apiconnector("PUT",RESETPASSWORDINTERFACE,{newpassword,confirmnewpassword,token});
// console.log("response we got  ",response);
// console.log("1");
// console.log(response.data.success);
// console.log("2");
if(!response.data.success){
  toast.error("sorry something went wrong");
  throw new Error(response.data.message);
}
// console.log("3");
toast.success("password reaset successfully");
// console.log("4");
setmirror(true);
// console.log("5");
        }

        catch(error){
          // console.log("6");
  console.log(error);

        }
        toast.dismiss(toastid);
   dispatch(setLoading(false));
  }
}

export function userdetails(token){
  return async (dispatch)=>{
    dispatch(setLoading(true));
    const toastid=toast.loading("Loading ...") 
    try{
// console.log("hello1");
const response=await apiconnector("GET",USERDETAILS,null, {
Authorization: `Bearer ${token}`,
  });
// console.log("hello2");
if(!response.data.success){
  throw new Error(response.data.message);
}
// console.log("hello3");
 console.log("userprofile1",response);
dispatch(setuser(response.data.existinguser))
console.log("userdeatils",response.data.existinguser);
// console.log("hello4");
    }
    catch(error){
      console.log(error);

    }
    toast.dismiss(toastid);
   dispatch(setLoading(false));
  }
}

export function logout(navigate){
  // const {user}=useSelector((state)=>state.profile);
  return async (dispatch)=>{
// const dispatch=useDispatch()
  dispatch(setuser(null));
  dispatch(setToken(null));
  navigate("/");
  }}


export function updateprofile(displayname,gender,profession,about,phonenumber,dob,token,navigate){
  return async(dispatch)=>{
     dispatch(setLoading(true));
        const toastid=toast.loading("Loading ...") 
        try{
      const response=await apiconnector("PUT",UPDATEPROFILE,{displayname,gender,profession,about,phonenumber,dob,token});
      console.log("response on updating profile",response);
      if(!response.data.message){
  throw new Error(response.data.message);
}
toast.success("profile updated");
        }
        catch(error){
console.log(error);
        }
         toast.dismiss(toastid);
   dispatch(setLoading(false));
  }
}

export function changepassword(oldpassword,newpassword,token,navigate){
  return async (dispatch)=>{
     dispatch(setLoading(true));
        const toastid=toast.loading("Loading ...") 
    try{
    console.log("5");
   const response=await apiconnector("PUT",CHANGEPASSWORD,{oldpassword,newpassword,token});
   console.log("6");
    console.log(response.data.success);
    console.log("7");
    console.log("response while changing password",response);
    console.log("8");
    if(!response.data.success){
      throw new Error(response.data.message);
    }

    toast.success("password changed successfully");


    }
    catch(error){
toast.error("sorry password not changed");
      console.log(error)
    }
     toast.dismiss(toastid);
   dispatch(setLoading(false));
  }
}
export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiconnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      )
      console.log(
        "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
        response
      )

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Display Picture Updated Successfully")
      dispatch(setuser(response.data.existinguser))
    } catch (error) {
      console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
      toast.error("Could Not Update Display Picture")
    }
    toast.dismiss(toastId)
  }
}
