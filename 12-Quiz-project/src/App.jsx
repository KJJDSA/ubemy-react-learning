import Quiz from "./components/Quiz";

import Header from "./components/Header";
/** Quiz App
 * Rule:
 *  1. questions.js 에는 질문 배열이 있으며, id, 질문, 객관식 답 배열이 있다.
 *  2. 객관식 답 배열의 첫번째 요소가 정답이다.
 *  3. 객관식 답은 출력될 때 순서를 랜덤으로 정렬해야 한다.
 */
function App() {
  /* 💁 생각해봅시다 💁
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  
  선생님의 미션: 이것이 왜 가장 좋은 방법이 아닌지 설명해라.
  ...
  선생님의 답변 : 이 둘 중 하나는 다른 하나를 통해 자연스럽게 알 수 있습니다. activeQuestionIndex 은 답변을 기다리는 quiz요소일 것입니다. 그렇다면 userAnswers 의 길이(length) 가 곧 activeQestionIndex가 될 수 있습니다. 불필요한 state를 줄일 수 있기 때문에 고민해보라 한 것.
  */
  return (
    <>
      <Header />
      <Quiz />
    </>
  );
}

export default App;
