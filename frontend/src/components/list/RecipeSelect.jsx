import { useEffect, useState, useRef } from "react";
import { Link } from "react-router";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import RecipeInput from "../list/RecipeInput";
import Error from "../utility/Error";

export default function RecipeSelect({ url }) {
  let location = useLocation();
  let navigate = useNavigate();
  const [recipes, setRecipes] = useState(undefined);
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [error, setError] = useState([]);
  const errorSection = useRef(null);
  const keyRef = useRef(0);

  useEffect(() => {
    const header = new Headers();
    header.append("Authorization", `bearer ${location.state.token}`);

    const req = new Request(`${url}/recipe/index`, {
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
        let formatRecipes = response.recipes.map((r) => {
          return { label: r.name, value: r.id };
        });
        setRecipes(formatRecipes);
      });
  }, []);

  function submit() {
    let formattedRecipes = {};
    selectedRecipes.forEach((recipe) => {
      if (recipe.value != undefined) {
        formattedRecipes[recipe.value] = recipe.quantity;
      }
    });

    const header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Authorization", `bearer ${location.state.token}`);

    let submitUrl = `${url}/list/new`;

    const req = new Request(submitUrl, {
      method: "POST",
      body: JSON.stringify({ recipes: formattedRecipes }),
      headers: header,
      mode: "cors",
    });

    fetch(req)
      .then((response) => {
        if (response.status == 401) {
          navigate("/login");
          return Promise.reject(new Error("Network response was not ok"));
        } else if (response.status == 200) {
          return response.json();
        } else {
          throw Error;
        }
      })
      .then((response) => {
        navigate("/list/edit", {
          state: {
            token: location.state.token,
            ingredients: response.ingredients,
          },
        });
      })
      .catch();
  }

  function addRecipe() {
    keyRef.current += 1;
    setSelectedRecipes([
      ...selectedRecipes,
      {
        key: keyRef.current,
        label: "Select",
        value: undefined,
        quantity: "",
      },
    ]);
  }

  useEffect(() => {
    if (error.length > 0) {
      errorSection.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [error]);

  if (recipes == undefined) {
    return <></>;
  }
  return (
    <div ref={errorSection} class="flex items-center justify-center p-10">
      <div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <h1 class="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Create List
          </h1>
        </div>
        <Error errors={error} />
        <div class="flow-root">
          <ul role="list">
            {selectedRecipes.map((recipe, index) => (
              <li>
                <RecipeInput
                  key={recipe.key}
                  index={index}
                  recipes={recipes}
                  selectedRecipes={selectedRecipes}
                  setSelectedRecipes={setSelectedRecipes}
                ></RecipeInput>
              </li>
            ))}
          </ul>
          <div class="mt-5 flex flex-col">
            <button
              onClick={addRecipe}
              class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Add Recipe
            </button>

            <button
              onClick={submit}
              class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Create List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
