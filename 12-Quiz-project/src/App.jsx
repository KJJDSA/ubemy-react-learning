import { useState } from "react";

import Header from "./components/Header";
import QUESTIONS from "./questions.js";
import Quiz from "./components/ Quiz.jsx";
function shuffle(questions) {
  const copyQuestions = questions.map((question) => {
    const correctAnswer = question.answers[0];
    const randomAnswers = question.answers.sort(() => Math.random() - 0.5);
    return {
      ...question,
      correctAnswer,
      answers: randomAnswers,
      myAnswer: undefined,
      isAnswered: false,
    };
  });
  return copyQuestions;
}

/** Quiz App
 * Rule:
 *  1. questions.js 에는 질문 배열이 있으며, id, 질문, 객관식 답 배열이 있다.
 *  2. 객관식 답 배열의 첫번째 요소가 정답이다.
 *  3. 객관식 답은 출력될 때 순서를 랜덤으로 정렬해야 한다.
 */
function App() {
  /* 모든 데이터가 담긴 state를 만듦 */
  const [quizzes, setQuizzes] = useState(shuffle(QUESTIONS));

  // currnetQuestion, currentQuestionIndex : 현재 질문과 그 인덱스를 새로고침 될 때 마다 생성함
  let currentQuestionIndex;
  const currentQuestion = quizzes.find((quiz, index) => {
    currentQuestionIndex = index;
    return quiz.isAnswered === false;
  });

  // state를 복사해서 답과 답변여부를 수정한다
  function handleSelectAnswer(myAnswer) {
    setQuizzes((prev) => {
      const copyPrev = JSON.parse(JSON.stringify(prev));
      copyPrev[currentQuestionIndex].myAnswer = myAnswer;
      copyPrev[currentQuestionIndex].isAnswered = true;
      return copyPrev;
    });
  }

  return (
    <>
      <Header />
      <Quiz
        currentQuestion={currentQuestion}
        onSelectAnswer={handleSelectAnswer}
      />
    </>
  );
}

export default App;
