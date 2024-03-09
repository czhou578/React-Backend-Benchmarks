import { useState } from "react";
import "./login.css";
import { FormField, Button, Form } from "semantic-ui-react";

const Login = () => {
  const loginRoute = "http://192.168.81.153:3001/login/login";
  const [username, setUsername] = useState("");
  const [passwowrd, setPassword] = useState("");

  const loginHandler = () => {
    fetch(loginRoute, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: passwowrd }),
    }).then((response: any) => {
      console.log(response);
      if (response.ok) return response.json();
    });
  };

  return (
    <div className="container">
      <div className="form">
        <Form>
          <h2 className="header">LOGIN</h2>
          <FormField width={10}>
            <label>Username</label>
            <input
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormField>
          <FormField width={10}>
            <label>Password</label>
            <input
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormField>
          <Button type="submit" onClick={() => loginHandler()}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
