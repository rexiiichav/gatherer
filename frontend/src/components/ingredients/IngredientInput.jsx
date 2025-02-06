import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";

//need to enable default ingredient selections

export default function IngredientInput({
  index,
  ingredient = {
    food: { name: null },
    measure: { name: null },
    quantity: null,
  },
  foods,
  measures,
  ingredients,
  setIngredients,
}) {
  const [quantity, setQuantity] = useState(null);
  const [measure, setMeasure] = useState(null);
  const [food, setFood] = useState(null);

  function handleChange(value, set) {
    set(value);
  }

  useEffect(() => {
    if (quantity && measure && food) {
      let changedIngredients = [...ingredients];
      changedIngredients[index] = {
        foodId: food.value,
        measureId: measure.value,
        quantity: quantity,
      };
      setIngredients(changedIngredients);
    }
  }, [quantity, measure, food]);

  return (
    <>
      <input
        type="number"
        onChange={(value) => {
          handleChange(Number(value.target.value), setQuantity);
        }}
      />
      <Select
        options={measures}
        onChange={(value) => {
          handleChange(value, setMeasure);
        }}
      />
      <Select
        options={foods}
        onChange={(value) => {
          handleChange(value, setFood);
        }}
      />
    </>
  );
}
