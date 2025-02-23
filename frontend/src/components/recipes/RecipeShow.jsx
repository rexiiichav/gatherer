import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useLocation } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

export default function RecipeList({ url }) {
  let location = useLocation();
  let navigate = useNavigate();
  const [recipe, setRecipe] = useState({ ingredients: [] });
  let { id } = useParams();

  useEffect(() => {
    const header = new Headers();
    header.append("Authorization", `bearer ${location.state.token}`);

    const req = new Request(`${url}/recipe/${id}`, {
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
        setRecipe(response.recipe);
      });
  }, []);

  return (
    <>
      <h1>{recipe.name}</h1>

      <ol>
        {recipe.ingredients.map((ingredient, index) => (
          <li
            key={index}
          >{`${ingredient.quantity} ${ingredient.measure.name} ${ingredient.food.name}`}</li>
        ))}
      </ol>

      <Link
        to={`/recipe/${recipe.id}/edit`}
        state={{ token: location.state.token }}
      >
        Edit Recipe
      </Link>
    </>
  );
}
