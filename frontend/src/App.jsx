import { useState,useEffect } from 'react'
import {Route,Routes} from "react-router-dom"
import viteLogo from '/vite.svg'
import './App.css'
import Cart from './components/Dashboard/Cart/Cart.jsx'
import Home from "./pages/Home.jsx";
import Allcourses from './pages/Allcourses.jsx'
import Coursevideo from './components/Dashboard/CourseDashboard/Coursevideo.jsx'
import Dashboardsettings from './pages/Dashboardsettings.jsx';
import Addcourse from './components/Dashboard/Addcourse/Addcourse.jsx';
import Error from './pages/Error.jsx';
import About from './pages/About.jsx'
import Navbar from './components/Navbar.jsx';
import Contactus from './components/Contactus.jsx';
import Coursepage from "./components/Coursepage.jsx/Coursepage.jsx"
import Signup from './pages/Signup.jsx';
import Enrolledcourse from './pages/Enrolledcourse.jsx';
import Instructor from './pages/Instructor.jsx';
import Editcourse from './components/Dashboard/Editcourse/Editcourse.jsx';
import Login from './pages/Login.jsx';
import Myprofile from './pages/Myprofile.jsx';
import CourseDashboard from './components/Dashboard/CourseDashboard/CourseDashboard.jsx'
import Resetpassword from './pages/Resetpassword.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Categorypage from './pages/Categorypage.jsx';
import Mycourse from './pages/Mycourse.jsx';
import Step1 from './components/Dashboard/Addcourse/Step1.jsx';
import Privateroute from './components/Auth/Privateroute.jsx';
import Resetpasswordinterface from './pages/Resetpasswordinterface.jsx';
import Purchasehistory from './pages/Purchasehistory.jsx';
import {useSelector ,useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userdetails } from './services/apicaller.jsx';
import Verifyemail from './pages/Verifyemail.jsx';
import Dashboradsettings from './pages/Dashboardsettings.jsx';
import Coursesrecommend from './pages/Coursesrecommend.jsx'
function App() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {user}=useSelector((state)=>state.profile);
  const {token}=useSelector((state)=>state.auth);
  useEffect(()=>{
    if(token){
   dispatch(userdetails(token));
  //  console.log("useEfect done");
    }
    else{
      console.log("oplease login first");
    }
  },[]);
  return (
<div className="h-screen w-screen box-border  bg-[#000814] overflow-x-hidden" >
<Navbar/>
<Routes>
  <Route path="/" element={<Home/>}></Route>
  <Route path="/contact" element={<Contactus/>}></Route>
  <Route path="/Signup" element={<Signup/>}></Route>
   <Route path="/login" element={<Login/>}></Route>
   <Route path="/resetpassword" element={<Resetpassword/>}></Route>
   <Route path="/reset-password-token/:id" element={<Resetpasswordinterface/>}></Route>
   <Route path="/verifyemail" element={<Verifyemail/>}></Route>
    <Route path="/categorypage/:name/:id" element={<Categorypage/>}></Route>
   <Route path="/about" element={<About/>}/>
   {/* // dashboard section */}

    {/* <Route  element={<Privateroute><Dashboard/></Privateroute>}>

    <Route index element={<Myprofile/>}/>
<Route path="/dashboard/my-profile"  element={<Myprofile/>}></Route>
         <Route path="*"  element={<Error/>}/>
    <Route path="/dashboard/instructor" element={<Instructor/>}/>
<Route path="/dashboard/my-courses" element={<Mycourse/>}/>
<Route path="/dashboard/enrolled-courses" element={<Enrolledcourse/>}/>
<Route path="/dashboard/purchase-history" element={<Purchasehistory/>}/>
<Route path="/dashboard/Settings" element={<Dashboardsettings/>}/>

  
      

    </Route> */}




    <Route path="/dashboard" element={<Privateroute><Dashboard /></Privateroute>}>
  {/* Default route: when /dashboard is visited directly */}
  <Route index element={<Myprofile />} />
  
  {/* Nested dashboard routes (relative paths) */}
  <Route path="my-profile" element={<Myprofile />} />
  <Route path="instructor" element={<Instructor />} />
  {user?.accounttype=="instructor" && (
    <>
      <Route path="my-courses" element={<Mycourse /> } />
       <Route path="add-course" element={<Addcourse />} />
       <Route path="edit-course" element={<Editcourse/>}/>
    </>

  )}
  <Route path="allcourses" element={<Coursesrecommend />} />
  <Route path="enrolled-courses" element={<Enrolledcourse />} />
  <Route path="purchase-history" element={<Purchasehistory />} />
  <Route path="settings" element={<Dashboardsettings />} />
  <Route path="cart" element={<Cart/>} />
  {/* Catch-all for unknown dashboard sub-routes */}
  <Route path="*" element={<Error />} />
</Route>

  {/* course dashboard section  */}


  <Route  element={<CourseDashboard/>} >
<Route path="/course/Dashboard/:courseId/section/:sectionId/subsectionId/:subsectionId" element={<Coursevideo/>}/>

  </Route>



     <Route path="/course/:id" element={<Coursepage/>} />
</Routes>
</div>
  )
}

export default App;
