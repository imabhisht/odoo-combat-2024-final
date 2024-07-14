import React, { useState, useEffect } from "react";
import { HashLoader } from "react-spinners";
import Typewriter from "typewriter-effect";

const LoadingSpinner = ({ texts }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex justify-center">
          <HashLoader color="#6366f1" size={75} />
        </div>
        {texts && texts.length > 0 ? (
          <div className="mt-10 text-base w-screen font-mono size-8 text-gray-600 text-center">
            <Typewriter
              options={{
                strings: texts,
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 20,
              }}
              onInit={(typewriter) => {
                typewriter
                  .callFunction(() => {
                    console.log("String typed out!");
                  })
                  .pauseFor(2500)
                  .deleteAll()
                  .callFunction(() => {
                    console.log("All strings were deleted");
                  })
                  .start();
              }}
            />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default LoadingSpinner;
