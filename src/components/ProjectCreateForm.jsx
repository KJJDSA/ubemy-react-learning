import React from "react";

const ProjectCreateForm = () => {
  return (
    <div className="mt-24 w-2/3 ">
      <menu className="flex items-center justify-end gap-4 my-4">
        <button className="text-stone-800 hover:text-stone-950">취소</button>
        <button className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">
          저장
        </button>
      </menu>
      <div className="mt-5">
        <label className="text-sm font-bold uppercase text-stone-500">
          제목
          <input className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600" />
        </label>
      </div>
      <div className="mt-5">
        <label className="text-sm font-bold uppercase text-stone-500">
          설명
          <input className="w-full h-20 p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600" />
        </label>
      </div>
      <div className="mt-5">
        <label className="text-sm font-bold uppercase text-stone-500">
          마감일
          <input className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600" />
        </label>
      </div>
    </div>
  );
};

export default ProjectCreateForm;
