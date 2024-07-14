import React, {useState} from "react";
import ManualPrompt from "../ManualPrompt.json";

export default (props) => {
  const stepData = ManualPrompt["step-2"]
  const data = stepData.data.find(item => item.parent === props.step.parent);
  const [localSelection, setLocalSelection] = useState("");
  const current_storage = localStorage.getItem("form_data");

  return (
    <div className="flex flex-col items-center">
      <p className="text-lg font-medium text-gray-600">Hello, Oliver!</p>
      <h1 className="text-4xl font-medium text-gray-600">{data.title}</h1>

      <div className="mt-10 space-y-2">
        <h2 className="text-center text-sm uppercase text-gray-600">
          Website Type
        </h2>
        {data.options.map((option) => (
          <div
            key={option.id}
            className="relative flex w-64 items-center justify-center rounded-full bg-gray-50 py-3 px-4 font-medium text-gray-700 hover:bg-gray-200"
          >
            <input
              className="peer hidden"
              type="radio"
              name="framework"
              id={option.id}
              onChange={() => {
                setLocalSelection(option.id)
                localStorage.setItem("form_data",JSON.stringify({
                  ...JSON.parse(current_storage),
                  [option.key]: option.value
                }))}}
            />
            <label
              className="absolute top-0 h-full w-full cursor-pointer rounded-full border peer-checked:border-blue-700"
              htmlFor={option.id}
            >
              {" "}
            </label>
            <div className="absolute left-4 h-5 w-5 rounded-full border-2 border-gray-300 bg-gray-200 ring-blue-700 ring-offset-2 peer-checked:border-transparent peer-checked:bg-blue-700 peer-checked:ring-2"></div>
            <span>{option.title}</span>
          </div>
        ))}
      </div>

      <button onClick={() => props.setStep({
         step: props.step.step+1,
         parent: localSelection
      })} className="group mt-10 flex w-40 items-center justify-center rounded-lg bg-blue-700 py-2 text-center font-bold text-white transition">
        Continue
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="ml-4 h-4 w-4 transition-transform group-hover:translate-x-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </button>
    </div>
  );
};
