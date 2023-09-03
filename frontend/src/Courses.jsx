import { Button, Card, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  return (
    <Card
      style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        padding: 20,
      }}
    >
      <Typography textAlign={"center"} variant="h5">
        {course.title}
      </Typography>
      <Typography textAlign={"center"} variant="subtitle1">
        {course.description}
      </Typography>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            navigate("/course/" + course._id);
          }}
        >
          Edit
        </Button>
      </div>
    </Card>
  );
}
export default Courses;
