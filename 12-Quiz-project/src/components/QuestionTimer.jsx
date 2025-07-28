import { useState, useEffect } from "react";

const QuestionTimer = ({ timeoutSecond, onTimeout, mode }) => {
  const timeout = timeoutSecond * 1000;
  const [remainingTime, setRemainingTime] = useState(timeout);

  /* (피드백 3-2) interval 은 의존성이 필요하지 않으므로, 예측가능성과 사이드이펙트 방지를 위해 의존성 없는 useEffect로 감싼다. */
  useEffect(() => {
    const intervalTimer = setInterval(() => {
      setRemainingTime((prev) => [prev - 10]);
    }, 10);

    return () => {
      clearInterval(intervalTimer);
    };
  }, []);

  /* interval 주기마다 새로운 timeout 이 생성되는 것을 막기 위해, useEffect으로 감싸준다. */
  useEffect(
    () => {
      const timeoutTimer = setTimeout(
        onTimeout /* (피드백 3-3) 재사용성을 위해 파라미터를 타이머 컴포넌트에 넣지 않도록 한다 */,
        timeout
      );

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
    <progress
      id="question-time"
      max={timeout}
      value={remainingTime}
      className={mode}
    ></progress>
  );
};

export default QuestionTimer;
