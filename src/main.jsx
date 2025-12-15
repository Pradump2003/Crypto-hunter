import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import CryptoContext from "./context/CryptoContext";
import "react-alice-carousel/lib/alice-carousel.css";
import "./utils/chart";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CryptoContext>
      <App />
    </CryptoContext>
  </React.StrictMode>
);
