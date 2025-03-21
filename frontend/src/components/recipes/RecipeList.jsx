import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function RecipeList({ url }) {
  let location = useLocation();
  let navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);

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

  return (
    <>
      <h1>Recipes</h1>

      <ol>
        {recipes.map((recipe, index) => (
          <Link
            key={recipe.id}
            to={`/recipe/${recipe.id}`}
            state={{ token: location.state.token }}
          >
            <li>{recipe.name}</li>
          </Link>
        ))}
      </ol>
    </>
  );
}
