import React, { useContext, useEffect, useState } from "react";
import { quiz } from "../quiz";
import "../components/quiz.modules.css";
import { socketContext } from "..";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import Confetti from "react-confetti";
import { v4 as uuidv4 } from "uuid";
import useWindowSize from "react-use/lib/useWindowSize";
import useSound from "use-sound";
import Yay from "./yay.mp3";
//source: https://www.codevertiser.com/quiz-app-using-reactjs/

const Quiz = () => {
  const socket = io("http://localhost:3001/player/party");
  const { width, height } = useWindowSize();
  const { nameQuiz } = useParams();
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [play] = useSound(Yay);

  const [party, setParty] = useState({
    questions: [{ choices: [], correctAnswer: "", question: "" }],
  });
  useEffect(() => {

    socket.emit("nameQuiz", nameQuiz);
    return () => {
      socket.off("nameQuiz");
    };
  }, []);
  useEffect(() => {
    socket.on("getQuestionerData", (data) => {
   
      setParty(data);
    });

    return () => {
      socket.off("getQuestionerData");
    };
  }, [socket]);
  let { questions } = party;
  let { question, choices, correctAnswer } = questions[activeQuestion];
  const onClickNext = () => {
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    );

    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
  };

  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index);
    if (answer === correctAnswer) {
      setSelectedAnswer(true);
    } else {
      setSelectedAnswer(false);
    }
  };

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);

  return (
    <div className="quiz-container">
      {!showResult ? (
        <div>
          <div>
            <span className="active-question-no">
              {addLeadingZero(activeQuestion + 1)}
            </span>
            <span className="total-question">
              /{addLeadingZero(questions.length)}
            </span>
          </div>
          <h2>{question}</h2>
          <ul>
            {choices.map((answer, index) => (
              <li
                onClick={() => onAnswerSelected(answer, index)}
                key={uuidv4()}
                className={
                  selectedAnswerIndex === index ? "selected-answer" : null
                }
              >
                {answer}
              </li>
            ))}
          </ul>
          <div className="flex-right">
            <button
              onClick={onClickNext}
              disabled={selectedAnswerIndex === null}
            >
              {activeQuestion === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      ) : (
        <div className="result">
          {play()}
          <Confetti width={width} height={height} />
          <h3>Results</h3>
          <p>
            Total Questions: <span>{questions.length}</span>
          </p>
          <p>
            Total Score:<span> {result.score}</span>
          </p>
          <p>
            Correct Answers:<span> {result.correctAnswers}</span>
          </p>
          <p>
            Wrong Answers:<span> {result.wrongAnswers}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
