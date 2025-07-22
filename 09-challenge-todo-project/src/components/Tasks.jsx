import { useState } from "react";

const Tasks = ({ tasks, onAddTaskClick, onDeleteTaskClick }) => {
  const [newTask, setNewtask] = useState("");

  function handleClick() {
    const copyNewTask = newTask;
    if (copyNewTask !== "") {
      onAddTaskClick(copyNewTask);
      setNewtask("");
    }
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <div className="flex items-center gap-4">
        {/** TODO
         * App.jsx -> ProjectTodoList -> Tasks.jsx 로 state drilling(상태 내려꽂기) 이 행해지고 있다. 이를 해결할 방법을 찾아 고쳐보자.
         * state drilling 또한 지저분하게 하고 있다. App.jsx 와 Tasks.jsx 두 곳에서만 state를 다루는것이 깔끔할 것이다.
         *
         * input에 state를 사용했으므로 전체 UI 리렌더링을 유발하지 않기 위해(또 재사용을 위해) 컴포넌트화 하는것이 좋다.*/}
        <input
          value={newTask}
          onChange={(event) => setNewtask(event.target.value)}
          className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        />
        <button
          onClick={handleClick}
          className="text-stone-700 hover:text-stone-950"
        >
          작업 추가
        </button>
      </div>
      <ul className=" p-4 mt-8 rounded-md bg-stone-100">
        {tasks.map((task, i) => (
          // TODO id 가 아닌 index 를 key로 사용하기 때문에 요소를 재사용할 수 없다.
          // 최적화를 위해 id 를 사용한다면 꼭 id로 대체해야 한다.
          <li className="flex justify-between my-4" key={task + i}>
            <p className="text-stone-800 my-4">{task}</p>
            <button
              onClick={() => onDeleteTaskClick(i)}
              className="text-stone-700 hover:text-red-500"
            >
              지우기
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Tasks;
