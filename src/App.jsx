import React, { useContext, useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Components/Signup/Signup";
import Login from "./Pages/Login";
import Create from './Pages/Create'
import View from './Pages/ViewPost'
import { authContext } from "./store/Context";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const { user, setUser } = useContext(authContext);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        // User is signed out
        // ...
      }
    });
  });
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<Create />} />
          <Route path="/viewpost" element={<View />} />



        </Routes>
      </Router>
    </div>
  );
}

export default App;
