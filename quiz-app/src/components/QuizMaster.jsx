import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";

const socket = io("http://localhost:3001");

function QuizMaster() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [questions, setQuestions] = useState([]);

  const handleQuestion = (e) => {
    setQuestion(e.target.value);
  };

  const handleOption = (e, index) => {
    const updatedOptions = [...options];
    updatedOptions[index] = e.target.value;
    setOptions(updatedOptions);
  };

  const handleCorrectAnswer = (e) => {
    setCorrectAnswer(Number(e.target.value));
  };

  const handleSaveQuestion = () => {
    socket.emit("sendMessage", { questions });

    const isQuestionValid =
      question.trim() !== "" && options.some((option) => option.trim() !== "");

    if (isQuestionValid) {
      const newQuestion = {
        question,
        options,
        correctAnswer,
      };
      setQuestions((prev) => [...prev, newQuestion]);
      console.log(questions);
      setQuestion("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer(0);
    }
  };

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      alert(data.message);
    });
  }, [socket]);

  return (
    <>
      <Card className="quiz-container">
        <Card.Title className="text-center">Quizmaster</Card.Title>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="disabledTextInput">Question:</Form.Label>
            <Form.Control
              id="disabledTextInput"
              placeholder="type a question"
              value={question}
              onChange={handleQuestion}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="disabledSelect">Answer options:</Form.Label>
            {options.map((option, index) => (
              <InputGroup className="mb-3" key={index}>
                <Form.Control
                  type="text"
                  placeholder={`Answer ${index + 1}`}
                  value={option}
                  onChange={(e) => handleOption(e, index)}
                />
              </InputGroup>
            ))}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="disabledSelect">Correct answer:</Form.Label>
            <Form.Select
              value={correctAnswer}
              onChange={handleCorrectAnswer}
            >
              {options.map((option, index) => (
                <option key={index} value={index}>
                  {`Answer ${index + 1}`}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Button onClick={handleSaveQuestion}>Save</Button>
        </Form>
      </Card>

      <ul>
        {questions.map((q, index) => (
          <li key={index}>
            Vraag: {q.question}
            <br />
            Antwoordopties: {q.options.join(", ")}
            <br />
            Juiste antwoord: {`Antwoordoptie ${q.correctAnswer + 1}`}
          </li>
        ))}
      </ul>
    </>
  );
}

export default QuizMaster;
