import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import Root from "./pages/Root";

// Lazy load pages for performance
const Home = lazy(() => import("./pages/HomeRedesigned"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "services", Component: Services },
      { path: "contact", Component: Contact },
      { path: "*", Component: NotFound },
    ],
  },
]);