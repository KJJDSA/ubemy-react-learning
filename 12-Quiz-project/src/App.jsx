import Header from "./components/Header";
/** Quiz App
 * Rule:
 *  1. questions.js 에는 질문 배열이 있으며, id, 질문, 객관식 답 배열이 있다.
 *  2. 객관식 답 배열의 첫번째 요소가 정답이다.
 *  3. 객관식 답은 출력될 때 순서를 랜덤으로 정렬해야 한다.
 */
function App() {
  return (
    <>
      <Header />
    </>
  );
}

export default App;
