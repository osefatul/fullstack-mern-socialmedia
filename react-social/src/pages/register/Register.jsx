import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { loginError, selectError } from "../../features/userSlice";
function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const fetchError = useSelector(selectError);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmail("");
    setUsername("");
    setPassword("");
    setError(false);

    try {
      if (confirmPassword === password) {
        const res = await axios.post("auths/register", {
          username,
          password,
          email,
        });

        //we can use useHistory as well to go to another link once data is there which means once data is submitted

        res.data && window.location.replace("/login");
        //console.log(res.data);
      } else {
        //we are using an error from the redux. this will turn error variable true we use it only if the passwords dont match
        dispatch(loginError());
      }
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };
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
          <form onSubmit={handleSubmit} className="registerBox">
            <input
              placeholder="Username"
              className="registerInput"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="registerInput"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="registerInput"
              onChange={(e) => setPassword(e.target.value)}
              minLength="6"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="registerInput"
              onChange={(e) => setConfirmPassword(e.target.value)}
              minLength="6"
            />
            <button className="registerButton">Sign Up</button>
            {fetchError && (
              <span style={{ color: "red", textAlign: "center" }}>
                Passwords don't match
              </span>
            )}
            {error && (
              <span style={{ color: "red", textAlign: "center" }}>
                Something went wrong
              </span>
            )}

            <Link to="/login" className="registerLoginLink">
              <button className="registerLoginButton">Log In</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
