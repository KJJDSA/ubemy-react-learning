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
