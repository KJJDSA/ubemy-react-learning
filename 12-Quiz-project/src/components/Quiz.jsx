import { useState } from "react";
import QUESTIONS from "../questions.js";

const Quiz = () => {
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
  const activeQuestionIndex = userAnswers.length;

  function handleSelectAnswer(answer) {
    setUserAnswers((prev) => [...prev, answer]);
  }

  console.log(userAnswers);
  return (
    <div id="quiz">
      <div id="questions">
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <div id="answers">
          {QUESTIONS[activeQuestionIndex].answers.map((answer) => {
            return (
              <li key={answer} className="answer">
                <button onClick={() => handleSelectAnswer(answer)}>
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
