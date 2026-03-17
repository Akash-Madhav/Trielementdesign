import { createBrowserRouter } from "react-router";
import Root from "./pages/Root";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Team from "./pages/Team";
import Partnerships from "./pages/Partnerships";
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
      { path: "projects", Component: Projects },
      { path: "team", Component: Team },
      { path: "partnerships", Component: Partnerships },
      { path: "contact", Component: Contact },
      { path: "*", Component: NotFound },
    ],
  },
]);
