import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";
import { socketContext } from "..";

function QuizMaster() {
  const socket = useContext(socketContext);
  console.log(socket);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [name, setName] = useState("");

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
    const isQuestionValid =
      question.trim() !== "" && options.some((option) => option.trim() !== "");

    if (isQuestionValid) {
      const newQuestion = {
        question,
        choices: options,
        correctAnswer,
      };
      setQuestions((prev) => [...prev, newQuestion]);
      setQuestion("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer(0);
    }
  };

  const sendQuestioner = () => {
    const questioner = {
      questions,
      name,
    };
    socket.emit("sendQuestioner", questioner);
  };

  return (
    <>
      <Card className="quiz-container">
        <Card.Title className="text-center">Quizmaster</Card.Title>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="disabledTextInput">Name Quiz</Form.Label>
            <Form.Control
              id="disabledTextInput"
              placeholder="type a name for the quiz"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
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
            <Form.Select value={correctAnswer} onChange={handleCorrectAnswer}>
              {options.map((option, index) => (
                <option key={index} value={index}>
                  {`Answer ${index + 1}`}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Button onClick={handleSaveQuestion}>Add question</Button>
          <Button onClick={sendQuestioner}>Save</Button>
        </Form>
      </Card>
    </>
  );
}

export default QuizMaster;
