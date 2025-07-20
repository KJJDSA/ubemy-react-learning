import { useImperativeHandle, useRef, useEffect } from "react";

const Modal = ({ children, ref, onProjectDelete }) => {
  const dialog = useRef(null);

  useEffect(() => {
    /**
     * 클릭 이벤트를 통해 event.target 으로 외부와 내부를 알 수 있다.
     * 백드롭을 클릭할 경우: 백드롭은 dialog 자체에서 발생한 것으로 간주되어 버블링 시작접이 dialog 로 지정된다.
     * menu 를 클릭한 경우: 버블링 시작점이 menu 로 지정된다.
     *  버블링 특성상 dialog 에 이벤트가 닿지만, 분기를 통해 버블링의 시작점(event.target) 은 dialog가 아닌 그 안쪽 요소가 된다.
     * 즉 백드롭을 클릭했을 때만 event.target이 dialog가 참조하는 요소가 되므로 이 둘이 같은 경우에만 close 메소드를 사용한다.
     */
    const handleClickOutside = (event) => {
      if (dialog.current && event.target === dialog.current) {
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

  function handleAcceptClick() {
    onProjectDelete();
    dialog.current.close();
  }

  function handleDenyClick() {
    dialog.current.close();
  }

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
            onClick={handleAcceptClick}
            className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
          >
            네
          </button>
          <button
            onClick={handleDenyClick}
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
