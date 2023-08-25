const express = require("express");
const app = express();
const port = 3000;
const jwt = require("jsonwebtoken");
let ADMINS = [];
let USERS = [];
let COURSES = [];

const secretKey = "Rishik";
//JWT
const generateJwt = (user) => {
  const payload = { username: user.username };
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
};

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//admin routes
//adming singup
app.post("/admin/signup", (req, res) => {
  const admin = req.body;
  const existingAdmin = ADMINS.find((a) => a.username == admin.username);

  if (existingAdmin) {
    res.status(403).json({ message: "Admin already exists" });
  } else {
    ADMINS.push(admin);
    const token = generateJwt(admin);
    res.json({ message: "Admin created succesfully", token });
  }
});

//admin login
app.post("/admin/login", (req, res) => {
  const { username, password } = req.headers;
  const admin = ADMINS.find(
    (a) => a.username === username && a.password === password
  );

  if (admin) {
    const token = generateJwt(admin);
    res.json({ message: "Logged in succesfully", token });
  } else {
    res.status(403).json({ message: "Amin authentication failed" });
  }
});

//making a course route
app.post("/admin/courses", authenticateJwt, (req, res) => {
  const course = req.body;
  course.id = COURSES.length + 1;
  COURSES.push(course);
  res.json({
    message: "Course created succesfull",
    courseId: course.id,
  });
});

//editing a specific course

app.put("/admin/courses/:courseId", authenticateJwt, (req, res) => {
  const courseId = parseInt(req.params.courseId);

  const courseIndex = COURSES.findIndex((c) => c.id === courseId);

  if (courseIndex > -1) {
    const updatedCourse = { ...COURSES[courseIndex], ...req.body };
    COURSES[courseIndex] = updatedCourse;
    res.json({ message: "Course updated successfully" });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

//accesing all courses
app.get("/admin/courses", authenticateJwt, (req, res) => {
  res.json({ courses: COURSES });
});

//USER ROUTES

//signup
app.post("/users/signup", (req, res) => {
  const user = req.body;
  const existingUser = USERS.find((u) => u.username === user.username);

  if (existingUser) {
    res.status(403).json({ message: "User already exists" });
  } else {
    USERS.push(user);
    const token = generateJwt(user);
    res.json({ message: "User created succesfully", token });
  }
});

app.post("/users/login", (req, res) => {
  const { username, password } = req.headers;
  const user = USERS.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    const token = generateJwt(user);
    res.json({ message: "Logged in sucessfully", token });
  } else {
    res.status(403).json({ message: "Invalid Username" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
