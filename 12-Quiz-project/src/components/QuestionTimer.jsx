import { useState, useEffect } from "react";

const QuestionTimer = ({ timeoutSecond, onTimeout }) => {
  const timeout = timeoutSecond * 1000;
  const [remainingTime, setRemainingTime] = useState(timeout);

  /* onTimeout에 useEffect가 반응할 때 마다 setInterval 도 초기화되도록 한다. */
  /* interval 주기마다 새로운 timeout 과 interval 이 생성되는 것을 막기 위해, useEffect으로 감싸준다. */
  useEffect(
    () => {
      console.log("setting setTimeout");
      const timeoutTimer = setTimeout(() => {
        onTimeout(null);
      }, timeout);

      console.log("setting setInterval");
      const intervalTimer = setInterval(() => {
        setRemainingTime((prev) => [prev - 100]);
      }, 100);

      return () => {
        clearTimeout(timeoutTimer);
        clearInterval(intervalTimer);
        setRemainingTime(timeout);
      };
    },
    [
      timeoutSecond,
      onTimeout,
    ] /* 의존성이 필요하므로 새로운 useEffect에 감싸서 사용한다. */
  );

  return (
    <progress id="question-time" max={timeout} value={remainingTime}></progress>
  );
};

export default QuestionTimer;
