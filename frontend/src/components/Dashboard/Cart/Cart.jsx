import React, { useState,useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { removecourse } from '../../../slices/cartslice';
import RatingStars from '../../common/RatingStars';
import { Link,Links } from 'react-router-dom';
import { buyCourse } from '../../../services/paymentcaller';
// import { useDispatch } from 'react-redux';
import { RiDeleteBin6Line } from "react-icons/ri";
const Cart = () => {

    const dispatch=useDispatch();
    const {courses,totalprice,totalitems}=useSelector((state)=>state.cart);
    const [view,setview]=useState([]);
    const [Ids,setIds]=useState([]);
    const [removeId,setremoveId]=useState([]); 
    const {token}=useSelector((state)=>state.auth);
    useEffect(()=>{
   console.log("courses in cart",courses);
    console.log("total price in cart",totalprice);
     console.log("total items in cart",totalitems);

    },[])
    function removehandler(id){
        
       dispatch(removecourse(id));
    }

    function buyhandler(){
  courses.forEach((course) => {
  setIds([...Ids, course._id]) 
});

dispatch(buyCourse(Ids,token));
   
    }
  return (
    <div className="w-[1217px] h-full bg-[#000814]">
    <div className="w-[1217px] h-[800px] relative left-[300px] top-[100px]">


 {/* section 1 */}

  <div className="w-[1073px] h-[72px] ">
        <div className="text-[#838894] text-[14px] font-[400] w-[1073px] h-[22px]">Home / Dashboard / <span className="font-[500] text-[14px] text-[#FFD60A]">Wishlist</span></div>
        <div className="w-[1073px] h-[38px] text-[30px] font-[500] text-[#F1F2FF] mt-[10px]">My Wishlist</div>
    </div>
      
  {/* section 2 */}

  <div className="text-[16px] font-[600] text-[#6E727F] w-[1217px] h-[37px] mt-[50px] ">{totalitems}  Courses in Wishlist</div>



  {/* section 3 */}
  {/* <div className="w-[]"></div> */}

  <div className="w-[1094px] h-[624px]  border-t-2 border-[#2C333F] flex ">

<div className="w-[792px] h-[624px] mt-[0px]">
    {
        courses.map((ele,index)=>{
            return (
                <div className="w-[792px] h-[188px] flex border-b-2 border-[#2C333F] mt-[20px]">
                        <Link to={`/course/${ele?._id}`}><img src={ele.imageofcourse} className="w-[185px] h-[148px] rounded-xl "/></Link>
                        <div className="w-[407px] h-[148px] flex-col pl-[20px] ">
                            <div  className="w-[407px] h-[52px] text-[#F1F2FF] font-[500] text-[18px]">{ele.topic}</div>
                            <div className="w-[407px] h-[24px] font-[400] text-[#838894]">{ele.description}</div>
                            <div className="w-[407px] h-[24px] font-[600] text-[16px] text-[#E7C009] flex gap-[10px] mt-[10px]">
                            {/* {
                                ele?.rating ? (<div>{ele?.rating}</div>):(<div>1</div>)
                            }  */}
                            <div>1</div>
                            <RatingStars Review_Count={ele.rating} Star_Size={20} /> </div>
                           <div className="w-[407px] h-[22px] text-[14px] text-[#838894] mt-[10px]">Total Courses • Lesson • Beginner</div>
                        </div>
                       <div className="w-[112px] h-[148px] flex-col gap-[20px] ">
                              <div onClick={()=>removehandler(ele?._id)} className="w-[112px] h-[48px] flex gap-[10px] pl-[10px] bg-[#161D29] items-center font-[500] text-[16px] text-[#EF476F] rounded">
                                  <RiDeleteBin6Line/>
                                  <div >Remove</div>
                              </div>
                              <div className="w-[104px] h-[32px] text-[#FFD60A] mt-[20px] text-[24px] font-[600]">Rs. {ele.price}</div>
                       </div>
                </div>
            )
        })
    }
</div>
{/* <div className="w-[282px] h-[196px] bg-[#161D29] rounded-xl mt-[20px]">
<div className="w-[234px] h-[84px] mx-auto pt-[40px]">
    <div className="w-[234px] h-[22px] text-[14px] font-[600] text-[#999DAA] ">Total :</div>
    <div className="w-[234px] h-[32px] text-[#FFD60A] text-[24px] font-[600] ">RS. {totalprice}</div>
</div>
<div onClick={()=>buyhandler()} className="w-[234px] h-[48px] text-[16px] font-[500] text-[#000814] bg-[#FFD60A] rounded flex justify-center items-center ml-[20px] mt-[30px]">Buy Now</div>
</div> */}

  </div>

    </div>

   

    
    </div>
  )
}

export default Cart
