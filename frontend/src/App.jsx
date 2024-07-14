import React from "react";
import { BrowserRouter as Router, Route, RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// #a4448b
// Pages & Layouts
import DashboardLayout from "./routes/DashboardLayout";
import HomePage from "./pages/Home/Home";
import Editor from "./pages/Editor/App";
import ProjectPage from "./pages/Project/Projects";
import LoginPage from "./pages/Auth/Login";
import CreateProjectsPage from "./pages/Project/CreateProjects";
import ProjectOutputPage from "./pages/Project/Output";
import UsersList from "./pages/Project/UsersList";

// Components
import LoadingSpinner from "./components/Loading";
import BookForm from "./pages/form/Bookform";
import BookDetails from "./pages/Project/BookDetails";
const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "/", element: (
          // <ProtectedRoute>
          <HomePage />
          // </ProtectedRoute>
        )
      },
      { path: "/users-list", element: (
        <ProtectedRoute>
          <UsersList />
        </ProtectedRoute>
      )},
      {
        path: "/books", element: (
          //<ProtectedRoute>
          <ProjectPage />
          //</ProtectedRoute>
        )
      },
      {
        path: "/details", element: (
          <BookDetails />
        )
      },
      {
        path: "/form",
        element: (
          <BookForm />
        )
      }

    ],
  },
  {
    // Studio Path with Path Variable
    path: "/studio/:projectId",
    element: (
      <ProtectedRoute>
        <Editor />
      </ProtectedRoute>
    )
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/project/create",
    element: (
      <ProtectedRoute>
        <CreateProjectsPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/project/output",
    element: (
      <ProtectedRoute>
        <ProjectOutputPage />
      </ProtectedRoute>
    )
  },
]);

export default () => {
  const [loading, setLoading] = React.useState(false);

  // React.useEffect(() => {
  //   // Simulate an API call or any asynchronous operation
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 0);
  // }, []);


  return (
    <>
      {loading ? (<LoadingSpinner />) : (
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>)

      }
    </>
  );
};