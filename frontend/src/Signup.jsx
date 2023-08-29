import React from "react";
import TextField from "@mui/material/TextField";
import { Card, Typography } from "@mui/material";
import Button from "@mui/material/Button";
const Signup = () => {
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

      <center>
        <div
          style={{
            border: "2px solid black",
            width: 400,
          }}
        >
          Username
          <input type="text" />
          <br />
          Password
          <input type="password" />
          <br />
          <Button variant="contained">Singup</Button>
        </div>
      </center>
    </>
  );
};

export default Signup;
