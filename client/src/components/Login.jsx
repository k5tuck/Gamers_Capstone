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
    <div className="signuppagecontainer">
      <h1 align="center">Please Sign In To Your Gamer Account</h1>
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
          required
          autoFocus
        />
        <br />
        <br/>
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
        <br />
        <br/>
        <input type="submit" value="Login" />
      </form>
      <br />
      <br/>
      <div align="center">
      
   <Link to="/signup">Sign Up</Link>
        
      </div>
      <footer>
        <p class="">&copy; 2021 Gamer's Paradise</p>
      </footer>
    </div>
  );
}

export default Login;
