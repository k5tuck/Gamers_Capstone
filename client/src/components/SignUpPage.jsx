import React, { useState, useEffect } from "react";
import { Link, Router } from "react-router-dom";
import axios from "axios";
import { DropDownList } from "@progress/kendo-react-dropdowns";

function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayname, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [games, setGames] = useState([]);
  const [gameList, setGameList] = useState([]);
  const [photo, setPhoto] = useState("");

  const processNewUser = async (e) => {
    const newUser = {
      username,
      password,
      displayname,
      email,
      name,
      // photo
    };
    console.log(newUser);
    const resp = await axios.post("/api/signup", newUser);
    // const resp = await axios.post('/api/signup', {
    //     headers: {
    //         'Content-type': 'application/json'
    //     },
    //     body : {newUser},
    // })
    console.log(resp);
  };
  useEffect(() => {
    axios.get("/api/games").then((response) => {
      setGameList(response.data.getallgames);
      console.log(gameList);
    });
  }, []);

  return (
    <main className="">
      <form onSubmit={processNewUser}>
        <h1 className="">Sign Up Here</h1>
        <label className=""> Username</label>
        <input
          type="text"
          value={username}
          className=""
          name="username"
          placeholder="Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          required
          autofocus
        />

        <label className="">Password</label>
        <input
          type="password"
          value={password}
          className=""
          name="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />

        <label className=""> Display name</label>
        <input
          type="text"
          value={displayname}
          className=""
          name="displayname"
          placeholder="Display Name"
          onChange={(e) => {
            setDisplayName(e.target.value);
          }}
          required
          autofocus
        />

        <label className="">Email address</label>
        <input
          type="text"
          value={email}
          className=""
          name="email"
          placeholder="Email address"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />

        <label className="">name</label>
        <input
          type="text"
          value={name}
          className=""
          name="name"
          placeholder="Your name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
        />

        <label className="">5 Favorite Games</label>
        {/* <DropDownList 
            data={gameList}
            value={games}
            onChange={e=> setGames(...games, e.target.value)}
            dataItemKey='Game ID'
            textField='Game Title'
            defaultItem={{ 'Game Title': 'Select game...', 'Game ID': null }}
            /> */}

        <button
          disabled={games.length >= 5 ? true : false}
          onClick={(e) => {
            setGames(...games, games);
          }}
        >
          Add Game
        </button>

        <input className="" type="submit" value="Signup" />
      </form>
      <Link to="/login"><button className="">Log In</button></Link>
      <p class="">&copy; 2021</p>
    </main>
  );
}

export default SignUpPage;
