import React, { useRef } from "react";
import "./login.css";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
  };
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
            <input
              placeholder="Email"
              className="loginInput"
              ref={emailRef}
              required
            />
            <input
              placeholder="Password"
              type="password"
              className="loginInput"
              ref={passwordRef}
              required
              minLength="6"
            />
            <button className="loginButton">Log In</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">Creat a new account</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
