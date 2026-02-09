import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast"


const initialState = {
 fullcoursedata:[],
 sectiondata:[],
//  subsectiondata:[],
 totallectures:0,
 completedlectures:[]
}

const Coursedetails=createSlice({
   name:"viewcourse",
   initialState,
   reducers:{
    setfullcourse:(state,action)=>{
     state.fullcoursedata=action.payload;
          },
    settotallectures:(state,action)=>{
          state.totallectures=action.payload;
     },
     setcompletedlectures:(state,action)=>{
       state.completedlectures=action.payload;
     },
     updatecompletedlectures:(state,action)=>{
        state.completedlectures=[...state.completedlectures,action.payload]
     },
     setsectiondata:(state,action)=>{
      state.sectiondata=action.payload;
     }
   }

})

export const {setfullcourse,settotallectures,setcompletedlectures , updatecompletedlectures,setsectiondata} = Coursedetails.actions;
export default Coursedetails.reducer;