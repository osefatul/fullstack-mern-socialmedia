import React from "react";
import * as ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import { selectUser } from "./features/userSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const user = useSelector(selectUser);

  useEffect(() => {
    localStorage.getItem("userInfo");
  }, [user]);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Register />}
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/profile/:username">
          {user ? <Profile to="/" /> : <Register />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
