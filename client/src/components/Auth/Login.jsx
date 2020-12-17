import React, { useState, useEffect } from "react";
import {
  FormControl,
  Input,
  FormHelperText,
  InputLabel,
  Card,
  TextField,
} from "@material-ui/core";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div
      style={{
        marginTop: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card style={{ width: "300px", padding: "20px" }}>
        <form>
          {/* <InputLabel htmlFor="email">Email</InputLabel> */}
          <TextField
            type="email"
            id="email"
            label="Email"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            type="passowrd"
            label="Password"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>
      </Card>
    </div>
  );
};

export default Login;
