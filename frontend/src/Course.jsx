import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, TextField, Button } from "@mui/material";
const Course = () => {
  let { courseId } = useParams();
  const [courses, setCourses] = useState([]);
  function callback2(data) {
    console.log(data);
    setCourses(data);
  }
  function callback1(res) {
    res.json().then(callback2);
  }
  useEffect(() => {
    fetch("http://localhost:3000/admin/courses/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then(callback1);
  }, []);

  return (
    <>
      {courseId}
      <br />
      {JSON.stringify(courses)}
      <br></br>
    </>
  );
};

export default Course;
