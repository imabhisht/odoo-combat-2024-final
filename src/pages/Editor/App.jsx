import {useEffect,useState} from "react";
import GjsEditor from "@grapesjs/react";
import { useParams } from "react-router-dom";
import { ProjectAPI } from "../../api";

// import './style.css';
import gs_tailwind from "grapesjs-tailwind";
import gs_ga from "grapesjs-ga";
import gs_ct from "grapesjs-component-twitch";
import gs_pf from "grapesjs-plugin-forms";

const gjsOptions = (projectId,webcontent) => {

  console.log(webcontent)
  return {
  height: "100vh",
  storageManager: {
    type: 'remote',
    stepsBeforeSave: 3,
    options: {
      remote: {
        // Enrich the store call
        onStore: async (data, editor) => {
          const pagesHtml = editor.Pages.getAll().map(page => {
            const component = page.getMainComponent();
            return {
              html: editor.getHtml({ component }),
              css: editor.getCss({ component }),
              header: editor.getHtml({ component: page.get('head') }),
            }
          });
          console.log("Updating HTML Content...");
          const message = await ProjectAPI.postHTMLContent(projectId, pagesHtml[0].html);
          console.log("HTML Content Updated", message);
          return { id: projectID, data, pagesHtml };
        },
        // If on load, you're returning the same JSON from above...
        onLoad: result => result.data,
      }
    },
  },
  undoManager: { trackSelection: false },
  selectorManager: { componentFirst: true },
  projectData: {
    assets: [
      "https://via.placeholder.com/350x250/78c5d6/fff",
      "https://via.placeholder.com/350x250/459ba8/fff",
      "https://via.placeholder.com/350x250/79c267/fff",
      "https://via.placeholder.com/350x250/c5d647/fff",
      "https://via.placeholder.com/350x250/f28c33/fff",
    ],
    pages: [
      {
        name: "Home page",
        component: webcontent,
      },
    ],
  },
}};

export default function App() {
  // Get Path Variable
  const [ webcontent, setWebcontent ] = useState("");
  const parts = window.location.pathname.split("/");

  // Get the last part of the URL, which contains the Project ID
  const projectId = parts[parts.length - 1];

  useEffect(() => {
    const handleSubmission = async () => {
      try {
        const data = await ProjectAPI.getHTMLContent(projectId);
        setWebcontent(data);
      } catch (error) {
        console.error(error);
      }
    };

    handleSubmission();

    // Clean up function to clear the timeout when the component unmounts
    return () => clearTimeout(handleSubmission);
  },[projectId]);

  if(webcontent === "") return (<div>Loading...</div>);

  const onEditor = (editor) => {
    console.log("Editor loaded", { editor });
  };

  return (
    <GjsEditor
      grapesjs="https://unpkg.com/grapesjs"
      grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
      options={gjsOptions(projectId,webcontent)}
      plugins={[gs_ga, gs_ct, gs_pf, gs_tailwind]}
      onEditor={onEditor}
    />
  );
}
