import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Home({ url }) {
  let location = useLocation();
  let navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const header = new Headers();
    header.append("Authorization", `bearer ${location.state.token}`);

    const req = new Request(`${url}/user/show`, {
      method: "GET",
      headers: header,
    });

    fetch(req)
      .then((response) => {
        if (response.status == 401) {
          navigate("/login");
          return Promise.reject(new Error("Network response was not ok"));
        } else {
          return response.json();
        }
      })
      .then((response) => {
        setUsername(response.username);
      });
  }, []);

  return (
    <div class=" w-100% min-h-screen flex justify-center items-center">
      <div class="flex justify-center items-center flex-col gap-5">
        <img src="wicker-basket.png" class="w-30" alt="" />
        <h1 class="text-3xl font-bold text-center">
          Let's get cooking, {username}!
        </h1>
        <div
          id="actions-container"
          class="flex justify-center items-center gap-5"
        >
          <Link to={`/recipes`} state={{ token: location.state.token }}>
            <button
              type="button"
              class="w-35 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              View Recipes
            </button>
          </Link>
          <Link to={`/recipe/create`} state={{ token: location.state.token }}>
            <button
              type="button"
              class="w-35 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Create Recipe
            </button>
          </Link>
          <Link to={`/list/create`} state={{ token: location.state.token }}>
            <button
              type="button"
              class="w-35 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Create List
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
