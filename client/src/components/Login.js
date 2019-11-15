import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <h2>Log In</h2>
      <form>
        <TextField
          id="outlined-username-input"
          label="Username"
          type="username"
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          margin="normal"
          variant="outlined"
        />
        <Button variant="contained" color="primary">
          Log In
        </Button>
      </form>
    </>
  );
};

export default Login;
