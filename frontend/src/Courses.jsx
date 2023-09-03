import { Button, Card, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
const Courses = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    function callback2(data) {
      console.log(data);
      setCourses(data.courses);
    }
    function callback1(res) {
      res.json().then(callback2);
    }
    fetch("http://localhost:3000/admin/courses", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then(callback1);
  }, []);
  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      Courses
      {/* {JSON.stringify(courses)} */}
      {courses.map((course) => {
        return <Course course={course} />;
      })}
    </div>
  );
};
export function Course({ course }) {
  return <div>{course.description}</div>;
}
export default Courses;
