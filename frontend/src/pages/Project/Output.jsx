import React, { useEffect } from "react";
import LoadingSpinner from "../../components/Loading";
import { ProjectAPI } from '../../api';
import { useNavigate } from "react-router-dom";

export default () => {
  const projectId = new URLSearchParams(window.location.search).get("projectId");
  const config = JSON.parse(localStorage.getItem("form_data")) || {};
  const navigate = useNavigate();
  console.log("Config: ", config)
  console.log("Project ID: ", projectId)
  const quotes = [
    "Every great achievement begins with a decision to try.",
    "The journey of a thousand miles begins with one step.",
    "In the midst of chaos, there is also opportunity.",
    "Believe you can and you're halfway there.",
    "The only way to do great work is to love what you do.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "The secret of getting ahead is getting started.",
    "Opportunities don't happen, you create them.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "You are never too old to set another goal or to dream a new dream.",
  ];
  useEffect(() => {
    
    const handleSubmission = async () => {
      try {
        const data = await ProjectAPI.createWebsite(projectId, config);
        console.log("Hitting the API")
        if (data.status === 200 || data.status === 202) {
          console.log("Backend is processing the request");
        }
        else{
          console.log("Backend has completed the request, redirecting to the studio page")
          localStorage.removeItem("form_data");
          navigate(`/studio/${projectId}`);
        }

        // Call handleSubmission again after 5 seconds
        setTimeout(handleSubmission, 5000);
      } catch (error) {
        console.error(error);
      }
    };

    // Call handleSubmission initially
    setTimeout(handleSubmission, 5000);

    // Clean up function to clear the timeout when the component unmounts
    return () => clearTimeout(handleSubmission);
  }, []);

  return (
    <div>
      <LoadingSpinner texts={quotes} />
    </div>
  );
};
