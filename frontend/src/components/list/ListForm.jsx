import { useEffect, useState, useRef } from "react";
import { Link } from "react-router";
import { useLocation } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import IngredientInput from "../ingredients/IngredientInput";
import Error from "../utility/Error";

export default function RecipeList({ url, title }) {
  let location = useLocation();
  let navigate = useNavigate();
  const [foods, setFoods] = useState(undefined);
  const [measures, setMeasures] = useState(undefined);
  const [ingredients, setIngredients] = useState(createIngredients());
  const [error, setError] = useState([]);
  const keyRef = useRef(0);
  const errorSection = useRef(null);
  keyRef.current =
    location.state.ingredients
      .map((ing) => Number(ing.id))
      .reduce((a, b) => Math.max(a, b), 0) + 1;
  let params = useParams();

  function createIngredients() {
    let normalizedIngredients = location.state.ingredients.map((ingredient) => {
      return {
        id: ingredient.id,
        measure: {
          value: ingredient.measure.id,
          label: ingredient.measure.name,
        },
        food: {
          value: ingredient.food.id,
          label: ingredient.food.name,
        },
        quantity: ingredient.quantity,
      };
    });
    return normalizedIngredients;
  }

  //Get array of foods
  useEffect(() => {
    const header = new Headers();
    header.append("Authorization", `bearer ${location.state.token}`);

    const req = new Request(`${url}/food/index`, {
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
        setFoods(
          response.foods.map((food) => {
            return { value: food.id, label: food.name };
          })
        );
      });
  }, []);

  //Get array of measures
  useEffect(() => {
    const header = new Headers();
    header.append("Authorization", `bearer ${location.state.token}`);

    const req = new Request(`${url}/measure/index`, {
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
        setMeasures(
          response.measures.map((measure) => {
            return { value: measure.id, label: measure.name };
          })
        );
      });
  }, []);

  useEffect(() => {
    if (error.length > 0) {
      errorSection.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [error]);

  function addIngredient() {
    setIngredients([
      ...ingredients,
      {
        id: keyRef.current,
        food: { label: "Select", id: "Select" },
        measure: { label: "Select", id: "Select" },
        quantity: "",
      },
    ]);
    keyRef.current = keyRef.current + 1;
  }

  function submitForm() {
    //reformat the ingredients and send as fetch request
    if (
      ingredients.every((ing) => {
        return (
          ing.food.value != "Select" &&
          ing.measure.value != "Select" &&
          Number(ing.quantity) > 0
        );
      })
    ) {
      let reformatIngredients = ingredients.map((ingredient) => {
        return {
          foodId: ingredient.food.value,
          measureId: ingredient.measure.value,
          quantity: ingredient.quantity,
        };
      });

      const header = new Headers();
      header.append("Content-Type", "application/json");
      header.append("Authorization", `bearer ${location.state.token}`);

      let submitUrl = `${url}/list/edit`;

      const req = new Request(submitUrl, {
        method: "POST",
        body: JSON.stringify({ ingredients: reformatIngredients }),
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
          navigate("/list/display", {
            state: { token: location.state.token, foods: response.foods },
          });
        })
        .catch();
      return (
        <div class="flex items-center justify-center w-56 h-56 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
          <div class="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
            submitting...
          </div>
        </div>
      );
    } else {
      let errors = [];
      errors.push(
        "All Ingredients Must Have Food, Value, and Quantity Selected."
      );
      setError(errors);
    }
  }

  if (foods == undefined || measures == undefined) {
    return <></>;
  }
  return (
    <div ref={errorSection} class="flex items-center justify-center p-10">
      <div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <h1 class="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Edit List
          </h1>
        </div>
        <Error errors={error} />
        <div class="flow-root">
          <ul role="list">
            {ingredients.map((ingredient, index) => {
              return (
                <>
                  <li class="" key={ingredient.id}>
                    <IngredientInput
                      index={index}
                      ingredient={ingredient}
                      foods={foods}
                      measures={measures}
                      ingredients={ingredients}
                      setIngredients={setIngredients}
                    ></IngredientInput>
                  </li>
                  <hr class="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700" />
                </>
              );
            })}
          </ul>
          <div class="mt-5 flex flex-col">
            <button
              onClick={addIngredient}
              class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Add Ingredient
            </button>

            <button
              onClick={submitForm}
              class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
