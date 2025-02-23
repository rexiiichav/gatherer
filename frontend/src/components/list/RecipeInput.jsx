import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";

//need to enable default ingredient selections

export default function IngredientInput({
  recipe,
  selectedRecipes,
  setSelectedRecipes,
}) {
  let [quantity, setQuantity] = useState(0);

  function handleChange(recipeId, value) {
    setQuantity(value);
    let alteredSelectedRecipes = { ...selectedRecipes };
    alteredSelectedRecipes[recipeId] = value;
    setSelectedRecipes(alteredSelectedRecipes);
  }

  return (
    <div>
      <label htmlFor={recipe.id}>{recipe.name}</label>
      <input
        id={recipe.id}
        type="number"
        value={quantity}
        onChange={(value) => {
          handleChange(recipe.id, Number(value.target.value));
        }}
      />
    </div>
  );
}
