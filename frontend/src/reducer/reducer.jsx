import { combineReducers} from "@reduxjs/toolkit";
import authReducer from "../slices/authslice.jsx"
import cartReducer from "../slices/cartslice.jsx";
import courseReducer from "../slices/Courseslice.jsx"
import profileReducer from "../slices/profileslice.jsx";
import viewcourseReducer from "../slices/Coursedetailsslice.jsx"

const rootReducer=combineReducers({
    viewcourse:viewcourseReducer,
    course:courseReducer,
    auth:authReducer,
    cart:cartReducer,
    profile:profileReducer,
    // coursedetails:coursedetailsReducer,
})

export default rootReducer;