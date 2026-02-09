import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { useSelector,useDispatch } from 'react-redux';
import { changepassword } from '../services/apicaller';
import { updateprofile } from '../services/apicaller';
import ChangeProfilePicture from '../components/Dashboard/Changeprofilepicture';
import Editpassword from '../components/Dashboard/Editpassword';
// import Changeimage from '../components/Dashboard/Changeimage';
const Dashboradsettings = () => {
  const navigate=useNavigate();
  const {user}=useSelector((state)=>state.profile);
  const {token}=useSelector((state)=>state.auth);
  function convertDateFormat(inputDate) {
  // inputDate in format dd-mm-yyyy
  const [dd, mm, yyyy] = inputDate.split("-");
  return `${mm}/${yyyy}/${dd}`; // mm/dd/yyyy
}
const dispatch=useDispatch();
  const [formdata,setformdata]=useState({Dob:"",gender:"",profession:"",about:"",phonenumber:"",displayname:""});
  const [data,setdata]=useState({oldpassword:"",newpassword:""})

function edithandler(event) {
  setdata((prev) => {
    return {
      ...prev,
      [event.target.name]: event.target.value
      
    };
  });
  console.log(data);
}

 
  function changehandler(e) {
    const {name, value, checked, type} = e.target
    setformdata(prevformdata => {
      return {
        ...prevformdata,
        [name]: type ==="checkbox" ? checked : value
      }
    });
    
    console.log(formdata);}

    function sethandler(){

  const {displayname,Dob,gender,about,phonenumber,profession}=formdata;
  if(!displayname||!Dob||!gender||!about||!phonenumber||!profession){
    return;
    }
  const dob = Dob ? convertDateFormat(Dob) : "";
  console.log(dob);
  // const dob=convertDateFormat(Dob);
  dispatch(updateprofile(displayname,gender,profession,about,phonenumber,dob,token,navigate));
  setformdata({Dob:"",gender:"",profession:"",about:"",phonenumber:"",displayname:""})
  }

   function sendhandler(){
    console.log("1");
    const {oldpassword,newpassword}=data
    console.log("2");
    if(!oldpassword||!newpassword){
      toast.error("fill both the fields");
      return; 
    }
    console.log("3");
   dispatch(changepassword(oldpassword,newpassword,token,navigate));
    console.log("4");
    setdata({oldpassword:"",newpassword:""})

  }
  return (
    <div className="w-[1217px] h-[100vh] ml-[350px] mt-[60px]">


      <div className="flex-col  pt-[30px] h-[72px] w-[1073px] mx-auto justify-between">
      <div onClick={()=>navigate("/dashboard/my-profile")} className="flex gap-[5px] items-center">
        <IoIosArrowBack className="w-[14px] h-[14px] text-[#838894]"/>
        <p className="text-[17px] font-semibold text-[#838894] mr-[40px]">Back</p>
      </div>
      <div className="text-[#F1F2FF]  text-[30px] pt-[10px]"> Edit Profile</div>

      </div>

       
  <ChangeProfilePicture className="pt-[100px]"/>
 {/* formdata */}



       <div className="w-[792px] h-[388px] bg-[#161D29] mt-[40px] border-1 border-[#2C333F] rounded-xl">
     <div className="text-[#F1F2FF] font-[600] text-[18px] ml-[20px] mt-[30px]">Profile Information</div>
   <div className="flex gap-[120px] mt-[20px] ml-[20px]">

    <div className="flex-col gap-[10px]">
    <p className="h-[22px] w-[287px] text-[#DBDDEA] text-[14px] font-[400px]">Display Name</p>
    <input onChange={(e)=>changehandler(e)} name="displayname" value={formdata.displayname} type="text" placeholder={user?.profiledetails?.displayname || "please enter display name"} className=" pl-[5px] rounded shadow-[inset_0px_-1px_0px_0px_#FFFFFF2E] flex items-center w-[287px] h-[48px] justify-center gap-[5px] text-[#999DAA] bg-[#3f4455] transition-all duration-200 hover:bg-[#161D29]"></input>
  </div>

<div className="flex-col gap-[10px]">
    <p className="h-[22px] w-[287px] text-[#DBDDEA] text-[14px] font-[400px]">Profession</p>
    <input onChange={(e)=>changehandler(e)} type="text" name="profession" value={formdata.profession}  placeholder={user?.profiledetails?.profession || "please enter your profession"} className=" pl-[5px] rounded shadow-[inset_0px_-1px_0px_0px_#FFFFFF2E] flex items-center w-[287px] h-[48px] justify-center gap-[5px] text-[#999DAA] bg-[#3f4455] transition-all duration-200 hover:bg-[#161D29]"></input>
  </div>


   </div>


 {/* 2nd field  */}

<div className="flex gap-[120px] mt-[30px]">
<div className="flex-col gap-[10px] ml-[20px]">
    <p className="h-[22px] w-[287px] text-[#DBDDEA] text-[14px] font-[400px]">Date of Birth</p>
    <input onChange={(e)=>changehandler(e)} type="date" name="Dob" value={formdata.Dob}  placeholder={user?.profiledetails?.profession || "please enter your profession"} className=" justify-between pl-[5px] rounded shadow-[inset_0px_-1px_0px_0px_#FFFFFF2E] flex items-center w-[287px] h-[48px]  gap-[5px] text-[#999DAA] bg-[#3f4455] transition-all duration-200 hover:bg-[#161D29]"></input>
  </div>


 {/* radio btn  */}
<div>
  <p className="h-[22px] w-[287px] text-[#DBDDEA] text-[14px] font-[400px]">Date of Birth</p>
  <div>

<div>
 <input
            type="radio"
            onChange={(e)=>changehandler(e)}
            name="gender"
            value="Male"
            id="Male"
            checked={formdata.gender === "Male"}
          />
           <label htmlFor='Male'>Male</label>


</div>

<div>
 <input
            type="radio"
            onChange={(e)=>changehandler(e)}
            name="gender"
            value="Female"
            id="Female"
            checked={formdata.gender === "Female"}
          />
           <label htmlFor='Female'>female</label>


</div>


<div>


 <input
            type="radio"
            onChange={(e)=>changehandler(e)}
            name="gender"
            value="Other"
            id="Other"
            checked={formdata.gender === "Other"}
          />
           <label htmlFor='Other'>Other</label>


</div>
  </div>
  



</div>

 {/* 3rd field  */}

</div>


{/* button field  */}

<div className="flex mt-[20px] gap-[100px] ml-[20px]">

<div className="flex-col gap-[10px]">
    <p className="h-[22px] w-[287px] text-[#DBDDEA] text-[14px] font-[400px]">Phone number</p>
    <input onChange={(e)=>changehandler(e)} type="text" name="phonenumber" value={formdata.phonenumber}  placeholder={user?.profiledetails?.phonenumber || "please enter your phone number"} className=" pl-[5px] rounded shadow-[inset_0px_-1px_0px_0px_#FFFFFF2E] flex items-center w-[287px] h-[48px] justify-center gap-[5px] text-[#999DAA] bg-[#3f4455] transition-all duration-200 hover:bg-[#161D29]"></input>
  </div>
<div><div className="text-[#F1F2FF] font-[400] text-[14px]">About</div>
 <textarea
          placeholder='enter your comments here'
          onChange={(e)=>changehandler(e)}
          name="about"
          value={formdata.about}
          className="w-[360px] h-[48px] bg-[#3f4455] rounded-md border-b-1 border-[#2C333F] text-[#999DAA] pl-[10px] pt-[10px]"
         /> </div>



</div>

<div className="flex relative justify-center right-[200px]  top-[270px] items-center mt-[10px] ml-[650px] w-[100px] h-[40px] bg-[#FFD60A] rounded-md font-[500] text-[16px]">
  <div onClick={()=>sethandler()}>save</div>
</div>


       </div>



       {/* formdata ends */}

       
<Editpassword data={data} setdata={setdata} edithandler={edithandler} sendhandler={sendhandler}/>

    </div>
  )
}

export default Dashboradsettings
