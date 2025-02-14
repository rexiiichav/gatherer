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
    console.log(changedIngredients);
    setIngredients(changedIngredients);
  }, [food, quantity, measure]);

  function removeIngredient() {
    let editIngredients = [...ingredients];
    editIngredients.splice(index, 1);
    setIngredients(editIngredients);
  }

  return (
    <>
      <input
        type="number"
        value={quantity}
        onChange={(value) => {
          handleChange(Number(value.target.value), setQuantity);
        }}
      />
      <Select
        value={measure}
        options={measures}
        onChange={(value) => {
          handleChange(value, setMeasure);
        }}
      />
      <Select
        value={food}
        options={foods}
        onChange={(value) => {
          handleChange(value, setFood);
        }}
      />
      <button onClick={removeIngredient}>Remove Ingredient</button>
    </>
  );
}
