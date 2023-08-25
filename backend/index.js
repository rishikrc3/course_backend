const express = require("express");
const app = express();
const port = 3000;
const jwt = require("jsonwebtoken");
let ADMINS = [];
let USERS = [];
let COURSES = [];

const secretKey = "Rishik";

const generateJwt = (user) => {
  const payload = { username: user.username };
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
};

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

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
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
