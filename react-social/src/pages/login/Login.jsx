import React, { useRef, useState } from "react";
import "./login.css";
import { useDispatch } from "react-redux";
import {
  credentialsFetched,
  login,
  loginError,
  selectError,
  selectIsFetching,
  selectUser,
} from "../../features/userSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const user = useSelector(selectUser);
  const error = useSelector(selectError);
  const isFetching = useSelector(selectIsFetching);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        header: {
          "content-type": "application/json",
        },
      };

      //if both values of the inputs are there or not empty
      if (emailRef.current.value && passwordRef.current.value) {
        //if there is data in the form to submit lets dispatch the below action to turn the fetching on.
        dispatch(credentialsFetched());

        const res = await axios.post(
          "/auths/login",
          {
            email: emailRef.current.value,
            password: passwordRef.current.value,
          }
          //config
        );

        //send data
        dispatch(login(res.data));
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        res.data && window.location.replace("/");
        console.log(res);
      } else {
        //we are using an error from the redux. this will turn error variable true
        dispatch(loginError());
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log("Data is fetching ? " + isFetching);
  console.log(user);
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">WDKSocial</h3>
          <span className="loginDesc">
            Connect with friends and your loved ones
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input placeholder="Email" className="loginInput" ref={emailRef} />
            <input
              placeholder="Password"
              type="password"
              className="loginInput"
              ref={passwordRef}
              minLength="6"
            />

            <button className="loginButton" type="submit" disabled={isFetching}>
              Login
            </button>
            {error && (
              <span style={{ color: "red", textAlign: "center" }}>
                Please enter your login credentials
              </span>
            )}
            <span className="loginForgot">Forgot Password?</span>
            <Link to="/register" className="loginRegisterLink">
              <button className="loginRegisterButton">
                Creat a new account
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
