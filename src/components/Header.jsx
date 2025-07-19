import React from "react";

const Header = ({ project, onDialogOpen }) => {
  return (
    <header className=" pb-4 mb-4 border-b-2 border-stone-300">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-stone-600 mb-2">
          {project.title}
        </h1>
        <button
          onClick={onDialogOpen}
          className="text-stone-700 hover:text-stone-950"
        >
          프로젝트 삭제
        </button>
      </div>
      <p className="text-stone-400 mb-4">{project.dueDate}</p>
      <p className="text-stone-600 whitespace-pre-wrap">
        {project.discription}
      </p>
    </header>
  );
};

export default Header;
