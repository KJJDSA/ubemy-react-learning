import { useState, useEffect } from "react";

const ProgressBar = ({ timer }) => {
  const [timeReduce, setTimeReduce] = useState(timer);

  useEffect(
    () => {
      const interval = setInterval(() => {
        setTimeReduce((prev) => prev - 10);
      }, 10);

      return () => {
        clearInterval(interval);
      };
    },
    [] // 의존성 없고 매우 자주 동작하는 interval 분리 = 최적화
  );

  return <progress value={timeReduce} max={timer} />;
};

export default ProgressBar;
