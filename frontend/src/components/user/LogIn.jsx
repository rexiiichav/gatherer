import { useState, useContext } from "react";
import UsernameField from "./UsernameField";
import PasswordField from "./PasswordField";
import Error from "./Error";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router";

export default function LogIn({ url }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);
  const navigate = useNavigate();

  async function submitForm() {
    let errors = [];
    errors = validateForm(errors);
    if (errors.length == 0) {
      const header = new Headers();
      header.append("Content-Type", "application/json");

      const req = new Request(`${url}/user/login`, {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        headers: header,
        mode: "cors",
      });

      let response = await fetch(req);
      if (response.status == 401) {
        setError([...errors, "Username or Password Is Incorrect."]);
      } else if (response.status == 200) {
        response = await response.json();
        navigate("/", { state: { token: response.token } });
        //use Navigate + Location state hooks to send token to next route
      }
    }
  }

  let validateForm = (errors) => {
    if (password == "" || username == "") {
      errors.push("Username and Password Must Be Filled In");
      setError(errors);
    }
    return errors;
  };

  return (
    <div class="flex flex-col justify-center items-center gap-3">
      <img class="w-25" src="/berries.png" alt="" />
      <Error errors={error} />
      <UsernameField label={"Username"} value={username} set={setUsername} />
      <PasswordField label={"Password"} value={password} set={setPassword} />
      <button
        type="button"
        class="mt-4 w-35 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        onClick={submitForm}
      >
        Log In
      </button>
      <Link to="/sign-up">
        <button
          type="button"
          class="w-25 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Sign Up
        </button>
      </Link>
    </div>
  );
}
