import { useState } from "react";
import CreateFormInput from "./CreateFormInput";

const initialInputData = {
  title: "",
  discription: "",
  dueDate: "",
};

const initialValidateData = {
  title: true,
  discription: true,
  dueDate: true,
};

function validation(copyInputData, copyValidateData) {
  let isFine = true;

  for (let key in copyInputData) {
    // 빈 값이 존재한다면
    if (copyInputData[key] === "") {
      copyValidateData[key] = false;
      isFine = false;
    } else {
      copyValidateData[key] = true;
    }
    if (key === "dueDate") {
      const dueDate = new Date(copyInputData[key]);
      const today = new Date();
      // 마감일이 오늘보다 이전이라면
      // 빈 값이 들어올 경우 isNaN으로 검사해야 한다.
      if (isNaN(dueDate) || dueDate.getTime() < today.getTime()) {
        copyValidateData[key] = false;
        isFine = false;
      } else {
        copyValidateData[key] = true;
      }
    }
  }

  return {
    newInputData: copyInputData,
    newValidateData: copyValidateData,
    isFine: isFine,
  };
}

const ProjectCreateForm = ({ onCancel, onSave }) => {
  const [inputData, setInputData] = useState(initialInputData);
  const [validateData, setValidateData] = useState(initialValidateData);
  function handleChange(key, value) {
    setInputData((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  }

  function handleClick() {
    const copyInputData = { ...inputData };
    const copyValidateData = { ...validateData };
    const { newInputData, newValidateData, isFine } = validation(
      copyInputData,
      copyValidateData
    );

    setValidateData(newValidateData);

    if (isFine) {
      onSave(newInputData);
      resetForm();
    }
  }

  function resetForm() {}

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
          onClick={handleClick}
        >
          저장
        </button>
      </menu>

      <CreateFormInput
        type="text"
        value={inputData.title}
        onChangeKey={"title"}
        onChange={handleChange}
        validation={validateData.title}
        textArea={false}
      >
        제목
      </CreateFormInput>
      <CreateFormInput
        type="text"
        value={inputData.discription}
        onChangeKey={"discription"}
        onChange={handleChange}
        validation={validateData.discription}
        textArea={true}
      >
        설명
      </CreateFormInput>
      <CreateFormInput
        type="date"
        value={inputData.dueDate}
        onChangeKey={"dueDate"}
        onChange={handleChange}
        validation={validateData.dueDate}
        textArea={false}
      >
        마감일
      </CreateFormInput>
    </div>
  );
};

export default ProjectCreateForm;
