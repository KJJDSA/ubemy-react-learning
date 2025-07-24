import { useEffect, useState, useRef } from "react";

function clearRefInterval(ref) {
  console.log("clear!");
  clearInterval(ref);
}

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
          console.log("실행중..." + timeReduce);
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
          clearRefInterval(timeRemain.current);
        }
      };
    },
    /* timeReduce가 변경될 때 마다 실행되어야 하므로 의존성에 추가 */
    [
      timeReduce,
      /* 
      onConfirm 을 의존성으로 추가해야 한다. 
        - 이유: onConfirm 이 참조하는 handleRemovePlace을 항상 최신으로 참조하지 않으면 그 안의 state 등이 이전 상태인 채로 사용될 수 있다.(오래된 클로저 문제)
      그럼에도 onConfirm 을 의존성 추가하지 않고도 문제가 발생하지 않았던 이유: 이 DeleteConfirmation 컴포넌트가 모달을 끌 때마다 삭제되며 켤 때마다 새로 생성되었기 떄문이다.
      현 코드로는 어떤 방법을 취하든 문제가 발생한다. 
        - onConfirm 을 추가할 경우 : 부모가 업데이트 될 때 마다 handleRemovePlace 인스턴스가 새로 생성되고, 이를 받는 onConfirm 을 useEffect는 항상 업데이트된다고 판단하게 된다.(무한루프 위험성)
        - onConfirm 을 추가하지 않을 경우: 부모가 업데이트 되어도(pickedPlaces state 가 변경되어도) onConfirm 은 오래된 handleRemovePlace 의 클로저를 참조하는 상태가 됩니다. 
          이 오래된 클로저는 최신상태의 state를 참고하지 않고 있을 확률이 높습니다. pickedPlaces 변경되기 전 상태를 참조한 handleRemovePlace 를 사용한다면 알 수 없는 오류의 발생가능성이 높아집니다.
      ⭐️ 그럼에도 onConfirm 을 추가해야 하는 이유: 
        1. 의존성을 명확히 표시하는 것은 useEffect - react hook 의 기본 원칙입니다. eslint 등 리액트에서 권장하는 규칙에 따르지 않을경우 추가설정이 필요하며, 이는 좋지못한 선택이 될 수 있습니다.
        2. 모달이 꺼질때마다 인스턴스를 삭제하는 지금 방식에서 변경이 있을 경우 문제가 바로 발생할 수 있습니다. 
        3. useCallback 등을 사용해서 해당 문제를 회피할 수 있습니다. 
      */
      onConfirm,
    ]
  );

  function handleConfirm() {
    if (timeRemain.current !== undefined) {
      onConfirm();
      clearRefInterval(timeRemain.current);
    }
  }

  function handleCancel() {
    if (timeRemain.current !== undefined) {
      onCancel();
      clearRefInterval(timeRemain.current);
    }
  }
  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={handleCancel} className="button-text">
          No
        </button>
        <button onClick={handleConfirm} className="button">
          Yes
        </button>
      </div>
      <h3>{timeReduce / 1000} 초 후 자동으로 삭제됩니다..</h3>
    </div>
  );
}
