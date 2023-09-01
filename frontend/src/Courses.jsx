import React, { useEffect } from "react";
import { useState } from "react";
const Courses = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    function callback2(data) {
      console.log(data);
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
    <div>
      <h1>Courses</h1>
    </div>
  );
};

export default Courses;
