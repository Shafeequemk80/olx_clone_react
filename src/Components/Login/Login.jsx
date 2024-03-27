import React, { useContext, useState } from "react";
import { FirebaseContext } from "../../store/Context";
import Logo from "../../olx-logo.png";
import "./Login.css";
import {
  getAuth,
  signInWithEmailAndPassword,
  validatePassword,
} from "firebase/auth";
import { Await, useNavigate } from "react-router-dom";
import { ToastContainer, toast, } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const notify = (error) => toast.error(error, {
    position: "top-right", theme: "dark",
    autoClose:2000
    });
    const success = (error) => toast.success(error, {
      position: "top-right", theme: "dark",
      autoClose:2000
      });
      

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { firebase } = useContext(FirebaseContext);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
     return   notify("Invalid Password");
    }
    if (!validateEmail(email)) {
      return notify("Invalid Email");
    }
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        success("Login successfully")
        console.log(user);
        setTimeout(() => {
          
        navigate("/");
        }, 2000);
      })
      .catch((error) => {
        notify("Invalid Email and Password");
      });
  };
  const handleSignup = () => {
    navigate("/signup");
  };
  const validatePassword = (input) => {
    return input.length >= 6;
  };
  const validateEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            id="fname"
            name="email"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            name="password"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <br />

        <a onClick={handleSignup}>Signup</a>
      </div>

      <ToastContainer/>
    </div>
  );
}

export default Login;
