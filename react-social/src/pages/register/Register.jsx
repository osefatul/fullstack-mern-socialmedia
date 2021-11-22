import React from "react";
import "./register.css";

function Register() {
  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">WDKSocial</h3>
          <span className="registerDesc">
            Connect with friends and your loved ones
          </span>
        </div>
        <div className="registerRight">
          <div className="registerBox">
            <input placeholder="Username" className="registerInput" />
            <input placeholder="Email" className="registerInput" />
            <input placeholder="Password" className="registerInput" />
            <input placeholder="Confirm Password" className="registerInput" />
            <button className="registerButton">Sign Up</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="registerLoginButton">Log In</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
