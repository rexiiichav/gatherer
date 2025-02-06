import { useState, useContext } from "react";
import UsernameField from "./UsernameField";
import PasswordField from "./PasswordField";
import Error from "./Error";
import { useNavigate } from "react-router-dom";

export default function SignUp({ url }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState([]);
  const navigate = useNavigate();

  async function submitForm() {
    let errors = [];
    errors = validateForm(errors);
    if (errors.length == 0) {
      const header = new Headers();
      header.append("Content-Type", "application/json");

      const req = new Request(`${url}/user/signup`, {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
          confirmPassword: confirmPassword,
        }),
        headers: header,
        mode: "cors",
      });

      let response = await fetch(req);
      if (response.status == 409) {
        setError([...errors, "Username already taken."]);
      } else if (response.status == 200) {
        navigate("/login");
      }
    }
  }

  let validateForm = (errors) => {
    if (password != confirmPassword) {
      errors.push("Passwords don't match");
      setError(errors);
    }
    return errors;
  };

  return (
    <>
      <h1>Sign Up</h1>
      <Error errors={error} />
      <UsernameField label={"Username"} value={username} set={setUsername} />
      <PasswordField label={"Password"} value={password} set={setPassword} />
      <PasswordField
        label={"Confirm Password"}
        value={confirmPassword}
        set={setConfirmPassword}
      />
      <button onClick={submitForm}>Submit</button>
    </>
  );
}
