import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";
import ErrorPage from "./error-page";
import SignUp from "./components/user/SignUp";
import LogIn from "./components/user/LogIn";
import Form from "./routes/form";
import RecipeList from "./components/recipes/RecipeList";
import RecipeShow from "./components/recipes/RecipeShow";
import RecipeForm from "./components/recipes/RecipeForm";

const url = "http://localhost:3001";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home url={url} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: (
      <Form>
        <LogIn url={url} />
      </Form>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/sign-up",
    element: (
      <Form>
        <SignUp url={url} />
      </Form>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/recipes",
    element: <RecipeList url={url} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/recipe/:id/edit",
    element: <RecipeForm url={url} title="Edit Recipe" />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/recipe/:id",
    element: <RecipeShow url={url} />,
    errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
