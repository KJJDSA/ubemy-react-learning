import React from 'react';

const ResultModal = ({ ref, result, targetTime }) => {
  return (
    <dialog ref={ref} className="result-modal">
      {/* dialog 는 기본적으로 보이지 않으며 open 속성으로 강제로 보이게 하면 백그라운드가 흐려지지 않게된다.*/}
      <h2>You {result}.</h2>
      <p>
        The Target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with <strong>X seconds left.</strong>
      </p>
      {/* dialog 내부에 form 태그를 넣고 action 을 dialog 로 하면 닫기 버튼이 된다. 자바스크립트 내장 기능 */}
      <form action="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
};

export default ResultModal;
