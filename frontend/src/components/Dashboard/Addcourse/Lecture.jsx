import React, { useState, useRef } from "react";
import { SlCloudUpload } from "react-icons/sl";

const Lecture = ({ label, register, errors, setValue, getValues }) => {
  const [previewSource, setPreviewSource] = useState(null);
  const [videoName, setVideoName] = useState("");
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      setValue("lecturevideo", file); // Set the file into react-hook-form
    };
    setVideoName(file.name);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is a video
      if (!file.type.includes("video")) {
        alert("Please upload a video file");
        return;
      }
      previewFile(file);
    }
  };

  return (
    <div className="flex flex-col gap-2 mx-auto w-[601px] h-[418px]">
      <label htmlFor={label} className="text-white text-[16px] font-medium">
        {label} <span className="text-[#EF476F]">*</span>
      </label>

      <div
        className="min-h-[200px] w-full h-[418px] border-richblack-600 bg-richblack-700 rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-richblack-600 bg-[#3f4455] border-dashed border-2 border-[#E2E2E2] "
        onClick={handleClick}
      >
        {previewSource ? (
          <div className="w-full p-4 flex flex-col items-center">
            <video 
              src={previewSource} 
              controls 
              className="w-full max-h-[300px] object-contain rounded-md mb-2"
            />
            <p className="text-richblack-50 truncate max-w-full">{videoName}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 p-4 text-center">
            <div className="rounded-full w-[106px] h-[100px] bg-[#171717] flex justify-center items-center">
              <SlCloudUpload className="text-3xl text-[#FFD60A]" />
            </div>
            <p className="text-[16px] text-[#999DAA]">
              Drag and drop a video, or{" "}
              <span className="text-[#FFD60A] font-semibold">Browse</span>
            </p>
            <p className="text-xs text-[#999DAA]">
              Max 12MB for videos
            </p>
            <ul className="text-xs text-[#999DAA] mt-2">
              <li>• Supported formats: MP4, WebM, MOV</li>
              <li>• Recommended resolution: 720p or higher</li>
            </ul>
          </div>
        )}
      </div>

      <input
        type="file"
        id="lecturevideo"
        {...register(label, { required: true })}
        ref={fileInputRef}
        accept="video/*"
        onChange={handleChange}
        className="hidden"
      />

      {/* {errors.label && (
        <p className="text-sm text-[#EF476F]">Lecture video is required</p>
      )} */}
    </div>
  );
};

export default Lecture;
