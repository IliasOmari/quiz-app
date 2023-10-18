import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../components/profilechoice.modules.css";

function ProfileChoice() {
  return (
    <>
      <Card className="card-container">
        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>
            Welcome to the QuizApp
          </Card.Title>
          <Card.Text style={{ textAlign: "center" }}>Who are you?</Card.Text>
          <Link to="/quizmaster">
            <Button style={{ marginRight: "10px" }}>QuizMaster</Button>
          </Link>
          <Link to="/player">
            <Button variant="warning">Player</Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}

export default ProfileChoice;
