import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { WaveProvider } from "./context/waveContext";

ReactDOM.render(
  <React.StrictMode>
    <WaveProvider>
      <App />
    </WaveProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
