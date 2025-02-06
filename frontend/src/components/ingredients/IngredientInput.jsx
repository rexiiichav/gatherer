import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";

export default function IngredientInput({
  ingredient = { food: null, measure: null, quantity: null },
  foods,
  measures,
}) {
  return (
    <>
      <Select options={foods} defaultValue={ingredient.food} />
      <input type="number" />
      <Select options={measures} />
    </>
  );
}
