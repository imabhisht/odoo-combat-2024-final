import React, { useState } from "react";
import ManualPrompt from "../ManualPrompt.json";

export default (props) => {
  const step_data = ManualPrompt["step-5"];
  const data = step_data.data.find(
    (item) =>
      item.parent === props.step.parent || "step_4_portfolio_development"
  );
  const [localSelection, setLocalSelection] = useState("");
  const current_storage = localStorage.getItem("form_data");
  const [inputData, setInputData] = useState("");
  return (
    <div className="flex flex-col items-center">
      <p className="text-lg font-medium text-gray-600">Hello, Oliver!</p>
      <h1 className="text-4xl font-medium text-gray-600">
        Give your Introduction
      </h1>

      <div className="mt-10 w-2/3 space-y-2">
        <label
          htmlFor="comment"
          className="block text-sm font-medium text-gray-700"
        >
          {/* Add your Profile Description */}
        </label>
        <div className="mt-1">
          <textarea
            rows={10}
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            name="comment"
            id="comment"
            placeholder="Add your Profile Description..."
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            defaultValue={""}
          />
        </div>
      </div>

      <button
        onClick={() => {
          props.setStep({
            step: props.step.step + 1,
            parent: localSelection,
          });
          localStorage.setItem("form_data", JSON.stringify({
            ...JSON.parse(current_storage),
            "about_self": inputData,
          }));
        }}
        className="group mt-10 flex w-40 items-center justify-center rounded-lg bg-blue-700 py-2 text-center font-bold text-white transition"
      >
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
