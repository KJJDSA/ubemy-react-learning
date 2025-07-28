import React from "react";

const Answers = ({ suffledAnswers, selectedAnswer, answerState, onSelectAnswer }) => {
  return (
    <div id="answers">
      {suffledAnswers.map((answer) => {
        /* (4-2) 선택된 답변의 색깔을 변경하기 */
        let cssClassName = "";
        if (answer === selectedAnswer) {
          switch (answerState) {
            case "selected":
              cssClassName = "selected";
              break;
            case "correct":
              cssClassName = "correct";
              break;
            case "wrong":
              cssClassName = "wrong";
              break;
            default:
              break;
          }
        }
        return (
          <li key={answer} className="answer">
            <button
              onClick={() => onSelectAnswer(answer)}
              className={cssClassName}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </div>
  );
};

export default Answers;
