import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import Sidebar from '../components/Dashboard/Sidebar'
import { Outlet, useNavigate } from 'react-router-dom'

const Dashboard = () => {
const {loading:authloading}=useSelector((state)=>state.auth)
const {loading:profileloading}=useSelector((state)=>state.profile)

if(authloading||profileloading){
    return <div>Loading...</div>
}
  return (
    <div className="flex ">
      <div><Sidebar/></div>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}

export default Dashboard
