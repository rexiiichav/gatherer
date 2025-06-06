import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Home from "./routes/Home";
import ErrorPage from "./error-page";
import SignUp from "./components/user/SignUp";
import LogIn from "./components/user/LogIn";
import Profile from "./components/user/Profile";
import Form from "./components/utility/Form";
import RecipeList from "./components/recipes/RecipeList";
import RecipeShow from "./components/recipes/RecipeShow";
import RecipeForm from "./components/recipes/RecipeForm";
import Shell from "./components/utility/Shell";
import RecipeSelect from "./components/list/RecipeSelect";
import ListForm from "./components/list/ListForm";
import ListDisplay from "./components/list/ListDisplay";

const url = "http://localhost:3001";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Shell>
        <Home url={url} />
      </Shell>
    ),
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
    element: (
      <Shell>
        <RecipeList url={url} />
      </Shell>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/recipe/create",
    element: (
      <Shell>
        <RecipeForm url={url} title="Create Recipe" />
      </Shell>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/recipe/:id/edit",
    element: (
      <Shell>
        <RecipeForm url={url} title="Edit Recipe" key={"edit"} />
      </Shell>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/recipe/:id",
    element: (
      <Shell>
        <RecipeShow url={url} />
      </Shell>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/list/create",
    element: (
      <Shell>
        <RecipeSelect url={url} />
      </Shell>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/list/edit",
    element: (
      <Shell>
        <ListForm url={url} />
      </Shell>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/list/display",
    element: (
      <Shell>
        <ListDisplay url={url} />
      </Shell>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile",
    element: (
      <Shell>
        <Profile url={url} />
      </Shell>
    ),
    errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

//Find a way to get more foods in the app - https://platform.fatsecret.com/docs/v2/foods.autocomplete
//Have searches performed on the server-side instead of sending all foods to the client
