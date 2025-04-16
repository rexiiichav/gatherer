import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useLocation } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

export default function RecipeList({ url }) {
  let location = useLocation();
  let navigate = useNavigate();
  const [recipe, setRecipe] = useState(undefined);
  let { id } = useParams();

  useEffect(() => {
    const header = new Headers();
    header.append("Authorization", `bearer ${location.state.token}`);

    const req = new Request(`${url}/recipe/${id}`, {
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
        setRecipe(response.recipe);
      });
  }, []);

  if (recipe == undefined) {
    return <></>;
  }
  return (
    <div class="flex justify-center items-center p-15">
      <div class="blockmax-w-sm pt-6 pb-6 pr-15 pl-10 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <h1 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {recipe.name}
        </h1>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li
              class="mb-1"
              key={index}
            >{`${ingredient.quantity} ${ingredient.measure.name} ${ingredient.food.name}`}</li>
          ))}
        </ul>

        <Link
          to={`/recipe/${recipe.id}/edit`}
          state={{ token: location.state.token }}
        >
          <button
            type="button"
            class="mt-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Edit
          </button>
        </Link>
      </div>
    </div>
  );
}
