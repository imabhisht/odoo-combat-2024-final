import React, { useEffect, useState } from "react";
import StepOne from "./Steps/StepOne";
import StepTwo from "./Steps/StepTwo";
import StepThree from "./Steps/StepThree";
import StepFour from "./Steps/StepFour";
import StepFive from "./Steps/StepFive";
import StepSix from "./Steps/StepSix";
import ManualPrompt from "./ManualPrompt.json";
import { useNavigate, Navigate  } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';


export default () => {
  const navigate = useNavigate();
  const [step, setStep] = React.useState({
    step: 1,
    parent: "",
  });
  const configStep = `step-${step.step}`;

  useEffect(() => {
    localStorage.setItem("form_data", {});
  }, []);

  const config = {
    "step-1": {
      ...ManualPrompt["step-1"],
      component: StepOne,
    },
    "step-2": {
      ...ManualPrompt["step-2"],
      component: StepTwo,
    },
    "step-3": {
      ...ManualPrompt["step-3"],
      component: StepThree,
    },
    "step-4": {
      ...ManualPrompt["step-4"],
      component: StepFour,
    },
    "step-5": {
      component: StepFive,
    },
    "step-6": {
      component: StepSix,
    },
  };

  if (step.step === 7) {
    //  Return with Navigation
    return (
      <Navigate to={`/project/output?projectId=${uuidv4()}`} replace={true} />
    )
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="relative flex w-[40rem] flex-col justify-center overflow-hidden rounded-lg bg-white/75 py-32">
        <span
          style={{ width: `${(step.step / 6) * 100}%` }}
          className={"absolute top-0 h-1 bg-blue-900"}
        ></span>
        {React.createElement(config[configStep].component, {
          data: config[configStep].data,
          step: step,
          setStep: setStep,
        })}
      </div>
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  );
};
