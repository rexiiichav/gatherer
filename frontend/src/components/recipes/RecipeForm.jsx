import { useEffect, useState, useRef } from "react";
import { Link } from "react-router";
import { useLocation } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import IngredientInput from "../ingredients/IngredientInput";

export default function RecipeList({ url, title }) {
  let location = useLocation();
  let navigate = useNavigate();
  const [recipe, setRecipe] = useState({ name: "", ingredients: [] });
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
          keyRef.current =
            response.recipe.ingredients
              .map((ing) => Number(ing.id))
              .reduce((a, b) => Math.max(a, b), 0) + 1;
        });
    }
  }, []);

  //Get array of foods
  useEffect(() => {
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
  }, []);

  //Get array of measures
  useEffect(() => {
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
  }, []);

  function addIngredient() {
    setIngredients([
      ...ingredients,
      {
        id: keyRef.current,
        food: { name: "Select", id: "Select" },
        measure: { name: "Select", id: "Select" },
        quantity: 0,
      },
    ]);
    keyRef.current = keyRef.current + 1;
  }

  function submitForm() {
    //reformat the ingredients and send as fetch request
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
        return (
          <div key={ingredient.id}>
            <IngredientInput
              index={index}
              ingredient={{
                id: ingredient.id,
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

      <button onClick={submitForm}>Submit Form</button>
    </>
  );
}
