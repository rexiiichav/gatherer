import { useEffect, useState, useRef } from "react";
import { Link } from "react-router";
import { useLocation } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import IngredientInput from "../ingredients/IngredientInput";

export default function RecipeList({ url, title }) {
  let location = useLocation();
  let navigate = useNavigate();
  const [recipe, setRecipe] = useState({ ingredients: [] });
  const [foods, setFoods] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [ingredients, setIngredients] = useState([...recipe.ingredients]);
  const keyRef = useRef(0);
  let params = useParams();
  // Add button to expand the ingredients array and check Ingredient Input

  //Get recipe if needed  and set ingredients list
  useEffect(() => {
    if (params.hasOwnProperty("id")) {
      const header = new Headers();
      header.append("Authorization", `bearer ${location.state.token}`);

      const req = new Request(`${url}/recipe/${params.id}`, {
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
          setIngredients(response.recipe.ingredients);
        });
    }
  }, []);

  //Get array of foods
  useEffect(() => {
    if (params.hasOwnProperty("id") && !location.hasOwnProperty("recipe")) {
      const header = new Headers();
      header.append("Authorization", `bearer ${location.state.token}`);

      const req = new Request(`${url}/food/index`, {
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
          setFoods(
            response.foods.map((food) => {
              return { value: food.id, label: food.name };
            })
          );
        });
    }
  }, []);

  //Get array of measures
  useEffect(() => {
    if (params.hasOwnProperty("id") && !location.hasOwnProperty("recipe")) {
      const header = new Headers();
      header.append("Authorization", `bearer ${location.state.token}`);

      const req = new Request(`${url}/measure/index`, {
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
          setMeasures(
            response.measures.map((measure) => {
              return { value: measure.id, label: measure.name };
            })
          );
        });
    }
  }, []);

  function addIngredient() {
    setIngredients([
      ...ingredients,
      {
        food: { name: "Select", id: "Select" },
        measure: { name: "Select", id: "Select" },
        quantity: 0,
      },
    ]);
    keyRef.current = keyRef.current + 1;
  }

  return (
    <>
      <h1>{title}</h1>
      <Link to="/" state={{ token: location.state.token }}>
        Home
      </Link>
      <Link to="/recipes/new" state={{ token: location.state.token }}>
        Create New Recipe
      </Link>
      <Link to="/list" state={{ token: location.state.token }}>
        Create New List
      </Link>

      {ingredients.map((ingredient, index) => {
        keyRef.current = keyRef.current + 1;
        return (
          <div key={keyRef.current}>
            <IngredientInput
              index={index}
              ingredient={{
                measure: {
                  value: ingredient.measure.id,
                  label: ingredient.measure.name,
                },
                food: {
                  value: ingredient.food.id,
                  label: ingredient.food.name,
                },
                quantity: ingredient.quantity,
              }}
              foods={foods}
              measures={measures}
              ingredients={ingredients}
              setIngredients={setIngredients}
            ></IngredientInput>
          </div>
        );
      })}

      <button onClick={addIngredient}>Add Ingredient</button>
    </>
  );
}
