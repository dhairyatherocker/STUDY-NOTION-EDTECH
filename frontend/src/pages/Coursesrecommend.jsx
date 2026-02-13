
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getcourseId, getrecommendedcourse } from "../services/recommender";
import { allcourses } from "../services/coursecaller";
import Allcourses from "./Allcourses";

const Coursesrecommend = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const [recommendedIds, setRecommendedIds] = useState([]); 
  const [allCourseData, setAllCourseData] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  
  const getAllIds = async () => {
    try {
      const ids = await getcourseId(token);
      if (ids?.length > 0) {
        const lastId = ids[ids.length - 1];
        const recIds = await getrecommendedcourse(token, lastId);
        console.log("rcommended course iDS",recIds);
        setRecommendedIds(recIds?.data?.dat?.recommendations || []); 
      }
    } catch (error) {
      console.log(error);
    }
  };

  
  const getAllCourses = async () => {
    try {
      const response = await allcourses();
      console.log("all course in app courses courses recoommend page",response);
      setAllCourseData(response);
    } 
    catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (recommendedIds.length > 0 && allCourseData.length > 0) {
      const filtered = allCourseData.filter(course =>
        recommendedIds.includes(course._id)
      );
      if(recommendedIds.length ===0) setFilteredCourses(allCourseData);
      else setFilteredCourses(filtered);
    }
  }, [recommendedIds, allCourseData]);

  useEffect(() => {
    getAllIds();
    getAllCourses();
  }, []);

  return (
    <div>
      <Allcourses course={filteredCourses}  />
    </div>
  );
};

export default Coursesrecommend;

