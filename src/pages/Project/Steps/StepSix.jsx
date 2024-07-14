import React, { useEffect } from 'react';

const MyComponent = (props) => {
  return (
    <div className="container mx-auto px-4 py-8">

    <div className="flex flex-col items-center">
      <p className="text-lg font-medium text-gray-600">Hello, Oliver!</p>
      <h1 className="text-4xl font-medium text-gray-600">
        Choose your vibe
      </h1>

      <p className="mt-10 text-sm uppercase text-gray-600">Color Scheme</p>
      <div className="mt-3 flex space-x-3">
        <div className="relative h-8 w-8 cursor-pointer overflow-hidden rounded-full bg-slate-800 shadow-lg shadow-gray-400/60 hover:scale-110">
          <span className="absolute h-full w-1/2 bg-indigo-600"></span>
        </div>
        <div className="relative h-8 w-8 cursor-pointer overflow-hidden rounded-full bg-white shadow-lg shadow-gray-400/60 hover:scale-110">
          <span className="absolute h-full w-1/2 bg-rose-600"></span>
        </div>
        <div className="relative h-8 w-8 cursor-pointer overflow-hidden rounded-full bg-orange-600 shadow-lg shadow-gray-400/60 hover:scale-110">
          <span className="absolute h-full w-1/2 bg-slate-800"></span>
        </div>
      </div>

      <fieldset className="mt-10 space-y-2">
        <legend className="text-center text-sm uppercase text-gray-600">
          Favorite Framework
        </legend>
        <div className="relative flex w-56 items-center justify-center rounded-full bg-gray-50 py-3 px-4 font-medium text-gray-700">
          <input
            className="peer hidden"
            type="radio"
            name="framework"
            id="framework1"
          />
          <label
            className="absolute top-0 h-full w-full cursor-pointer rounded-full border peer-checked:border-blue-700"
            htmlFor="framework1"
          >
            {" "}
          </label>
          <div className="absolute left-4 h-5 w-5 rounded-full border-2 border-gray-300 bg-gray-200 ring-blue-700 ring-offset-2 peer-checked:border-transparent peer-checked:bg-blue-700 peer-checked:ring-2"></div>
          <span>Svelte</span>
        </div>
        {/* Similar radio button components for React and Vue */}
      </fieldset>

      <button
       onClick={() => {
        props.setStep({
          step: props.step.step + 1,
        });
      }}
      
      className="group mt-10 flex w-40 items-center justify-center rounded-lg bg-blue-700 py-2 text-center font-bold text-white transition">
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
    </div>

  );
};

export default MyComponent;
