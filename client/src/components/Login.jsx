import React from "react";

function Login() {
  return (
    <div>
      <h1 align="center">Welcome Please Sign In To Your Gamer's Account</h1>
      <br />

      <form align="center" method="POST">
        <input
          type="text"
          name="username"
          autofocus
          placeholder="username/email"
        />
        <br />
        <input type="password" name="password" />
        <br />
        <input type="submit" value="Login" />
      </form>
      <br />
      <div align="center">
        <a href="/">
          <button>BACK</button>
        </a>
      </div>

      <div align="center">
        <p>
          If you need to Sign Up Please Click <a href="/signup">HERE</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
