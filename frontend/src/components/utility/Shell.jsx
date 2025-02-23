import { Link } from "react-router";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Shell({ children }) {
  let location = useLocation();
  let navigate = useNavigate();

  return (
    <>
      <ul>
        <li>
          <Link to="/recipes" state={{ token: location.state.token }}>
            Recipes
          </Link>
        </li>
        <li>
          <Link to="/recipe/create" state={{ token: location.state.token }}>
            Create New Recipe
          </Link>
        </li>
        <li>
          <Link to="/list/create" state={{ token: location.state.token }}>
            Create New List
          </Link>
        </li>
      </ul>

      {children}
    </>
  );
}
