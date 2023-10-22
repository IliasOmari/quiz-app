import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";
import { io } from "socket.io-client";

import router from "./routes/route";
const root = ReactDOM.createRoot(document.getElementById("root"));
const socket = io("http://localhost:3001");

export const socketContext = createContext();
root.render(
  <socketContext.Provider value={socket}>
    <RouterProvider router={router} />
  </socketContext.Provider>
);

reportWebVitals();
