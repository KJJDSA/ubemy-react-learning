import {useState, useRef} from 'react'


const TimerChallenge = ({title, targetTime}) => {
  let timer; // 타이머를 담는 변수이다. 재 렌더링시 초기화된다.
  const [timerStarted, setTimerStarted]= useState(false)
  const [timerExpired, setTimerExpired]= useState(false)

  function handleStart() {
    timer = setTimeout(() => {
      setTimerExpired(true)
    }, targetTime * 1000)

    setTimerStarted(true)
  }

  function handleStop(){
    console.log(timer) // undefined
    clearTimeout(timer) //  초기화된 timer를 clear해봤자 타이머는 막지 못한다. you lose! 
  }

  return (
    <section className="challenge">
      <h2>{title}</h2>
      {timerExpired&& <p>You lost!</p>}
      <p className="challenge-time">
        {targetTime} second{targetTime > 1 ? 's' : ''}
      </p>
      <p>
        <button onClick={timerStarted? handleStop : handleStart}>
          Stop Challenge
        </button>
      </p>
      <p className={timerStarted ? 'active' : undefined}>
        {timerStarted ? 'Timer is running...' : 'Timer inactive'}
      </p>
    </section>
  )
}

export default TimerChallenge
