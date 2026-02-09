import React from 'react'
import aboutus1 from "../assets/Images/aboutus1.webp"
import aboutus2 from "../assets/Images/aboutus2.webp"
import FoundingStory from "../assets/Images/FoundingStory.png"
import Allreviews from '../components/reviews.jsx/Allreviews'
import Footer from '../components/common/footer'
import aboutus3 from "../assets/Images/aboutus3.webp"
const About = () => {
  return (
    <div className="w-full h-full bg-[#000814] ">
    
        <div className="w-full h-[700px] bg-[#161D29] relative top-[50px] ">
            <div className="w-[1200px] h-[258px] flex-col  relative top-[100px] mx-auto ">
                <div className="w-[113px] h-[44px] font-[500] text-[16px] text-[#999DAA] mx-auto">About us</div>
                <div className="w-[809px] h-[88px] font-[600] text-[36px] text-[#F1F2FF] mx-auto pl-[50px]">Driving Innovation in Online Education for a <span>Brighter Future</span></div>
                <div className="w-[809px] h-[72px] font-[500] text-[16px] text-[#838894] mx-auto mt-[40px] pl-[50px]">Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</div>
                <div className="flex w-[1200px] h-[311px] gap-[24px] absolute top-[350px]">
                    <img src={aboutus1} className="w-[384px] h-[311px]"/>
                    <img src={aboutus2} className="w-[384px] h-[311px]"/>
                    <img src={aboutus3} className="w-[384px] h-[311px]"/>
                </div>
            </div>

        </div>
    
         <div className="w-full h-[336px] mt-[50px] relative top-[150px]">
            <div className="w-[1200px] h-[156px] mx-auto font-[600] text-[36px] text-[#AFB2BF]">
                We are passionate about revolutionizing the way we learn. Our innovative platform combines technology, expertise, and community to create an unparalleled educational experience.
            </div>
         </div>
         <div className="w-full h-[552px] text-[#838894] flex gap-[100px] pl-[100px] mt-[100px] ">
                <div className="w-[486px] h-[372px]">
                    <div className="font-[600] text-[36px]">Our Founding Story </div>
                    <div className="flex-col mt-[50px]">
                        <div>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and ,high-quality learning opportunities in a rapidly evolving digital world.</div>
                        <div>
                            As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                        </div>

                    </div>
                </div>
            <div>
            <img src={FoundingStory} className="w-[470px] h-[278px] mt-[50px]"/>
            </div>
         </div>

         <div className="w-full h-[552px] text-[#838894] flex gap-[100px] pl-[100px] mt-[100px] ">
            <div >
                <div className="font-[600] text-[36px]">Our Vision</div>
                <div className="text-[#838894]">With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</div>
            </div>
            <div className="">
                <div className="font-[600] text-[36px]">Our Mission</div>
                <div className="w-[]">our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</div>
            </div>
         </div>

         <div className="w-full bg-[#161D29] h-[254px] flex items-center  justify-around">
            <div className="w-[#292.5px] h-[74px] flex-col gap-[12px] justify-center">
                <div className="font-[700] text-[30px] text-[#F1F2FF]">5K</div>
                <div className="font-[600] text-[16px] text-[#585D69]">Active Students</div>
            </div>
              <div className="w-[#292.5px] h-[74px] flex-col gap-[12px] justify-center">
                <div className="font-[700] text-[30px] text-[#F1F2FF]">10+</div>
                <div className="font-[600] text-[16px] text-[#585D69]">Mentors</div>
            </div>
              <div className="w-[#292.5px] h-[74px] flex-col gap-[12px] justify-center">
                <div className="font-[700] text-[30px] text-[#F1F2FF]">200+</div>
                <div className="font-[600] text-[16px] text-[#585D69]">Courses</div>
            </div>
              <div className="w-[#292.5px] h-[74px] flex-col gap-[12px] justify-center">
                <div className="font-[700] text-[30px] text-[#F1F2FF]">50+</div>
                <div className="font-[600] text-[16px] text-[#585D69]">Awards</div>
            </div>
         </div>





          <div className="min-h-screen w-full bg-richblack-900 px-10 py-16 text-white">
  {/* TOP SECTION */}
  <div className="mx-auto flex max-w-6xl gap-16">
    {/* LEFT CONTENT */}
    <div className="flex-1">
      <h1 className="text-4xl font-semibold leading-tight">
        World-Class Learning for{" "}
        <span className="text-blue-400">Anyone, Anywhere</span>
      </h1>

      <p className="mt-4 text-richblack-300">
        Studynotion partners with more than 275+ leading universities and
        companies to bring flexible, affordable, job-relevant online learning
        to individuals and organizations worldwide.
      </p>

      <button className="mt-6 rounded-md bg-yellow-400 px-6 py-3 font-semibold text-richblack-900 hover:bg-yellow-300">
        Learn More
      </button>
    </div>

    {/* RIGHT GRID */}
    <div className="grid flex-1 grid-cols-2 gap-4">
      <div className="rounded-lg bg-richblack-800 p-6">
        <h3 className="font-semibold">Curriculum Based on Industry Needs</h3>
        <p className="mt-2 text-sm text-richblack-300">
          Save time and money! The Belajar curriculum is made to be easier to
          understand and in line with industry needs.
        </p>
      </div>

      <div className="rounded-lg bg-richblack-800 p-6">
        <h3 className="font-semibold">Our Learning Methods</h3>
        <p className="mt-2 text-sm text-richblack-300">
          The learning process uses the namely online and offline.
        </p>
      </div>

      <div className="rounded-lg bg-richblack-800 p-6">
        <h3 className="font-semibold">Certification</h3>
        <p className="mt-2 text-sm text-richblack-300">
          You will get a certificate that can be used as a certification during
          job hunting.
        </p>
      </div>

      <div className="rounded-lg bg-richblack-800 p-6">
        <h3 className="font-semibold">Rating “Auto-grading”</h3>
        <p className="mt-2 text-sm text-richblack-300">
          You will immediately get feedback during the learning process without
          having to wait for an answer or response from the mentor.
        </p>
      </div>

      <div className="col-span-2 rounded-lg bg-richblack-800 p-6"> 
        <h3 className="font-semibold">Ready to Work</h3>
        <p className="mt-2 text-sm text-richblack-300">
          Connected with over 150+ hiring partners, you will have the
          opportunity to find a job after graduating from our program.
        </p>
      </div>
    </div>
  </div>

  {/* CONTACT FORM */}
  <div className="mx-auto mt-24 max-w-xl text-center">
    <h2 className="text-3xl font-semibold">Get in Touch</h2>
    <p className="mt-2 text-richblack-300">
      We’d love to hear from you. Please fill out this form.
    </p>

    <div className="mt-8 space-y-4 text-left">
      <div className="flex gap-4">
        <input
          className="w-full rounded-md bg-richblack-800 p-3 text-white outline-none"
          placeholder="First name"
        />
        <input
          className="w-full rounded-md bg-richblack-800 p-3 text-white outline-none"
          placeholder="Last name"
        />
      </div>

      <input
        className="w-full rounded-md bg-richblack-800 p-3 text-white outline-none"
        placeholder="Email address"
      />

      <div className="flex gap-2">
        <select className="rounded-md bg-richblack-800 p-3 text-white outline-none">
          <option>+91</option>
        </select>
        <input
          className="w-full rounded-md bg-richblack-800 p-3 text-white outline-none"
          placeholder="12345 67890"
        />
      </div>

      <textarea
        rows="4"
        className="w-full resize-none rounded-md bg-richblack-800 p-3 text-white outline-none"
        placeholder="Enter your message"
      />

      <button className="w-full rounded-md bg-yellow-400 py-3 font-semibold text-richblack-900 hover:bg-yellow-300">
        Send Message
      </button>
    </div>
  </div>
</div>
   <Allreviews/>
   <Footer/>
    </div>
  )
}

export default About
