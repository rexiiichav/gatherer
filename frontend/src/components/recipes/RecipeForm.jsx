import { useEffect, useState, useRef } from "react";
import { Link } from "react-router";
import { useLocation } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import IngredientInput from "../ingredients/IngredientInput";

export default function RecipeList({ url, title }) {
  let location = useLocation();
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [recipe, setRecipe] = useState({ name: "", ingredients: [] });
  const [foods, setFoods] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [ingredients, setIngredients] = useState([...recipe.ingredients]);
  const keyRef = useRef(0);
  let params = useParams();

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
          let normalizedIngredients = response.recipe.ingredients.map(
            (ingredient) => {
              return {
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
              };
            }
          );
          setIngredients(normalizedIngredients);
          setName(response.recipe.name);
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
        food: { label: "Select", id: "Select" },
        measure: { label: "Select", id: "Select" },
        quantity: 0,
      },
    ]);
    keyRef.current = keyRef.current + 1;
  }

  function updateName(value) {
    setName(value);
  }

  function submitForm() {
    //reformat the ingredients and send as fetch request
    if (
      name != "" &&
      ingredients.every((ing) => {
        return (
          ing.food.value != "Select" &&
          ing.measure.value != "Select" &&
          Number(ing.quantity) > 0
        );
      })
    ) {
      let reformatIngredients = ingredients.map((ingredient) => {
        return {
          foodId: ingredient.food.value,
          measureId: ingredient.measure.value,
          quantity: ingredient.quantity,
        };
      });

      let formatRecipe = { name: name, ingredients: reformatIngredients };

      const header = new Headers();
      header.append("Content-Type", "application/json");
      header.append("Authorization", `bearer ${location.state.token}`);

      let submitUrl = "";
      if (params.hasOwnProperty("id")) {
        submitUrl = `${url}/recipe/edit/${params.id}`;
      } else {
        submitUrl = `${url}/recipe/new`;
      }

      const req = new Request(submitUrl, {
        method: "POST",
        body: JSON.stringify(formatRecipe),
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
            throw error;
          }
        })
        .then((response) => {
          navigate("/recipes", { state: { token: location.state.token } });
        })
        .catch();
    }
  }

  function deleteRecipe() {
    const header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("Authorization", `bearer ${location.state.token}`);

    let submitUrl = "";
    if (params.hasOwnProperty("id")) {
      submitUrl = `${url}/recipe/delete/${params.id}`;
    }

    const req = new Request(submitUrl, {
      method: "DELETE",
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
          throw error;
        }
      })
      .then((response) => {
        navigate("/recipes", { state: { token: location.state.token } });
      })
      .catch();
  }

  return (
    <>
      <h1>{title}</h1>

      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(value) => updateName(value.target.value)}
      />
      {ingredients.map((ingredient, index) => {
        return (
          <div key={ingredient.id}>
            <IngredientInput
              index={index}
              ingredient={ingredient}
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

      {params.hasOwnProperty("id") ? (
        <button onClick={deleteRecipe}>Delete Recipe</button>
      ) : (
        ""
      )}
    </>
  );
}
