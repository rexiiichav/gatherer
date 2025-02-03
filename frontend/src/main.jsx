import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/home";
import ErrorPage from "./error-page";
import SignUp from "./routes/signup";
import { useContext } from "react";

const url = "http://localhost:3001";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/sign-up",
    element: <SignUp url={url} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/recipe",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/list",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
