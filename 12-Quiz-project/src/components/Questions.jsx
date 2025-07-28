import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";
import { useCallback, useState } from "react";
import QUESTIONS from "../questions.js";

const Questions = ({ index, onSelectAnswer }) => {
  /* 
  ⭐️ selectedAnswer 이나 answerState 등은 굳이 Quiz에 있을 필요가 없다. 
  1. Questions으로 두 state를 내릴 경우 처음 클릭했을 때 오답여부를 강조하는 기능 자체를 아래 컴포넌트에서 처리하게 할 수 있다
    같은 계층에 있을 때 userAnswers 등이 변화하여 추가로 제어를 해야했던 문제 등을 최소화할 수 있음(컴포넌트 분리 이점 1)
  2. selectedAnswer answerState 등을 사용 후 다시 초기화해주는 로직이 필요 없다. 
    그냥 Questions 컴포넌트를 key 를 사용해 초기화해주면 됨(컴포넌트 분리 이점 2)
  */
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  const handleSelectAnswer = useCallback(function handleSelectAnswer(answer) {
    setAnswer((prev) => ({
      ...prev,
      selectedAnswer: answer,
    }));

    if (answer === null) {
      /* 아무것도 선택하지 않았을 경우 바로 초기화 */
      onSelectAnswer(answer);
    } else {
      setTimeout(() => {
        setAnswer((prev) => ({
          ...prev,
          isCorrect: answer === QUESTIONS[index].answers[0],
        }));
        setTimeout(() => {
          onSelectAnswer(answer);
        }, 1000);
      }, 1000);
    }
  }, []);

  /* (피드백 3-5) ⭐️⭐️⭐️ 강의에서 handleSelectNothing 을 만드는 이유 -> useCallback으로 감싼 함수를 써야 하니까. 
  props 에서 함수를 넣을 때 파라미터를 넣을 필요가 있다면 () => {someFunction(foo)} 같이 화살표함수를 넣고는 하는데, 
  이는 jsx에서 초기화 될 때 마다 props에 전달할 함수를 새로 만드는 것과 같다. 
  즉, handleSelectAnswer 를 아무리 useCallback으로 감싸더라도 jsx에서 매번 새로운 함수를 새로운 메모리에 저장해 props로 넘기기 때문에,
  결과적으로 useEffect가 Quiz의 재생성마다 재실행되는 문제가 그대로 발생한다.  
  때문에 명시적으로 이를 추가할 수 있도록 handleSelectNothing 를 따로 정의하여 넣는 번거로움이 필요한 것이다.
  */
  const handleSelectNothing = useCallback(() => handleSelectAnswer(null), []);
  return (
    <div id="questions">
      <QuestionTimer
        /* (피드백 3-4) key 를 사용해서 명확하게 state 변경을 감지해 타이머를 초기화한다 */
        key={QUESTIONS[index].text}
        timeoutSecond={10}
        /* 
          💁 (피드백 3-1)강의에서는 타이머 구현에 완전히 다른 방법(useCallback 사용, key를 써서 타이머 초기화) 을 사용했는데 이유를 몰랐다. 왜 그럤을까?

          - 나는 onTimeout을 의존성으로 넣고 일부러 그 변경마다 타이머가 초기화 되도록 헀다.
          - onTimeout이 변경 될 떄 마다 useEffect가 재실행된다면, 문제를 선택할 때를 제외하고 Quiz 컴포넌트가 절대 재실행되면 안되는 제약이 생긴다. 
          - Quiz 컴포넌트는 문제를 선택할 때 말고도 추가적인 기능에 따라 얼마든지 재생성될 수 있는데, 그럴때마다 타이머가 재생성될테니 문제가 될 것이다.   
          - ⛔️ onTimeout 함수 에는 useCallback 을 걸고 타이머가 onTimeout 이 아닌 다른 변경사항을 기준으로 삼을 수 있도록 수정해야 한다! 
          */
        onTimeout={handleSelectNothing}
      ></QuestionTimer>
      <h2>{QUESTIONS[index].text}</h2>
      <Answers
        answers={QUESTIONS[index].answers}
        selectedAnswer={answer.selectedAnswer}
        onSelectAnswer={handleSelectAnswer}
        answerState={answer.isCorrect}
      ></Answers>
    </div>
  );
};

export default Questions;
