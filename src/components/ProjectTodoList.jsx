import React from "react";

const ProjectTodoList = ({ project }) => {
  return (
    <div className="mt-24 w-2/3">
      <header className=" pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-600 mb-2">
            {project.title}
          </h1>
          <button className="text-stone-700 hover:text-stone-950">삭제</button>
        </div>
        <p className="text-stone-400 mb-4">{project.dueDate}</p>
        <p className="text-stone-600 whitespace-pre-wrap">
          {project.discription}
        </p>
      </header>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <div className="flex items-center gap-4">
        <input className="w-64 px-2 py-1 rounded-sm bg-stone-200" />
        <button className="text-stone-700 hover:text-stone-950">
          작업 추가
        </button>
      </div>
      <ul className=" p-4 mt-8 rounded-md bg-stone-100">
        <li className="flex justify-between my-4">
          <p className="text-stone-800 my-4">작업</p>
          <button className="text-stone-700 hover:text-red-500">지우기</button>
        </li>
      </ul>
    </div>
  );
};

export default ProjectTodoList;
