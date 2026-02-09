// import Enrolledcourse from "../pages/Enrolledcourse";

export const api={
    getallcategories:import.meta.env.VITE_BASE_COURSE+"/showAllCategories"
};

export const auth={
     SENDOTP:import.meta.env.VITE_BASE_AUTH+"/sendotp",
    SIGNUP:import.meta.env.VITE_BASE_AUTH+"/signup",
   RESETPASSWORD:import.meta.env.VITE_BASE_AUTH+"/resetpassword",
  RESETPASSWORDINTERFACE: import.meta.env.VITE_BASE_AUTH+"/reset-password-token",
    LOGIN:import.meta.env.VITE_BASE_AUTH+"/login",
    CHANGEPASSWORD:import.meta.env.VITE_BASE_AUTH+"/changepassword"
    }

export const profile={
    USERDETAILS:import.meta.env.VITE_BASE_PROFILE+"/getUserDetails",
    UPDATEPROFILE:import.meta.env.VITE_BASE_PROFILE+"/updateProfile",
    UPDATE_DISPLAY_PICTURE_API:import.meta.env.VITE_BASE_PROFILE+"/updateDisplayPicture"
}
export const course={
    ENROLLEDCOURSE:import.meta.env.VITE_BASE_COURSE+"/getEnrolledCourses",
    CREATECOURSE:import.meta.env.VITE_BASE_COURSE+"/createCourse",
    CREATESECTION : import.meta.env.VITE_BASE_COURSE+"/addSection",
    GETSECTION:import.meta.env.VITE_BASE_COURSE+"/getSection",
    UPDATESECTION:import.meta.env.VITE_BASE_COURSE+"/updateSection",
    CREATESUBSECTION:import.meta.env.VITE_BASE_COURSE+"/addSubSection",
    UPDATESUBSECTION:import.meta.env.VITE_BASE_COURSE+"/updateSubSection",
    DELETESECTION:import.meta.env.VITE_BASE_COURSE+"/deleteSection",
    DELETESUBSECTION:import.meta.env.VITE_BASE_COURSE+"/deleteSubSection",
    UPDATECOURSE:import.meta.env.VITE_BASE_COURSE+"/updatecourse",
    GETALLCOURSES:import.meta.env.VITE_BASE_COURSE+"/allinstructorcourse",
    DELETECOURSE:import.meta.env.VITE_BASE_COURSE+"/deleteCourse",
    GETCOURSEDETAILS:import.meta.env.VITE_BASE_COURSE+"/getCourseDetails",
    BUYCOURSE:import.meta.env.VITE_BASE_COURSE+"/buycourse",
    PUBLISHCOURSE:import.meta.env.VITE_BASE_COURSE+"/publishcourse",
    GETALLCOURSE:import.meta.env.VITE_BASE_COURSE+"/getAllCourses",
    GETCOURSEIDS:import.meta.env.VITE_BASE_COURSE+"/getcourseId",
}


export const category={
    GETCATEGORY:import.meta.env.VITE_BASE_COURSE+"/categoryPageDetails"
}

export const rating={
    GIVINGRATING:import.meta.env.VITE_BASE_COURSE+"/createRating",
    GETALLRATING:import.meta.env.VITE_BASE_COURSE+"/getReviews"
}

export const recommend={
    RECOMMENDEDCOURSE:import.meta.env.VITE_BASE_RECOMMENDER+"/recommendation"
}

export const studentEndpoints={
    COURSE_PAYMENT_API:import.meta.env.VITE_BASE_PAYMENT+"/capturepayment",
    COURSE_VERIFY_API:import.meta.env.VITE_BASE_PAYMENT+"/verifypayment",
    SEND_PAYMENT_SUCCESS_EMAIL_API:import.meta.env.VITE_BASE_PAYMENT+"/sendPaymentSuccessEmail"

}