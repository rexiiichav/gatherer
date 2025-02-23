import { useEffect, useState, useRef } from "react";
import { Link } from "react-router";
import { useLocation } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import IngredientInput from "../ingredients/IngredientInput";

export default function RecipeList({ url, title }) {
  let location = useLocation();
  let navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [ingredients, setIngredients] = useState(createIngredients());
  const keyRef = useRef(0);
  keyRef.current =
    location.state.ingredients
      .map((ing) => Number(ing.id))
      .reduce((a, b) => Math.max(a, b), 0) + 1;
  let params = useParams();

  function createIngredients() {
    let normalizedIngredients = location.state.ingredients.map((ingredient) => {
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
    });
    return normalizedIngredients;
  }

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

  function submitForm() {
    //reformat the ingredients and send as fetch request
    if (
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

      const header = new Headers();
      header.append("Content-Type", "application/json");
      header.append("Authorization", `bearer ${location.state.token}`);

      let submitUrl = `${url}/list/edit`;

      const req = new Request(submitUrl, {
        method: "POST",
        body: JSON.stringify({ ingredients: reformatIngredients }),
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
          navigate("/list/display", {
            state: { token: location.state.token, foods: response.foods },
          });
        })
        .catch();
    }
  }

  return (
    <>
      <h1>Edit List</h1>

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
    </>
  );
}
