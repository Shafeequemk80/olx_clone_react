import React, { useContext, useRef, useState } from "react";
import Logo from "../../olx-logo.png";
import "./Signup.css";
import { FirebaseContext } from "../../store/Context";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast, } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { firestore } = useContext(FirebaseContext);
  const navigate = useNavigate();
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const passeordRef = useRef(null);
  const notify = (error) => toast.error(error, {
    position: "top-right",
autoClose: 2000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark"
    });
    const success = (error) => toast.success(error, {
      position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark"
      });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, {
        displayName: username,
      });

      const userCollection = collection(firestore, "users");
      const obj = {
        id: userCredential.user.uid,
        username: username,
        phone: phone,
      };
      let succ = await addDoc(userCollection, obj);
      if (succ) {
        console.log("sucess added");
      } else {
        console.log("NOT ADDED");
      }
      success("Singup Succesfully")
      setTimeout(() => {
        navigate("/login");
      },3000);
    } catch (error) {
      console.log(error.message);
      notify("Email have alread Exist");
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const validateUsername = (e) => {
    const value = e.target.value.trim();

    if (value !== "") {
      e.target.style.borderColor = "";
      // Reset opacity if username is not empty
      if (usernameRef.current) {
        usernameRef.current.style.opacity = 0;
      }
    } else {
      e.target.style.borderColor = "red";
      // Set opacity to 1 if username is empty
      if (usernameRef.current) {
        usernameRef.current.style.opacity = 1;
      }
    }
    setUsername(value);
  };

  const validateEmail = (e) => {
    const value = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(value)) {
      e.target.style.borderColor = "";
      emailRef.current.style.opacity = 0;
    } else {
      e.target.style.borderColor = "red";
      emailRef.current.style.opacity = 1;
    }
    setEmail(value);
  };

  const validatephone = (e) => {
    const value = e.target.value.trim();
    const phoneNumberRegex = /^\+?(\d{1,3})?[-. (]?\d{3}[-. )]?\d{3}[-. ]?\d{4}$/;
  
    if (phoneNumberRegex.test(value)) {
      e.target.style.borderColor = "";
      phoneRef.current.style.opacity = 0;
    } else {
      e.target.style.borderColor = "red";
      phoneRef.current.style.opacity = 1;
    }
    setPhone(value);
  };
  const validatepassword = (e) => {
    const value = e.target.value.trim();

    if (value !== "" && value.length>6) {
      e.target.style.borderColor = "";
      passeordRef.current.style.opacity = 0;
    } else {
      e.target.style.borderColor = "red";
      passeordRef.current.style.opacity = 1;
    }
    setPassword(value);
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onFocus={validateUsername}
            onChange={validateUsername}
            id="fname"
            name="name"
          />

          <br />
          <small ref={usernameRef} style={{ color: "red", opacity: 0 }}>
            Enter Username
          </small>

          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            
            value={email}
            onFocus={validateEmail}
            onChange={validateEmail}
            id="fname"
            name="email"
          />
          <br />
          <small ref={emailRef} style={{ color: "red", opacity: 0 }}>
            Enter valid email
          </small>
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onFocus={validatephone}
            onChange={validatephone}
            id="lname"
            name="phone"
          />
          <br />
          <small ref={phoneRef} style={{ color: "red", opacity: 0 }}>
            Enter valid phone
          </small>
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            onFocus={validatepassword}
            onChange={validatepassword}
            name="password"
          />

          <br />
          <small ref={passeordRef} style={{ color: "red", opacity: 0 }}>
            Enter valid phone
          </small>
          <br />
          <br />
          <button>Signup</button>
        </form>
        <br />
        <a onClick={handleLogin}>Login</a>
      </div>
      <ToastContainer/>
    </div>
  );
}
