import { useEffect, useState, useRef } from "react";

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  const limitSecond = 3000;
  const [timeReduce, setTimeReduce] = useState(limitSecond);

  const timeRemain = useRef();

  useEffect(
    () => {
      // const timer = setTimeout(() => {
      //   onConfirm();
      // }, 3000);

      /* timeReduce가 초기값일 때에만 interval 작동 */
      if (timeReduce === limitSecond) {
        console.log("set!");
        timeRemain.current = setInterval(() => {
          setTimeReduce((prev) => prev - 1000);
        }, 1000);
      }

      // clean up함수에 넣으면 3초가 지난 뒤에도 꺼지지 않으므로 이곳에 넣는다. 
      if (timeReduce <= 0) {
        console.log("confirm!");
        onConfirm();
      }

      /* ⭐️ return문(cleanUP 함수)의 발동 조건: 
      1. 다음 useEffect가 실행되기 직전
      2. 컴포넌트 자체가 제거될 때

      다음 useEffect가 실행될 때 타이머를 지우거나 모달을 닫으면 안되므로 분기처리
      컴포넌트 자체를 꺼버릴 때도 한번 실행되므로 타이머를 안전하게 끄고 관리할 수 있다.
      */
      return () => {
        if (timeReduce <= 0) {
          console.log("clear!");
          clearTimeout(timeRemain);
        }
      };
    },
    /* timeReduce가 변경될 때 마다 실행되어야 하므로 의존성에 추가 */
    [timeReduce]
  );

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <h3>{timeReduce / 1000} 초 후 자동으로 삭제됩니다..</h3>
    </div>
  );
}
