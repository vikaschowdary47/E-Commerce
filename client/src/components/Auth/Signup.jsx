import React, { useState, useEffect } from "react";
import {
  FormControl,
  Input,
  FormHelperText,
  InputLabel,
  Card,
  TextField,
  Button,
} from "@material-ui/core";
import "./Auth.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  return (
    <div className="auth_body">
      <div className="login_content">
        <Card style={{ width: "300px", padding: "20px" }}>
          <form class="form">
            {/* <InputLabel htmlFor="email">Email</InputLabel> */}
            <TextField
              type="email"
              id="login_email"
              label="Email"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              aria-describedby="email_helper"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormHelperText error id="email_helper">
              Error
            </FormHelperText>
            <TextField
              id="login_password"
              type="passowrd"
              label="Password"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              className="mt-4"
              aria-describedby="password_helper"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormHelperText error id="password_helper">
              Error
            </FormHelperText>
            <TextField
              id="login_password"
              type="passowrd"
              label="Retype Password"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              className="mt-4"
              aria-describedby="password_helper"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
            />
            <FormHelperText error id="password_helper">
              Error
            </FormHelperText>

            <div className="login_buttons">
              <Button variant="contained" color="primary">
                Sign Up
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
