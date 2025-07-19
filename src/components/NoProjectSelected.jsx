import React from "react";
import Image from "../assets/no-projects.png";

const NoProjectSelected = ({ onSwich }) => {
  return (
    <div className="mt-24 text-center w-2/3">
      <img className="w-16 h-16 object-contain mx-auto" src={Image} />
      <h2 className="text-xl font-bold text-stone-500 my-4">
        선택된 프로젝트가 없습니다
      </h2>
      <p className="text-stone-400 mb-4">
        프로젝트를 선택하거나 새로운 프로젝트를 생성하세요
      </p>
      <button
        className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100"
        onClick={() => onSwich("create")}
      >
        신규 프로젝트 생성
      </button>
    </div>
  );
};

export default NoProjectSelected;
