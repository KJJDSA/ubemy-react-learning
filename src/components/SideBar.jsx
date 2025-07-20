import React from "react";
import Button from "./Button";

const SideBar = ({ projectList, onSwich, currentIndex }) => {
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        YOUR PROJECTS
      </h2>
      {/* 버튼같은 작은요소부터 재사용성을 끌어올릴 수 있어야 한다. onClick 속성은 꼭 넘어가서 정의하지 않아도 동작한다. */}
      <Button onClick={() => onSwich("create")}>+ 프로젝트 만들기</Button>
      <ul className="mt-8">
        {projectList.map((project, index) => {
          // 이렇게하면 편리하게 코드를 넣을 수 있다.
          const className = `w-full text-left px-6 py-2 rounded-md text-stone-50 hover:bg-stone-800${
            currentIndex === index ? " bg-stone-800" : "bg-stone-900"
          }`;
          return (
            <li key={project.title + index}>
              <button
                onClick={() => onSwich("project", index)}
                className={className}
              >
                {project.title}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default SideBar;
