const express = require("express");
const app = express();
const port = 3000;
let ADMINS = [];
let USERS = [];
let COURSES = [];

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
    res.json({ message: "Adming created succesfully" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
