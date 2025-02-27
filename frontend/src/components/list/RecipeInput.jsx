import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";

export default function IngredientInput({
  index,
  recipes,
  selectedRecipes,
  setSelectedRecipes,
}) {
  let [quantity, setQuantity] = useState(0);
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
    <div>
      <input
        type="number"
        value={quantity}
        onChange={(value) => {
          handleChange(Number(value.target.value), setQuantity);
        }}
      />
      <Select
        value={recipe}
        options={recipes}
        onChange={(value) => {
          handleChange(value, setRecipe);
        }}
      />
      <button onClick={removeRecipe}>Remove Recipe</button>
    </div>
  );
}
