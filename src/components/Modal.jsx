import { useImperativeHandle, useRef, useEffect } from "react";

// onProjectDelete 등의 리스너 함수명으로 지으면 재사용이 어렵다.
const Modal = ({ children, ref, onAccept = undefined, onDeny = undefined }) => {
  const dialog = useRef(null);
  const acceptButton = useRef(null);
  const denyButton = useRef(null);

  useEffect(() => {
    /**
     * 클릭 이벤트를 통해 event.target 으로 외부와 내부를 알 수 있다.
     * 백드롭을 클릭할 경우: 백드롭은 dialog 자체에서 발생한 것으로 간주되어 버블링 시작점이 dialog 로 지정된다.
     * menu 를 클릭한 경우: 버블링 시작점이 menu 로 지정된다.
     * button 을 클릭한 경우: 버블링 시작점이 button 으로 지정된다.
     * 
     * 즉 클릭했을 때 버블링의 시작점(event.target)이 dialog.current와 button.current 인 경우만 다이얼로그를 닫게하면 된다.
     */
    const handleClickOutside = (event) => {
      // 백드롭, 네, 아니오 버튼을 누를 시 모달 닫힘
      if (
        dialog.current &&
        (event.target === dialog.current ||
          event.target === acceptButton.current ||
          event.target === denyButton.current)
      ) {
        dialog.current.close();
      }
    };

    if (dialog.current) {
      dialog.current.addEventListener("click", handleClickOutside);
    }

    return () => {
      if (dialog.current) {
        dialog.current.removeEventListener("click", handleClickOutside);
      }
    };
  }, []);

  useImperativeHandle(ref, () => ({
    open() {
      dialog.current.showModal();
    },
  }));

  return (
    <dialog
      ref={dialog}
      className=" backdrop:bg-stone-900/90 p-6 rounded-md shadow-md"
    >
      <div className="text-right flex flex-col content-between">
        {children}
        <menu className="flex items-center justify-end gap-4 my-4">
          <button
            ref={acceptButton}
            onClick={onAccept}
            className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
          >
            네
          </button>
          <button
            ref={denyButton}
            onClick={onDeny}
            className="text-stone-600 hover:text-stone-950"
          >
            아니오
          </button>
        </menu>
      </div>
    </dialog>
  );
};

export default Modal;
