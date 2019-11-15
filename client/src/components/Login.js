import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axiosWithAuth from "./../utils/axiosWithAuth";

const Login = props => {
  const [userLogin, setUserLogin] = useState({
    username: "",
    password: ""
  });

  const handleChange = e => {
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value
    });
  };

  const login = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/login", userLogin)
      .then(res => {
        props.setLoggedIn(true);
        localStorage.setItem("token", res.data.payload);
        props.history.push("/bubblepage");
      })
      .catch(err => console.log(err));
  };
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <h2>Log In</h2>
      <form onSubmit={login}>
        <label htmlFor="username"></label>
        <TextField
          id="outlined-username-input"
          label="Username"
          type="text"
          name="username"
          margin="normal"
          variant="outlined"
          value={userLogin.username}
          onChange={handleChange}
        />
        <label htmlFor="password"></label>
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          name="password"
          margin="normal"
          variant="outlined"
          value={userLogin.password}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" type="submit">
          Log In
        </Button>
      </form>
    </>
  );
};

export default Login;
