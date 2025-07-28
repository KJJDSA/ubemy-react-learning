import React from "react";
import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";

const Questions = ({
  question,
  onSelectNothing,
  onSelectAnswer,
  answerState,
  selectedAnswer,
}) => {
  return (
    <div id="questions">
      <QuestionTimer
        /* (피드백 3-4) key 를 사용해서 명확하게 state 변경을 감지해 타이머를 초기화한다 */
        key={question.text}
        timeoutSecond={10}
        /* 
          💁 (피드백 3-1)강의에서는 타이머 구현에 완전히 다른 방법(useCallback 사용, key를 써서 타이머 초기화) 을 사용했는데 이유를 몰랐다. 왜 그럤을까?

          - 나는 onTimeout을 의존성으로 넣고 일부러 그 변경마다 타이머가 초기화 되도록 헀다.
          - onTimeout이 변경 될 떄 마다 useEffect가 재실행된다면, 문제를 선택할 때를 제외하고 Quiz 컴포넌트가 절대 재실행되면 안되는 제약이 생긴다. 
          - Quiz 컴포넌트는 문제를 선택할 때 말고도 추가적인 기능에 따라 얼마든지 재생성될 수 있는데, 그럴때마다 타이머가 재생성될테니 문제가 될 것이다.   
          - ⛔️ onTimeout 함수 에는 useCallback 을 걸고 타이머가 onTimeout 이 아닌 다른 변경사항을 기준으로 삼을 수 있도록 수정해야 한다! 
          */
        onTimeout={onSelectNothing}
      ></QuestionTimer>
      <h2>{question.text}</h2>
      <Answers
        answers={question.answers}
        selectedAnswer={selectedAnswer}
        onSelectAnswer={onSelectAnswer}
        answerState={answerState}
      ></Answers>
    </div>
  );
};

export default Questions;
