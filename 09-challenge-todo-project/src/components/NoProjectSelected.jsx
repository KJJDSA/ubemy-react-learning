import React from "react";
import Image from "../assets/no-projects.png";
import Button from "./Button";

// 프로젝트가 없을 경우 대체하는 컴포넌트 (fallback component)
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
      <Button onClick={() => onSwich("create")}>+ 프로젝트 만들기</Button>
    </div>
  );
};

export default NoProjectSelected;
