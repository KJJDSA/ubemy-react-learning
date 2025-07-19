import React from "react";

const CreateFormInput = ({
  children,
  type,
  value,
  onChangeKey,
  onChange,
  validation,
}) => {
  return (
    <div className="mt-5">
      <label
        className={`text-sm font-bold uppercase text-stone-500${
          !validation && " text-red-400"
        }`}
      >
        {children}
        {type === "longText" && (
          <input
            className={`w-full h-20 p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600${
              !validation && " border-red-300 bg-red-200"
            }`}
            type={type}
            value={value}
            onChange={(event) => onChange(onChangeKey, event.target.value)}
          />
        )}
        {type !== "longText" && (
          <input
            className={`w-full h-20 p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600${
              !validation && " border-red-300 bg-red-200"
            }`}
            type={type}
            value={value}
            onChange={(event) => onChange(onChangeKey, event.target.value)}
          />
        )}
      </label>
    </div>
  );
};

export default CreateFormInput;
