import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Card, Typography } from "@mui/material";
import Button from "@mui/material/Button";
const Signin = () => {
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
        <Typography variant={"h6"}>Welcome back! Sign in below</Typography>
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
          <Button size={"large"} variant="contained">
            {" "}
            Sigin
          </Button>
        </Card>
      </div>
    </>
  );
};

export default Signin;
