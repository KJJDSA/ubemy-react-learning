import { useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

// const Modal = forwardRef(function Modal({ children }, ref) {
const Modal = function Modal({ children, open }) {
  const dialog = useRef();

  // useImperativeHandle(ref, () => {
  //   return {
  //     open: () => {
  //       dialog.current.showModal();
  //     },
  //     close: () => {
  //       dialog.current.close();
  //     },
  //   };
  // });

  /* 
  ☝️ 기존에 알던 방식: useImperativeHandle 과 useRef를 통해 부모가 자식을 간접 조작한다. 
  💁 리액트는 선언적 프로그래밍을 하는데, 이에 맞게 변경할 수는 없을까? 
  1. open 프로퍼티로 dialog 의 open 속성을 동적 변경한다? (backdrop이 작동하지 않음)
  2. open 프로퍼티로 dialog가 스스로 showModal, close를 호출하게 한다? === 👍
  2-1. 하지만 그냥 if else 문을 컴포넌트에 넣으면 컴포넌트가 실행되면서 정의되지 않은 ref에 접근하는 등 타이밍 문제가 발생한다. 
  2-2. ☝️ 그렇다면 컴포넌트가 다 끝나고 실행되게 하면 되겠다! --> useEffect 가 선언형을 쓰는 리액트 모달에 필요한 이유 😎
   */
  useEffect(
    () => {
      if (open) {
        dialog.current.showModal();
      } else {
        dialog.current.close();
      }
    },
    /* 
    App.jsx의 navigator, localStorage 의 예시는 종속성을 넣지 않았는데, 이는 이 둘이 실행되기 위해 UI 변경을 위한 jsx 코드 요소를 필요로 하지 않기 때문이다.(state, context value, props..)
    
    하지만 이번 모달의 경우에는 open 이 변경될 때 마다 useEffect가 실행되야 하며, 코드에도 해당 prop이 들어가있다. 
    useEffect 가 트리거되는데에 open 을 의존하기 때문에, 종속성에 open 을 넣는 것! 🤝
    */
    [open]
  );

  return createPortal(
    <dialog className="modal" ref={dialog}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
};
// );

export default Modal;
