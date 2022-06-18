import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import ReactDOM from "react-dom/client";
import { auth } from "./config/firebase";
import App from "./App";

let root;
onAuthStateChanged(auth, (_user) => {
  if (!root) {
    root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
});
