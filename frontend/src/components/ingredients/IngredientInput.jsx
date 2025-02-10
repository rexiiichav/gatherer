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
  const [quantity, setQuantity] = useState(ingredient.quantity);
  const [measure, setMeasure] = useState(ingredient.measure);
  const [food, setFood] = useState(ingredient.food);

  function handleChange(value, set) {
    set(value);
  }

  useEffect(() => {
    if (quantity && measure && food) {
      let changedIngredients = [...ingredients];
      changedIngredients[index] = {
        food: food,
        measure: measure,
        quantity: quantity,
      };
      setIngredients(changedIngredients);
    }
  }, [quantity, measure, food]);

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
    </>
  );
}
