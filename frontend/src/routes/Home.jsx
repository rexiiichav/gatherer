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
    <>
      <h1>{username}'s Dashboard</h1>
      <Link to="/recipes" state={{ token: location.state.token }}>
        Recipes
      </Link>
      <Link to="/recipes/new" state={{ token: location.state.token }}>
        Create New Recipe
      </Link>
      <Link to="/list" state={{ token: location.state.token }}>
        Create New List
      </Link>
    </>
  );
}
