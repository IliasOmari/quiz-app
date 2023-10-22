import React from "react";
import App from "../App";

import { createBrowserRouter } from "react-router-dom";
import QuizMaster from "../components/QuizMaster";
import Player from "../components/Player";
import Quiz from "../components/Quiz";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/quizmaster",
    element: <QuizMaster />,
  },
  {
    path: "/player",
    element: <Player />,
  },

  {
    path: "/player/:nameQuiz",
    element: <Quiz />,
  },
]);

export default router;
