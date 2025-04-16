import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Home({ url }) {
  let location = useLocation();
  let navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const header = new Headers();
    header.append("Authorization", `bearer ${location.state.token}`);

    const req = new Request(`${url}/user/show`, {
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
        setUsername(response.username);
      });
  }, []);

  return (
    <div class="flex justify-center items-center p-15">
      <div class="blockmax-w-sm pt-6 pb-6 pr-15 pl-15 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div class="flex justify-center items-center flex-col gap-5">
          <h1 class="mb-5 text-3xl font-bold text-center">Welcome!</h1>

          <h2 class="text-xl font-bold text-center ">Quick Tutorial:</h2>
          <div class="flex justify-center items-center gap-5">
            <div class="flex flex-col justify-center items-center gap-2">
              <img src="recipe.png" alt="" class="w-20" />
              <h3 class="font-bold text-center">Recipes</h3>
            </div>
            <img src="add.png" alt="" class="w-10 h-10" />
            <div class="flex flex-col justify-center items-center gap-2">
              <img src="ingredient.png" alt="" class="w-20" />
              <h3 class="font-bold text-center">Odds & Ends</h3>
            </div>
            <img src="equal.png" alt="" class="w-10 h-10" />
            <div class="flex flex-col justify-center items-center gap-2">
              <img src="list.png" alt="" class="w-20" />
              <h3 class="font-bold text-center">Grocery List</h3>
            </div>
          </div>
          <div
            id="actions-container"
            class="flex justify-center items-center gap-5"
          ></div>
        </div>
      </div>
    </div>
  );
}
