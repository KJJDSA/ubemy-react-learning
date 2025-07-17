import { useState, useRef } from 'react';
import ResultModal from './ResultModal';

const TimerChallenge = ({ title, targetTime }) => {
  const timer = useRef(); // 타이머를 담는 변수이다. 재렌더링 시 초기화되지 않는다.
  const dialog = useRef(); // dialog html 요소를 참조한다.
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

  function handleStart() {
    timer.current = setTimeout(() => {
      setTimerExpired(true);
      dialog.current.open();
    }, targetTime * 1000);

    setTimerStarted(true); // 이떄 useRef는 초기화되지 않는다.
  }

  function handleStop() {
    console.log(timer.current); // 37, 38.. 변수 때와 똑같이 뜨긴 하지만 어디를 눌러도 이 인스턴스의 타이머가 유지된다.
    clearTimeout(timer.current); // 타이머가 정상적으로 삭제된다.
  }
  /* 타이머에 useRef 를 사용해야 하는 이유: 
  useRef는 DOM 을 참조하는데만 쓰는 것이 아닌, UI를 제외한 다양한 요소를 제어하고자 할 때 사용할 수 있다.
  타이머는 UI 에 직접적인 영향을 주지 않는 요소이지만, 렌더링시 초기화될 경우 제어할 수 있는 포인터를 잃어버린다. 
  때문에 useRef 에 포인터를 저장하여, 이후 UI 의 변동이 있더라도 초기화되지 않고 제어가 가능하다.
  인스턴스 바깥에 변수를 만드는 것 보다 더욱 독립적이며 안정적이다.  
  */

  return (
    <>
      <ResultModal ref={dialog} result="lost" targetTime={targetTime} />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>
        <p>
          <button onClick={timerStarted ? handleStop : handleStart}>
            Stop Challenge
          </button>
        </p>
        <p className={timerStarted ? 'active' : undefined}>
          {timerStarted ? 'Timer is running...' : 'Timer inactive'}
        </p>
      </section>
    </>
  );
};

export default TimerChallenge;
