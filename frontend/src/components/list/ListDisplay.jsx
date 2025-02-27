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
    <>
      {Object.keys(sortFoodsByLocation).map((location) => {
        return (
          <div key={location}>
            <h2>{location}</h2>
            <ul>
              {sortFoodsByLocation[location].map((food, index) => {
                return (
                  <li key={food.foodId * food.measureId}>
                    {food.quantity} {food.measure.name} of {food.name}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </>
  );
}
