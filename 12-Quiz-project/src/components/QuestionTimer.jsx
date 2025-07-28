import { useState, useEffect } from "react";

const QuestionTimer = ({ timeoutSecond, onTimeout }) => {
  const timeout = timeoutSecond * 1000;
  const [remainingTime, setRemainingTime] = useState(timeout);

  /* interval주기마다 새로운 interval이 생성되는것을 막기 위해, useEffect를 사용하여 재실행되지 않게 해준다. */
  useEffect(
    () => {
      const intervalTimer = setInterval(() => {
        setRemainingTime((prev) => [prev - 100]);
      }, 100);

      return () => {
        clearInterval(intervalTimer);
      };
    },
    [] /* 의존성이 비어있으므로 Effect가 재실행되지 못한다. */
  );

  /* interval 주기마다 새로운 timeout 이 생성되는 것을 막기 위해, useEffect으로 감싸준다. */
  useEffect(
    () => {
      const timeoutTimer = setTimeout(() => {
        onTimeout(null);
      }, timeout);

      return () => {
        clearTimeout(timeoutTimer);
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
