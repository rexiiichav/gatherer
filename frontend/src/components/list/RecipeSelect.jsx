import { useEffect, useState, useRef } from "react";
import { Link } from "react-router";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import RecipeInput from "../list/RecipeInput";

export default function RecipeSelect({ url }) {
  let location = useLocation();
  let navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  //Make it so the recipe selection form works similarly to the standard
  //recipe form
  const keyRef = useRef(0);
  //selectedRecipes needs to be [{},{},{}]

  useEffect(() => {
    const header = new Headers();
    header.append("Authorization", `bearer ${location.state.token}`);

    const req = new Request(`${url}/recipe/index`, {
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
        let formatRecipes = response.recipes.map((r) => {
          return { label: r.name, value: r.id };
        });
        setRecipes(formatRecipes);
      });
  }, []);

  function submit() {
    let formattedRecipes = {};
    selectedRecipes.forEach((recipe) => {
      if (recipe.value != undefined) {
        formattedRecipes[recipe.value] = recipe.quantity;
      }
    });

    const header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Authorization", `bearer ${location.state.token}`);

    let submitUrl = `${url}/list/new`;

    const req = new Request(submitUrl, {
      method: "POST",
      body: JSON.stringify({ recipes: formattedRecipes }),
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
        navigate("/list/edit", {
          state: {
            token: location.state.token,
            ingredients: response.ingredients,
          },
        });
      })
      .catch();
  }

  function addRecipe() {
    keyRef.current += 1;
    setSelectedRecipes([
      ...selectedRecipes,
      {
        key: keyRef.current,
        label: "Select",
        value: undefined,
        quantity: 0,
      },
    ]);
  }

  return (
    <>
      <h1>Select Recipes</h1>

      {selectedRecipes.map((recipe, index) => (
        <RecipeInput
          key={recipe.key}
          index={index}
          recipes={recipes}
          selectedRecipes={selectedRecipes}
          setSelectedRecipes={setSelectedRecipes}
        ></RecipeInput>
      ))}
      <button onClick={addRecipe}>Add Recipe</button>
      <button onClick={submit}>Create List</button>
    </>
  );
}
