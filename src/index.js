import React from "react";
import ReactDOM from "react-dom/client";

import { auth } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";

import App from "./App";

import { ModeContextProvider } from "./context/ModeContext";

let root;
onAuthStateChanged(auth, (_user) => {
  if (!root) {
    root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(
      <React.StrictMode>
        <ModeContextProvider>
          <App />
        </ModeContextProvider>
      </React.StrictMode>
    );
  }
});
