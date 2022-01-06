import * as ReactDOM from "react-dom";
import React, { useContext, useEffect, useRef, useState } from "react";
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
import Messenger from "./pages/messenger/Messenger";
import { selectUser } from "./features/userSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { io } from "socket.io-client";

function App() {
  const user = useSelector(selectUser);
  const socket = useRef();

  useEffect(() => {
    //Establish websocket connection
    socket.current = io("ws://localhost:8900");
  }, []);

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
        <Route path="/messenger">
          {!user ? <Redirect to="/" /> : <Messenger socket={socket} />}
        </Route>
        <Route path="/profile/:username">
          {user ? <Profile to="/" /> : <Register />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
