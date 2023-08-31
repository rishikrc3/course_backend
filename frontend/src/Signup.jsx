import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Card, Typography } from "@mui/material";
import Button from "@mui/material/Button";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <div
        style={{
          paddingTop: 150,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant={"h6"}>
          Welcome to Coursera. Sign up below
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card varint={"outlined"} style={{ width: 400, padding: 20 }}>
          <TextField
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            fullWidth={true}
            label="Email"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            fullWidth={true}
            label="Password"
            variant="outlined"
            type={"password"}
          />
          <br />
          <br />
          <Button
            size={"large"}
            variant="contained"
            onClick={() => {
              console.log(email);
              console.log(password);

              fetch("http://localhost:3000/admin/signup", {
                method: "POST",
                body: JSON.stringify({
                  email,
                  password,
                }),
              });
            }}
          >
            {" "}
            Signup
          </Button>
        </Card>
      </div>
    </>
  );
};

export default Signup;
