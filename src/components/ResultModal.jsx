import React from 'react';

const ResultModal = ({ result, targetTime }) => {
  return (
    <dialog className="result-modal">
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
