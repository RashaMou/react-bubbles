import React from "react";
import { Redirect } from "react-router-dom";

function Logout(props) {
  localStorage.removeItem("token");
  props.setLoggedIn(false);

  return <Redirect to="/" />;
}

export default Logout;
