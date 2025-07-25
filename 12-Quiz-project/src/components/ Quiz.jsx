import React from "react";

const Quiz = ({ currentQuestion, onSelectAnswer }) => {
  return (
    <div id="quiz">
      <div id="question">
        <h2>{currentQuestion.text}</h2>
        <div id="answers">
          {currentQuestion.answers.map((answer) => {
            return (
              <li key={answer} className="answer">
                <button onClick={() => onSelectAnswer(answer)}>{answer}</button>
              </li>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
