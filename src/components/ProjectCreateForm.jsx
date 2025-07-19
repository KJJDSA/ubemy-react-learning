import { useState } from "react";
import CreateFormInput from "./CreateFormInput";

const ProjectCreateForm = ({ onCancel, onSave }) => {
  const [inputData, setInputData] = useState({
    title: "",
    discription: "",
    dueDate: "",
  });

  function handleChange(key, value) {
    setInputData((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
    console.log(`
      ${inputData.title} /
      ${inputData.discription} /
      ${inputData.dueDate} /
    `);
  }

  return (
    <div className="mt-24 w-2/3 ">
      <menu className="flex items-center justify-end gap-4 my-4">
        <button
          className="text-stone-800 hover:text-stone-950"
          onClick={onCancel}
        >
          취소
        </button>
        <button
          className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
          onClick={onSave}
        >
          저장
        </button>
      </menu>

      <CreateFormInput
        type="text"
        value={inputData.title}
        onChangeKey={"title"}
        onChange={handleChange}
      >
        제목
      </CreateFormInput>
      <CreateFormInput
        type="longText"
        value={inputData.discription}
        onChangeKey={"discription"}
        onChange={handleChange}
      >
        설명
      </CreateFormInput>
      <CreateFormInput
        type="date"
        value={inputData.dueDate}
        onChangeKey={"dueDate"}
        onChange={handleChange}
      >
        마감일
      </CreateFormInput>
    </div>
  );
};

export default ProjectCreateForm;
