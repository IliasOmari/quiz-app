import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { io } from "socket.io-client";
import "../components/quiz.modules.css";

const Player = () => {
  const socket = io("http://localhost:3001/player");
  const [quizList, setQuizList] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("quizlist");
    });
  }, []);

  useEffect(() => {
    socket.on("getQuestioner", (data) => {
      if (data.length !== 0) {
        setQuizList(data);
        setIsEmpty(false);
      }
    });
    return () => {
      socket.off("getQuestioner");
    };
  }, [socket]);
  return (
    <div>
      <h1
        style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px" }}
      >
        Quizzes
      </h1>

      {isEmpty ? (
        <p>No quizzes at the moment 😢</p>
      ) : (
        quizList.map((el, index) => (
          <div
            key={index}
            className="quiz"
            style={{
              display: "flex",
              gap: "10px",
              backgroundColor: "white",
              padding: "10px",
              borderRadius: "10px",
              alignItems: "center",
              marginBottom: "20px",
              justifyContent: "space-between",
            }}
          >
            <h3
              style={{
                marginBottom: "0px",
                fontSize: "20px",
              }}
            >
              Quiz of {el.name}
            </h3>
            <Link to={`/player/${el.name}`}>
              <Button style={{}}>Join</Button>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Player;
