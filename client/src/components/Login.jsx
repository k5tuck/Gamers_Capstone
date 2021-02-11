import React from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login({ isLoggedIn, setIsLoggedIn }) {
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [sessionid, setSessionId] = useState(null);

  const processLogin = async (e) => {
    e.preventDefault();
    let user = {
      username,
      password,
    };
    const resp = await axios.post("/api/login", user);
    console.log(resp.data);
    if (resp.data.status === true) {
      setIsLoggedIn(true);
      setSessionId(resp.data.sessionid);
      history.push("/member/home");
    } else {
      alert(resp.data.message);
    }
  };

  return (
    <div>
      <h1 align="center">Welcome Please Sign In To Your Gamer's Account</h1>
      <br />

      <form onSubmit={processLogin}>
        <input
          type="text"
          name="username"
          value={username}
          autofocus
          placeholder="username/email"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        required autoFocus/>
        <br />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        required autoFocus/>
        <br />
        <input type="submit" value="Login" />
      </form>
      <br />
      <div align="center">
        <p>
          If you need to Sign Up Please Click :<Link to="/signup">HERE</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
