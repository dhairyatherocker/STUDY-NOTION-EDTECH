import React,{useState,useEffect} from 'react'
import { getallrating } from '../../services/ratingcaller'
import { useDispatch } from 'react-redux'
import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import RatingStars from '../common/RatingStars'
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules'

const Allreviews = () => {
const dispatch=useDispatch();
const [reviews,setreviews]=useState(null);
useEffect(()=>{
  dispatch(getallrating(setreviews));
   console.log("rating",reviews?.[0]?.rated);
},[])
  return (
    <div>
        
         {
                    reviews?.length ? (
                        <Swiper
                            slidesPerView={1}
                            loop={true}
                            spaceBetween={200}
                            pagination={true}
                            modules={[Autoplay,Pagination,Navigation]}
                            className="mySwiper"
                            autoplay={{
                            delay: 1000,
                            disableOnInteraction: false,
                            }}
                            navigation={true}
                            breakpoints={{
                                1024:{slidesPerView:4,}
                            }}
                        >
                            {
                                reviews.map((ele, index)=> (
                                    <SwiperSlide key={index}>
                                          <div className="w-[304px] h-[171px] bg-[#151C28] rounded-md">
                                             <div className="flex gap-[10px] relative top-[20px] pl-[20px]">
                                            <img src={ele?.user?.image} className="w-[52px] h-[52px] z-[10] rounded-full "/>
                                              <div>
                                                <div className="font-[600] text-[16px] text-[#F1F2FF]">{ele?.user?.firstname} {ele?.user?.lastname}</div>
                                                <div className="text-[#383E49] text-[14px] font-[400]">{ele?.user?.email}</div>
                                              </div>
                                             </div>
                                             <div className="text-[#F1F2FF] mt-[40px] text-[12px] pl-[20px]">{ele?.comment}</div>
                                             <div className="pl-[70px] mt-[20px]"><RatingStars Review_Count={ele?.rated} /></div>
                                             {/* <div><RatingStars /></div> */}
                                          </div>
                                    </SwiperSlide>
                                ))
                            }   
                        </Swiper>
                    ) : (
                        <p>No reviews</p>
                        
                    )
        
                }
    </div>
  )
}

export default Allreviews
