import { useState } from "react";
import QuizOverImage from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.js";
const Summery = ({ userAnswers }) => {
  let skippedCount = 0;
  let correctlyCount = 0;
  let incorrectlyCount = 0;

  QUESTIONS.forEach((question, index) => {
    const correctAnswer = question.answers[0];
    if (userAnswers[index] === null) {
      skippedCount++;
    } else if (userAnswers[index] === correctAnswer) {
      correctlyCount++;
    } else {
      incorrectlyCount++;
    }
  });

  return (
    <div id="summary">
      <img src={QuizOverImage} alt="Quiz Over Trophy" />
      <h2>Quiz Completed!!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">
            {Math.round((skippedCount / userAnswers.length) * 100)}%
          </span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">
            {Math.round((correctlyCount / userAnswers.length) * 100)}%
          </span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">
            {Math.round((incorrectlyCount / userAnswers.length) * 100)}%
          </span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          let cssClass = "user-answer";
          if (answer === null) {
            cssClass += " skipped";
          } else if (answer === QUESTIONS[index].answers[0]) {
            cssClass += " correct";
          } else {
            cssClass += " wrong";
          }
          return (
            <li key={QUESTIONS[index].text + (answer ?? "skipped")}>
              <h3>{QUESTIONS[index].id}</h3>
              <p className="question">{QUESTIONS[index].text}</p>
              <p className={cssClass}>{answer ?? "Skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Summery;
