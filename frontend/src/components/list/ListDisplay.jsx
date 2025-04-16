import { Link } from "react-router";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ListDisplay({ url }) {
  let location = useLocation();
  let navigate = useNavigate();
  const foods = location.state.foods;

  let sortFoodsByLocation = {};
  foods.forEach((food) => {
    if (sortFoodsByLocation.hasOwnProperty(food.location.name)) {
      sortFoodsByLocation[food.location.name].push(food);
    } else {
      sortFoodsByLocation[food.location.name] = [food];
    }
  });

  return (
    <div class="flex justify-center items-center p-15">
      <div class="blockmax-w-sm pt-6 pb-6 pr-15 pl-10 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <h1 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          List
        </h1>
        <ul>
          {Object.keys(sortFoodsByLocation).map((location) => {
            return (
              <li key={location}>
                <hr class="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700" />

                <h2 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                  {location}
                </h2>
                <ul>
                  {sortFoodsByLocation[location].map((food, index) => {
                    return (
                      <li key={food.foodId * food.measureId}>
                        {food.quantity} {food.measure.name} of {food.name}
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
