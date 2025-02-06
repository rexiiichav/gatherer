import { useState, useContext } from "react";
import UsernameField from "./UsernameField";
import PasswordField from "./PasswordField";
import Error from "./Error";
import { useNavigate } from "react-router-dom";

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
    <>
      <h1>Log In</h1>
      <Error errors={error} />
      <UsernameField label={"Username"} value={username} set={setUsername} />
      <PasswordField label={"Password"} value={password} set={setPassword} />
      <button onClick={submitForm}>Submit</button>
    </>
  );
}
