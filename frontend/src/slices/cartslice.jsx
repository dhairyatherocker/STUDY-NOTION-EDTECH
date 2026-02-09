
// import { createSlice } from "@reduxjs/toolkit";

// const getInitialItems = () => {
//   if (typeof window !== "undefined") {
//     return localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : null;
//   }
//   return null;
// };

// const initialState = {

//   totalItems: getInitialItems(),
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     settotalItems(state, action) {
//       state.totalItems = action.payload;
//       if (typeof window !== "undefined") {
//         localStorage.setI("totalItems", JSON.stringify(action.payload));
//       }
//     },

//     addcart(state,action){

//     }
    
//   },
// });

// export const { settotalItems } = cartSlice.actions;
// export default cartSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast"

const initialState ={
  courses:localStorage.getItem("courses") ? JSON.parse(localStorage.getItem("courses")) : [],
  totalprice:localStorage.getItem("totalprice") ? JSON.parse(localStorage.getItem("totalprice")) : 0,
  totalitems:localStorage.getItem("totalitems")?JSON.parse(localStorage.getItem("totalitems")):0,
}


const cartslice=createSlice({
  name: "cart",
  initialState,
  reducers:{
    settotalcourses:(state,action)=>{
      state.courses.push(action.payload)      
      state.totalitems+=1,
      state.totalprice=Number(state.totalprice)+Number(action.payload.price)
      localStorage.setItem("courses",JSON.stringify(state.courses))
      localStorage.setItem("totalprice",JSON.stringify(state.totalprice))
      localStorage.setItem("totalitems",JSON.stringify(state.totalitems))
      toast.success("course added to the cart");
    },
    removecourse:(state,action)=>{
      // payload is only id of course
      console.log("action payload",action.payload);
     const index=state.courses.findIndex((item)=>item._id==action.payload);
     console.log("index in remove course",index)
     if(index>=0){
       state.totalprice=Number(state.totalprice)-Number(state.courses?.[index].price) 
      state.totalitems-=1
        // state.courses=state.courses.filter((ele)=>ele._id!==action.payload?._id)
      state.courses.splice(index,1);
       localStorage.setItem("courses",JSON.stringify(state.courses))
      localStorage.setItem("totalprice",JSON.stringify(state.totalprice))
      localStorage.setItem("totalitems",JSON.stringify(state.totalitems))
      toast.success("course removed successfully")
      return
     }

    },
    resetcart:(state)=>{
      state.totalprice=0
      state.totalitems=0
      state.courses=[]
       localStorage.setItem("courses",JSON.stringify(state.courses))
      localStorage.setItem("totalprice",JSON.stringify(state.totalprice))
      localStorage.setItem("totalitems",JSON.stringify(state.totalitems))
      
    }
    
    
},})


export const { settotalcourses,removecourse,resetcart } = cartslice.actions;
export default cartslice.reducer;
