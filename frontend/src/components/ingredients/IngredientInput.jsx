import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";

//need to enable default ingredient selections

export default function IngredientInput({
  index,
  ingredient,
  foods,
  measures,
  ingredients,
  setIngredients,
}) {
  const indexLengthRef = useRef(ingredients.length);
  const [quantity, setQuantity] = useState(ingredient.quantity);
  const [measure, setMeasure] = useState(ingredient.measure);
  const [food, setFood] = useState(ingredient.food);

  function handleChange(value, set) {
    set(value);
  }

  useEffect(() => {
    let changedIngredients = [...ingredients];
    changedIngredients[index] = {
      id: ingredient.id,
      food: food,
      measure: measure,
      quantity: quantity,
    };
    setIngredients(changedIngredients);
  }, [food, quantity, measure]);

  function removeIngredient() {
    let editIngredients = [...ingredients];
    editIngredients.splice(index, 1);
    setIngredients(editIngredients);
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
          for="measure-input"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select a measurement:
        </label>
        <Select
          id="measure-input"
          value={measure}
          options={measures}
          onChange={(value) => {
            handleChange(value, setMeasure);
          }}
        />
      </div>
      <div>
        <label
          for="food-input"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select a food:
        </label>
        <Select
          id="food-input"
          value={food}
          options={foods}
          onChange={(value) => {
            handleChange(value, setFood);
          }}
        />
      </div>
      <button
        onClick={removeIngredient}
        class="self-end text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      >
        Remove
      </button>
    </div>
  );
}
