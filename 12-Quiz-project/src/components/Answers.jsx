import { useRef } from "react";

const Answers = ({ answers, selectedAnswer, answerState, onSelectAnswer }) => {
  /* 섞는 부분을 컴포넌트 아래로 가져온다. Quiz에 꼭 있어야 할 이유가 없다면 비대해진 Quiz를 줄이는 방향*/
  const suffledAnswers = useRef();
  /* answers 를 섞지 말아야 할 타이밍에는 섞지 못하도록 한다. */
  if (suffledAnswers.current === undefined) {
    suffledAnswers.current = [...answers];
    suffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <div id="answers">
      {suffledAnswers.current.map((answer) => {
        /* (4-2) 선택된 답변의 색깔을 변경하기 */
        let cssClassName = "";
        if (answer === selectedAnswer) {
          if (answerState === null) {
            cssClassName = "selected";
          } else {
            cssClassName = answerState ? "correct" : "wrong";
          }
        }
        return (
          <li key={answer} className="answer">
            <button
              onClick={() => onSelectAnswer(answer)}
              className={cssClassName}
              /* 답변을 선택했을 경우 disabled 속성 추가 */
              disabled={selectedAnswer !== ""}
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
