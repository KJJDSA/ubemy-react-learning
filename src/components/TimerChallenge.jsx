import {useState, useRef} from 'react'


let timer; // 타이머를 담는 변수이다. 재렌더링 시 초기화되지 않는다. 
const TimerChallenge = ({title, targetTime}) => {
  const [timerStarted, setTimerStarted]= useState(false)
  const [timerExpired, setTimerExpired]= useState(false)
  console.log(timer)// setTimerStarted(true) 후 재랜더링시 37, 31 등의 숫자가 담긴다. 
  function handleStart() {
    timer = setTimeout(() => {
      setTimerExpired(true)
    }, targetTime * 1000)

    setTimerStarted(true)
  }

  function handleStop(){
    console.log(timer) // 37
    clearTimeout(timer) //  timer 가 초기화되지 않았으므로 타이머가 지워진다.
    /* 하나의 타이머만 실행할 경우 정상적으로 작동이 되지만, 두개의 타이머를 동시에 누를 경우 문제가 생긴다. 
    1초를 누르고 5초를 누를 경우, 인스턴스 바깥에 정의된 timer는 5초 타이머로 바뀐다. 반대의 경우도 마찬가지다.    
    가지고 있는 타이머의 포니터가 덮어씌워진 인스턴스는 멈출 방법이 사라지므로 you lose 를 반환할 수 밖에 없어진다. 
    5초 -> 1초 -> 1초 -> 5초를 할 경우, 5초 타이머에 대한 포인터는 사라진 상태이므로 5초 포인터는 lose 를 반환한다. 
    반대로 1초 -> 5초 -> 5초 -> 1초를 할 경우, 1초 타이머에 대한 포인터는 사라진 상태이므로 1초 포인터는 lose 를 반환한다. 

    인스턴스 바깥은 리액트의 통제 밖에 있으므로, 초기화되지도 않지만, 관리하기도 어려운 것이다. 
    */
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
