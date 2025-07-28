import { useState } from "react";
import QUESTIONS from "../questions.js";
import QuizOverImage from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";
import { useCallback } from "react";

const Quiz = () => {
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);

  /* ⭐️ 기존의 state로 값을 파생시키기 
  이전에 activeQuesttionIndex 는 userAnswers 의 길이로 설정하더라도 정확히 작동합니다. 
  
  💁 내 방식과 비교했을 때 

  ✋: 받은 퀴즈 데이터 전체를 state에 추가한다. answer이나 isAnswer등도 추가하여 데이터 전체를 관리한다. 
    - 퀴즈 데이터는 일종의 API 라고 할 수 있다. 
    - answer부분은 사용자의 입력으로 변경되는 로직이다. 반면에 서버로부터 온 원본 데이터는 순서의 변경이 없고 오로지 view로만 사용된다. 
    - 서로의 관심사가 다름에도 하나의 객체에 묶으니 조회할 때나 수정할 때 모두 복잡성이 증가한다. 
    - 또한 state 자체가 무거워져 state의 수정 조회 모두 성능 부하가 증가한다.

  👀: 받은 퀴즈 원본 데이터를 그대로 사용한다. answer은 따로 state로 만들고 isAnswer 성격의 요소는 answer 에서 파생된 값으로 가져온다. 
    - state를 최소한으로 유지하면서 서버원본과 같은 데이터를 사용해 일관성을 보장하고, 각각의 데이터가 가지는 역할에 맞게 분리해서 사용할 수 있다. 
    - 질문이 입력될 때 answer 1차원 배열에 추가만 되므로 낮은 성능부하를 가진다. 
  */
  const answerIsOver = userAnswers.length === QUESTIONS.length;

  if (answerIsOver) {
    return (
      <div id="summary">
        <img src={QuizOverImage} alt="Quiz Over Trophy" />
        <h2>Quiz Over!</h2>
      </div>
    );
  }

  // 재렌더링후 activeQuestionIndex는 마지막 문제가 끝난 후 다음 index 를 가진 문제를 찾지만 없으므로 그 전에 게임을 끝내야 한다.
  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;
  const suffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  suffledAnswers.sort(() => Math.random() - 0.5);

  /* (4-1)한번에 업데이트되지 않고 두번에 걸쳐 업데이트되도록 바꾼다 */
  const handleSelectAnswer = useCallback(function handleSelectAnswer(answer) {
    setAnswerState("answered");
    setUserAnswers((prev) => [...prev, answer]);

    setTimeout(() => {
      if (answer === QUESTIONS[activeQuestionIndex].answers[0]) {
        setAnswerState("correct");
      } else {
        setAnswerState("wrong");
      }
      setTimeout(() => {
        setAnswerState("");
      }, 1000);
    }, 1000);
  }, []);

  /* (피드백 3-5) ⭐️⭐️⭐️ 강의에서 handleSelectNothing 을 만드는 이유 -> useCallback으로 감싼 함수를 써야 하니까. 
  props 에서 함수를 넣을 때 파라미터를 넣을 필요가 있다면 () => {someFunction(foo)} 같이 화살표함수를 넣고는 하는데, 
  이는 jsx에서 초기화 될 때 마다 props에 전달할 함수를 새로 만드는 것과 같다. 
  즉, handleSelectAnswer 를 아무리 useCallback으로 감싸더라도 jsx에서 매번 새로운 함수를 새로운 메모리에 저장해 props로 넘기기 때문에,
  결과적으로 useEffect가 Quiz의 재생성마다 재실행되는 문제가 그대로 발생한다.  
  때문에 명시적으로 이를 추가할 수 있도록 handleSelectNothing 를 따로 정의하여 넣는 번거로움이 필요한 것이다.
  */
  const handleSelectNothing = useCallback(() => handleSelectAnswer(null));

  return (
    <div id="quiz">
      <div id="questions">
        <QuestionTimer
          /* (피드백 3-4) key 를 사용해서 명확하게 state 변경을 감지해 타이머를 초기화한다 */
          key={QUESTIONS[activeQuestionIndex].text}
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
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <div id="answers">
          {suffledAnswers.map((answer) => {
            /* (4-2) 선택된 답변의 색깔을 변경하기 */
            let cssClassName = "";
            if (answer === userAnswers[activeQuestionIndex]) {
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
                  onClick={() => handleSelectAnswer(answer)}
                  className={cssClassName}
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
