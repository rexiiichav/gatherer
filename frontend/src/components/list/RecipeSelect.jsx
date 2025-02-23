import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import RecipeInput from "../list/RecipeInput";

export default function RecipeSelect({ url }) {
  let location = useLocation();
  let navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipes, setSelectedRecipes] = useState({});
  //FIX THE DATA STRUCTURE
  //Finish RecipeInput, then add in a post request to create list
  //Then send the recipes to the RecipeForm for mutation

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
        setRecipes(response.recipes);
      });
  }, []);

  function submit() {
    const header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Authorization", `bearer ${location.state.token}`);

    let submitUrl = `${url}/list/new`;

    const req = new Request(submitUrl, {
      method: "POST",
      body: JSON.stringify({ recipes: selectedRecipes }),
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

  return (
    <>
      <h1>Select Recipes</h1>

      {recipes.map((recipe) => (
        <RecipeInput
          key={recipe.id}
          recipe={recipe}
          selectedRecipes={selectedRecipes}
          setSelectedRecipes={setSelectedRecipes}
        ></RecipeInput>
      ))}
      <button onClick={submit}>Create List</button>
    </>
  );
}
