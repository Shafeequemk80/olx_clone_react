import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import firestore from "./firebase/config";
import { FirebaseContext, UserContext } from "./store/Context";
import Post from "./store/PostContext";
ReactDOM.render(
  <FirebaseContext.Provider value={{ firestore }}>
    <UserContext>
      <Post>
        <App />
      </Post>
    </UserContext>
  </FirebaseContext.Provider>,
  document.getElementById("root")
);
