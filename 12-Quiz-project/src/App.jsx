import { useState } from "react";

import Header from "./components/Header";
/** Quiz App
 * Rule:
 *  1. questions.js 에는 질문 배열이 있으며, id, 질문, 객관식 답 배열이 있다.
 *  2. 객관식 답 배열의 첫번째 요소가 정답이다.
 *  3. 객관식 답은 출력될 때 순서를 랜덤으로 정렬해야 한다.
 */
function App() {
  /* 선생님이 최초 제안: 현재 표시할 질문의 index 를 상태로 저장 */
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  /* 선생님이 최초 제안: 유저가 index 번째 출제된 문제의 답을 배열로 저장함*/
  const [userAnswers, setUserAnswers] = useState([]);
  
  /* 💁 생각해봅시다 💁
  선생님의 미션: 이것이 왜 가장 좋은 방법이 아닌지 설명해라.

  일단 activeQuestionIndex 같은 것은 필요하다. App이 초기화 될 때마다 어디부터 시작하면 되는지를 저장해야한다. 
  하지만 이것만으로는 부족하다. 컴포넌트 바깥이든 안쪽이든 질문의 순서를 랜덤으로 섞은 배열이 따로 필요하다. 만든다면 내부에 만들게 될 것이고 useState가 추가로 필요해진다. 
    그렇다면? 총 3개의 useState를 필요로 하게 될 것이다. 
  만약에 나라면 최초에 한번 questions.js 를 깊은 복사를 한 후, map 을 돌려 answer, isAnswered 필드를 추가할 것이다. 
    이후 해당 배열을 랜덤으로 정렬해 useState로 state를 만든다. 
    질문이 진행될 때마다 해당 state를 index순으로 검사할텐데, isAnswered 가 false인 앞번 index를 질문에 띄운다. 
    답변이 완료되고 다음버튼을 누르면 answer 필드에는 답변을, isAnswered 에는 true를 저장한다. 
    state가 변경되었으므로 App.jsx 는 리렌더링이 이어지고, 그럼 현재 상황을 가리키는 state가 추가로 필요 없이 바로 다음 문제가 보이게 될 것이다. 물론 answer state도 필요없으므로 정보의 파편화를 없애고 한개의 state에서 모든 정보를 제어할 수 있을 것이다. 
      이는 선언적으로 작동하는 react의 철학과도 잘 어울린다고 생각이 들고, 이후 확장성도 나쁘지 않을 것이다. 
      만약 질문을 점프하는 기능까지 필요하다면 현재 질문을 가리키는 index 까지는 state로 만들어도 좋을것 같다.
  */
  return (
    <>
      <Header />
    </>
  );
}

export default App;
