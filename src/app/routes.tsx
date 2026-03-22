import { createBrowserRouter } from "react-router";
import Root from "./pages/Root";
import Home from "./pages/HomeRedesigned";
import About from "./pages/About";
import Services from "./pages/Services";
import ProjectLocations from "./pages/ProjectLocations";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "services", Component: Services },
      { path: "project-locations", Component: ProjectLocations },
      { path: "contact", Component: Contact },
      { path: "*", Component: NotFound },
    ],
  },
]);