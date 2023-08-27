//This is used to connect to a mongo database

const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const app = express();
const dbURI =
  "mongodb+srv://rishikrc3:rishikrc3@cluster0.ucrbyp1.mongodb.net/courses";
app.use(express.json());
// Define a route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

const SECRET = "Secret";

const userSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
});

const adminSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
});
const courseSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  price: { type: Number },
  imageLink: { type: String },
  published: { type: Boolean },
});

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Course = mongoose.model("Course", courseSchema);

// Define the port where your server will listen
const port = process.env.PORT || 3000;

// Connect to the MongoDB database
mongoose
  .connect(dbURI, {
    useNewUrlParser: true, // Use new URL parser
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.post("/admin/signup", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (admin) {
    res.status(403).json({ message: "Admin already exists" });
  } else {
    const obj = { username: username, password: password };
    const newAdmin = new Admin(obj);
    newAdmin.save();
    const token = jwt.sign({ username, role: "admin" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Admin created successfully", token });
  }
});

app.post("/admin/login", async (req, res) => {
  const { username, password } = req.headers;
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    const token = jwt.sign({ username, role: "admin" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in succesfully", token });
  } else {
    res.status(403).json({ message: "invalid username or password" });
  }
});
app.post("/admin/courses", async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.json({ message: "Course created succesfully", courseId: course.id });
});

app.get("/admin/courses", async (req, res) => {
  const courses = await Course.find({});
  res.json({ courses });
});

//USER ROUTES

//user signup
app.post("/user/signup", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    res.json({ message: "User already exists" });
  } else {
    const newUser = new User({ username: username, password: password });
    await newUser.save();
    const token = jwt.sign({ username, role: "user" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "User created succesfully", token });
  }
});

//user login
app.post("/user/login", async (req, res) => {
  const { username, password } = req.headers;
  const user = await User.findOne({ username, password });

  if (user) {
    const token = jwt.sign({ username: username, role: "user" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in succesfully", token });
  } else {
    res.json({ message: "Invalid username or password" });
  }
});

app.get("/user/courses", authenticateJwt, async (req, res) => {
  const courses = await Course.find({ published: true });
  res.json({ courses });
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
