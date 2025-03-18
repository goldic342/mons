import { createBrowserRouter } from "react-router-dom";
import Error from "../pages/Error";
import Home from "../pages/Home";
import About from "../pages/About";
import Projects from "../pages/Projects";
import Project from "../pages/Project";
import Layout from "../components/ui/Layout";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/projects", element: <Projects /> },
      { path: "/projects/:projectId", element: <Project /> },
    ],
  },
]);
