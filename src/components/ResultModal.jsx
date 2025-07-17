import { useImperativeHandle, useRef } from 'react';

/* 19버전 이상의 리액트에서는 이렇게 ref값을 넘기지만, 그 이전 리액트에서는 아래의 방법을 사용한다. */
// import {forwardRef} from 'react';
// const ResultModal = forwardRef(function ResultModal({ result, targetTime }, ref) {

const ResultModal = ({ ref, result, targetTime }) => {
  const dialog = useRef();
  useImperativeHandle(ref, () => ({
    /** showModal() */
    open() {
      dialog.current.showModal();
    },
  }));
  return (
    <dialog ref={dialog} className="result-modal">
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
// )
export default ResultModal;
