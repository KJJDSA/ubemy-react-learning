import { useState, useRef } from 'react';
import ResultModal from './ResultModal';

const TimerChallenge = ({ title, targetTime }) => {
  const timer = useRef(); // 타이머를 담는 변수이다. 재렌더링 시 초기화되지 않는다.
  const dialog = useRef(); // dialog html 요소를 참조한다.

  const [remainingTime, setRemainingTime] = useState(targetTime * 1000);
  const [timerIsActive, setTimerIsActive] = useState(false);

  console.log(remainingTime, timerIsActive);

  // 타임아웃(lost)
  if (remainingTime <= 0 && timerIsActive) {
    setTimerIsActive(false);
    clearInterval(timer.current); // 타이머가 정상적으로 삭제된다.
    dialog.current.open();
  }

  function resetTimer() {
    setRemainingTime(targetTime * 1000);
    setTimerIsActive(false);
  }

  function handleStart() {
    timer.current = setInterval(() => {
      // 10밀리초마다 10씩 까임 (결과적으로 targetTime 이 지나면 0이 됨)
      setRemainingTime((prev) => prev - 10);
    }, 10);

    // 타이머가 시작되는 UI 로 변경
    setTimerIsActive(true);
  }

  // 타임아웃 전 버튼을 누름(win)
  function handleStop() {
    clearInterval(timer.current); // 타이머가 정상적으로 삭제된다.
    dialog.current.open();
  }
  /* 타이머에 useRef 를 사용해야 하는 이유: 
  useRef는 DOM 을 참조하는데만 쓰는 것이 아닌, UI를 제외한 다양한 요소를 제어하고자 할 때 사용할 수 있다.
  타이머는 UI 에 직접적인 영향을 주지 않는 요소이지만, 렌더링시 초기화될 경우 제어할 수 있는 포인터를 잃어버린다. 
  때문에 useRef 에 포인터를 저장하여, 이후 UI 의 변동이 있더라도 초기화되지 않고 제어가 가능하다.
  인스턴스 바깥에 변수를 만드는 것 보다 더욱 독립적이며 안정적이다.  
  */

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainingTime={remainingTime}
        onReset={resetTimer}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            Stop Challenge
          </button>
        </p>
        <p className={timerIsActive ? 'active' : undefined}>
          {timerIsActive ? 'Timer is running...' : 'Timer inactive'}
        </p>
      </section>
    </>
  );
};

export default TimerChallenge;
