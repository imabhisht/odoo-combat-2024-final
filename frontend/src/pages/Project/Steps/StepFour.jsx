import React, {useState} from "react";
import { FaGithub, FaLinkedin, FaMedium, FaStackOverflow, FaTwitter, FaFacebook, FaInstagram, FaYoutube, FaBlog } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5"
import ManualPrompt from "../ManualPrompt.json";

const LogoMaster = (props) => {
  if(props.option === "Github") {
    return(
      <FaGithub className="w-6 h-6" />
    )
  }
  if(props.option === "Linkedin") {
    return(
      <FaLinkedin className="w-6 h-6" />
    )
  }
  if(props.option === "Medium") {
    return(
      <FaMedium className="w-6 h-6" />
    )
  }
  if(props.option === "Stackoverflow") {
    return(
      <FaStackOverflow className="w-6 h-6" />
    )
  }
  if(props.option === "Twitter") {
    return(
      <FaTwitter className="w-6 h-6" />
    )
  }
  if(props.option === "Facebook") {
    return(
      <FaFacebook className="w-6 h-6" />
    )
  }
  if(props.option === "Instagram") {
    return(
      <FaInstagram className="w-6 h-6" />
    )
  }
  if(props.option === "Youtube") {
    return(
      <FaYoutube className="w-6 h-6" />
    )
  }
  if(props.option === "Blog") {
    return(
      <FaBlog className="w-6 h-6" />
    )
  }
  if(props.option === "Resume") {
    return(
      <IoDocumentText className="w-6 h-6" />
    )
  }
  return null;
}
export default (props) => {
  const step_data = ManualPrompt["step-4"];
  const [social, setSocial] = useState({});

  const data = step_data.data.find(item => item.parent === props.step.parent);

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
            className="relative flex w-full items-center justify-center py-3 px-4 font-medium text-gray-700"
            key={option.value}>
              <div className="flex rounded-lg shadow-sm">
                <span className="px-4 inline-flex items-center min-w-fit rounded-s-md border border-e-0 border-gray-200 bg-gray-50 text-sm text-gray-500 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400">
                  <LogoMaster option={option.title} /> 
                </span>
                <input onChange={
                  (e) => {
                    setSocial({
                      ...social,
                      [option.key+"_"+option.value]: e.target.value
                    })
                  }
                } placeholder={option.placeholder} type="text" className="py-3 px-4 pe-11 block w-full border-gray-200 shadow-sm rounded-e-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"/>
              </div>
            </div>
        ))}
      </div>

      <button onClick={() => {
        const alpha = data.parent === "step_3_portfolio_development" ? "step_4_portfolio_development" : localSelection; 
        props.setStep({
          step: props.step.step+1,
          parent: alpha
        })
        localStorage.setItem("form_data",JSON.stringify({
          ...JSON.parse(current_storage),
          social:{
            ...social
          }
        }))
      }} className="group mt-10 flex w-40 items-center justify-center rounded-lg bg-blue-700 py-2 text-center font-bold text-white transition">
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
