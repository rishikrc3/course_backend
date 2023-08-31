import React from "react";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
const Appbar = () => {
  const navigate = useNavigate();
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
              navigate("/signup");
            }}
          >
            Signup
          </Button>
        </div>
        <div>
          <Button
            variant={"contained"}
            onClick={() => {
              navigate("/signin");
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
