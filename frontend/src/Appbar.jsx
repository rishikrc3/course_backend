import React from "react";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
const Appbar = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 4,
      }}
    >
      <div style={{ marginLeft: 10 }}>
        <Typography variant={"h6"}>Coursera</Typography>
      </div>
      <div style={{ display: "flex" }}>
        <div>
          <Button
            variant={"contained"}
            style={{ marginRight: 10 }}
            onClick={() => {
              window.location = "/signup";
            }}
          >
            Signup
          </Button>
        </div>
        <div>
          <Button
            variant={"contained"}
            onClick={() => {
              window.location = "/signin";
            }}
          >
            Signup
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
