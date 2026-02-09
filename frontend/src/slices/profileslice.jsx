
import { createSlice } from "@reduxjs/toolkit";
import {toast} from "react-hot-toast"

const initialState={
    user:null,
    loading:false
}


const profileslice=createSlice({
    name:"profile",
    initialState,
    reducers:{
       setuser(state,action){
        state.user=action.payload;
        console.log("user",state.user);
       },
       logout(state){
      state.user=null;
    //   toast.success("logout successfull");
    toast.success("Login successful!", {
  duration: 4000,
  position: "bottom-center",
  style: {
    background: "#10b981",
    color: "#fff",
    fontWeight: "bold",
  },
   setLoading(state, value) {
      state.loading = value.payload;
    },

});
    }

    },
});


export const {setuser,logout,setLoading}=profileslice.actions;
export default profileslice.reducer;

