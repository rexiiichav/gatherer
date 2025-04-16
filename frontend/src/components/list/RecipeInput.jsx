import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";

export default function IngredientInput({
  index,
  recipes,
  selectedRecipes,
  setSelectedRecipes,
}) {
  let [quantity, setQuantity] = useState("");
  let [recipe, setRecipe] = useState(selectedRecipes[index]);

  function handleChange(value, set) {
    set(value);
    let alteredSelectedRecipes = [...selectedRecipes];
    if (typeof value === "number") {
      alteredSelectedRecipes[index].quantity = value;
    } else {
      alteredSelectedRecipes[index].label = value.label;
      alteredSelectedRecipes[index].value = value.value;
    }
    setSelectedRecipes(alteredSelectedRecipes);
  }

  function removeRecipe() {
    let alteredSelectedRecipes = [...selectedRecipes];
    alteredSelectedRecipes.splice(index, 1);
    setSelectedRecipes(alteredSelectedRecipes);
  }

  return (
    <div class="flex flex-col gap-2">
      <div>
        <label
          for="number-input"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select a number:
        </label>
        <input
          type="number"
          id="number-input"
          aria-describedby="helper-text-explanation"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          min="0"
          value={quantity}
          onChange={(value) => {
            handleChange(Number(value.target.value), setQuantity);
          }}
        />
      </div>
      <div>
        <label
          for="recipe-input"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select a recipe:
        </label>
        <Select
          id="recipe-input"
          value={recipe}
          options={recipes}
          onChange={(value) => {
            handleChange(value, setRecipe);
          }}
        />
      </div>
      <button
        onClick={removeRecipe}
        class="self-end text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      >
        Remove
      </button>
    </div>
  );
}
