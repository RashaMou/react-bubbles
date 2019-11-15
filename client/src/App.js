import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import BubblePage from "./components/BubblePage";
import Logout from "./components/Logout";

import Login from "./components/Login";
import "./styles.scss";

function App(props) {
  const [loggedIn, setLoggedIn] = useState(false);

  console.log("loggedin?", loggedIn);
  return (
    <Router>
      <div className="App">
        <nav>
          {!loggedIn && <Link to="/">Login</Link>}
          {loggedIn && <Link to="/bubblepage">BubblePage</Link>}
          {loggedIn && <Link to="/logout">Logout</Link>}
        </nav>
        <Switch>
          <Route
            exact
            path="/"
            render={props => <Login {...props} setLoggedIn={setLoggedIn} />}
          />
          <PrivateRoute exact path="/bubblepage" component={BubblePage} />
          <PrivateRoute
            path="/logout"
            render={props => <Logout {...props} setLoggedIn={setLoggedIn} />}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
