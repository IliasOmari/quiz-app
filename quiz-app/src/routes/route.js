import React from "react";
import App from "../App";

import { createBrowserRouter } from "react-router-dom";
import QuizMaster from "../components/QuizMaster";
import Player from "../components/Player";

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
]);

export default router;
