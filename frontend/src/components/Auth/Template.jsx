import React from 'react'
import {account_type} from '../../utils/constants.jsx'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Spinner from '../Spinner.jsx'
import Info from './Info.jsx'
import Signupform from './Signupform.jsx'
import Loginform from './Loginform.jsx'
import frame from "../../assets/Images/frame.png"
import signup from "../../assets/Images/signup.webp"
import Login from "../../assets/Images/login.webp"
import Tab from "./Tab.jsx"
// import Spinner from '../Spinner.jsx'
const Template = ({formdata}) => {

    const tabdata=[
        {
            id:1,
            display:"Student",
            name:account_type.Student
        },
        {
         id:2,
         display:"Instructor",
         name:account_type.Instructor
        }
    ]
    const [accounttype,setaccounttype]=useState(account_type.Student);
   const {loading}=useSelector((state)=>state.auth);
   
  return (
    <div className="w-full h-full">
      {
      loading?(<Spinner/>):(

      <div className="flex gap-[150px] w-[1300px] mx-auto ml-[150px] mt-[70px]">
      <div className="flex-col gap-[10px] mt-[30px]">
        <div>
            {
                accounttype=="student"&& formdata=="signup"&&(<Info desc1={"Join the millions learning to code with StudyNotion for free"} desc2={"Build skills for today, tomorrow, and beyond. "} lighted={"Education to future-proof your career."}/>)
            }
            {
               accounttype=="student"&& formdata=="login"&&(<Info desc1={"Welcome Back"} desc2={"Build skills for today, tomorrow, and beyond."} lighted={"Education to future-proof your career."}/>)  
            }
            {
              accounttype=="instructor"&& formdata=="signup"&&(<Info desc1={"Welcome Back"} desc2={"Discover your passions,"} lighted={"Be Unstoppable"}/>)       
            }
            {
                 accounttype=="instructor"&& formdata=="login"&&(<Info desc1={"Welcome Back"} desc2={"Discover your passions,"} lighted={"Be Unstoppable"}/>)      
            }
        </div>
        <div>
            <Tab tabdata={tabdata} setaccounttype={setaccounttype} accounttype={accounttype}/>
        </div>

        <div>
            {
                formdata=="signup"?(<Signupform accounttype={accounttype} setaccounttype={setaccounttype} tabdata={tabdata}/>):(<Loginform/>)
            }
        </div>
       
      </div>
      {/* image section */}
      <div className="relative w-[540px] h-[500px]">
       <img src={frame} className="absolute z-0 left-[20px] top-[10px] w-[558px] h-[504px]"></img>
        {
                accounttype=="student"&& formdata=="signup"&&(<div><img src={signup} className="absolute z-1"></img>
                                                             </div>)
            }
            {
               accounttype=="student"&& formdata=="login"&&(<div><img src={Login} className="absolute z-1"></img>
                                                              </div>)  
            }
            {
              accounttype=="instructor"&& formdata=="signup"&&(<div>
                                                              <img src={signup} className="absolute z-1"></img></div>)       
            }
            {
                 accounttype=="instructor"&& formdata=="login"&&(<div>
                                                              <img src={signup} className="absolute z-1"></img></div>)      
            }
   

      </div>

      </div>


      )
      }
    </div>
  )
}

export default Template
