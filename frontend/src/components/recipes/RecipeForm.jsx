import { useEffect, useState, useRef } from "react";
import { Link } from "react-router";
import { useLocation } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import IngredientInput from "../ingredients/IngredientInput";
import Error from "../utility/Error";

export default function RecipeList({ url, title }) {
  let location = useLocation();
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [recipe, setRecipe] = useState({ name: "", ingredients: [] });
  const [foods, setFoods] = useState(undefined);
  const [measures, setMeasures] = useState(undefined);
  const [ingredients, setIngredients] = useState(undefined);
  const [modalStatus, setModalStatus] = useState(false);
  const [error, setError] = useState([]);
  const keyRef = useRef(0);
  const errorSection = useRef(null);
  let params = useParams();

  //Get recipe if needed  and set ingredients list

  useEffect(() => {
    if (params.hasOwnProperty("id")) {
      const header = new Headers();
      header.append("Authorization", `bearer ${location.state.token}`);

      const req = new Request(`${url}/recipe/${params.id}`, {
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
          let normalizedIngredients = response.recipe.ingredients.map(
            (ingredient) => {
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
            }
          );
          setIngredients(normalizedIngredients);
          setName(response.recipe.name);
          keyRef.current =
            response.recipe.ingredients
              .map((ing) => Number(ing.id))
              .reduce((a, b) => Math.max(a, b), 0) + 1;
        });
    } else {
      setIngredients([...recipe.ingredients]);
    }
  }, []);

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

  function updateName(value) {
    setName(value);
  }

  function submitForm() {
    //reformat the ingredients and send as fetch request
    if (
      name != "" &&
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

      let formatRecipe = { name: name, ingredients: reformatIngredients };

      const header = new Headers();
      header.append("Content-Type", "application/json");
      header.append("Authorization", `bearer ${location.state.token}`);

      let submitUrl = "";
      if (params.hasOwnProperty("id")) {
        submitUrl = `${url}/recipe/edit/${params.id}`;
      } else {
        submitUrl = `${url}/recipe/new`;
      }

      const req = new Request(submitUrl, {
        method: "POST",
        body: JSON.stringify(formatRecipe),
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
            throw error;
          }
        })
        .then((response) => {
          navigate("/recipes", { state: { token: location.state.token } });
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
      if (name == "") {
        errors.push("Recipe Needs a Name.");
      }
      if (
        ingredients.some((ing) => {
          return (
            ing.food.value == "Select" ||
            ing.measure.value == "Select" ||
            Number(ing.quantity) <= 0
          );
        })
      ) {
        errors.push(
          "All Ingredients Must Have Food, Value, and Quantity Selected."
        );
      }
      setError(errors);
    }
  }

  function deleteRecipe() {
    const header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Authorization", `bearer ${location.state.token}`);

    let submitUrl = "";
    if (params.hasOwnProperty("id")) {
      submitUrl = `${url}/recipe/delete/${params.id}`;
    }

    const req = new Request(submitUrl, {
      method: "DELETE",
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
          throw error;
        }
      })
      .then((response) => {
        navigate("/recipes", { state: { token: location.state.token } });
      })
      .catch();
  }

  function toggleModal() {
    modalStatus ? setModalStatus(false) : setModalStatus(true);
  }

  if (foods == undefined || measures == undefined || ingredients == undefined) {
    return <></>;
  }

  return (
    <div ref={errorSection} class="flex items-center justify-center p-10">
      <div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <h1 class="text-xl font-bold leading-none text-gray-900 dark:text-white">
            {title}
          </h1>
        </div>
        <Error errors={error} />
        <div class="flow-root">
          <ul role="list">
            <li class="mb-5">
              <label
                htmlFor="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Recipe name:
              </label>
              <input
                type="text"
                id="name"
                autocomplete="off"
                value={name}
                onChange={(value) => updateName(value.target.value)}
                class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </li>
            {ingredients.map((ingredient, index) => {
              return (
                <>
                  <hr class="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700" />
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

            {params.hasOwnProperty("id") ? (
              <button
                data-modal-target="popup-modal"
                data-modal-toggle="popup-modal"
                class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                type="button"
                onClick={toggleModal}
              >
                Delete Recipe
              </button>
            ) : (
              ""
            )}

            {modalStatus && (
              <div
                id="popup-modal"
                tabindex="-1"
                class=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
              >
                <div class="relative p-4 w-full max-w-md max-h-full">
                  <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                    <button
                      type="button"
                      class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      data-modal-hide="popup-modal"
                      onClick={toggleModal}
                    >
                      <svg
                        class="w-3 h-3"
                        aria-hidden="true"
                        xmlns="/close.png"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span class="sr-only">Close modal</span>
                    </button>
                    <div class="p-4 md:p-5 text-center">
                      <svg
                        class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                      <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete this recipe?
                      </h3>
                      <button
                        data-modal-hide="popup-modal"
                        type="button"
                        class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                        onClick={deleteRecipe}
                      >
                        Yes, I'm sure
                      </button>
                      <button
                        data-modal-hide="popup-modal"
                        type="button"
                        class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        onClick={toggleModal}
                      >
                        No, cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
