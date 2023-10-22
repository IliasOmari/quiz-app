import React from "react";
import ProfileChoice from "./components/ProfileChoice";

import "bootstrap/dist/css/bootstrap.min.css";
import { io } from "socket.io-client";

function App() {
  const socket = io("http://localhost:3001");
  return (
    <div>
      <ProfileChoice />
    </div>
  );
}

export default App;
