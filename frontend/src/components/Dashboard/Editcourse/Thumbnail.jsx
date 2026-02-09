import React, { useState, useRef, useEffect } from "react";
import { SlCloudUpload } from "react-icons/sl";
import { useSelector } from 'react-redux';
const Thumbnail = ({ name, register, errors, label, setValue, getValues }) => {
  const [image, setImage] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);
  const fileInputRef = useRef(null);
 const {course,editCourse}=useSelector((state)=>state.course)
  const handleClick = () => {
    fileInputRef.current.click();
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      setValue(name, file); // Set the file into react-hook-form
    };
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      previewFile(file);
      setValue(name, file)
    }
  };

  useEffect(() => {
    if (image) {
      previewFile(image);
    }
    if(editCourse){
      setValue(name,course.thumbnail)
    }
    
  }, [image]);

  return (
    <div className="flex flex-col gap-2 mx-auto h-[350px]">
      <label htmlFor={name} className="text-white text-[16px] font-medium">
        {label} <span className="text-[#EF476F]">*</span>
      </label>

      <div
        className=" min-h-[300px]  w-[600px] border border-dashed border-richblack-600 bg-richblack-700 rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-richblack-600 bg-[#3f4455]"
        onClick={handleClick}
      >
        {previewSource ? (
          <img
            src={previewSource}
            alt="Course Thumbnail Preview"
            className="w-full h-full object-contain rounded-md"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 p-4 text-center bg-[#3f4455] ">
          <div className="rounded-full w-[46px] h-[46px] bg-[#171717] flex justify-center items-center"><SlCloudUpload className="text-3xl text-[#FFD60A]" /></div>
            
            <p className="text-[16px] text-[#999DAA]">
              Drag and drop an image, or{" "}
              <span className="text-[#FFD60A] font-semibold">Browse</span>
            </p>
            <p className="text-xs text-[#999DAA]">
              Max 6MB each (12MB for videos)
            </p>
            <ul className="text-xs text-[#999DAA] mt-2">
              <li>• Aspect ratio 16:9</li>
              <li>• Recommended size 1024x576</li>
            </ul>
          </div>
        )}
      </div>

      <input
        type="file"
        id={name}
        {...register(name, { required: true })}
        ref={fileInputRef}
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />

      {errors[name] && (
        <p className="text-sm text-[#EF476F]">Course thumbnail is required</p>
      )}
    </div>
  );
};

export default Thumbnail;
