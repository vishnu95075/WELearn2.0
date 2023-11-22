import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import './Login.css'
import Navbar from '../Navbar/Navbar';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = (e) => {
    e.preventDefault();
    if (email.length <= 4 || password.length < 6) {

      setErrorMsg("Fill The Valid Value ");
      return;
    }
    setErrorMsg("");
    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        navigate("/");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };
  return (
    <>
    <Navbar/>
      <div className="registration-LogIn-form ">
        <form className="needs-validation jumbotron"  >
          <h3>Log In</h3>

          <div className="form-group">
            <label>Email </label>
            <input type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <small
              id="emailHelp"
              className="form-text text-muted"
            >We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label >Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={handleSubmission}
            disabled={submitButtonDisabled}
          >
            Log In
          </button>

          <p>
            <span style={{ color: "red" }}>{errorMsg ? errorMsg : ""}</span><br />
            Already you haven't an account?{" "}
            <span>
              <Link to="/">Sign Up</Link>
            </span>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
