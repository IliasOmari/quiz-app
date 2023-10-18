import React from "react";
import ProfileChoice from "./components/ProfileChoice";
import io from "socket.io-client";
import "bootstrap/dist/css/bootstrap.min.css";
const socket = io("http://localhost:3001");

function App() {
  return (
    <div>
      <ProfileChoice />
    </div>
  );
}

export default App;
