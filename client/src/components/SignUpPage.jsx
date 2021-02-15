import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { MultiSelect } from "@progress/kendo-react-dropdowns";
// import { filterBy } from "@progress/kendo-data-query";

function SignUpPage(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayname, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [games, setGames] = useState([]);
  const [gameList, setGameList] = useState([]);
  const [photo, setPhoto] = useState("");

  let history = useHistory();

  // formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json'}));

  // data.append("username", username);
  // data.append("password", password);
  // data.append("displayname", displayname);
  // data.append("email", email);
  // data.append("name", name);
  // data.append("games", games);

  // console.log(data);

  const processNewUser = async (e) => {
    e.preventDefault();
    const newUser = {
      username,
      password,
      displayname,
      email,
      name,
      games,
    };
    const resp = await axios.post("/api/signup", newUser);
    const newuserid = resp.data.id;

    const data = new FormData();
    data.append("file", photo);

    await axios.put(`/api/signup/${newuserid}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // console.log(resp);
    // console.log(imgresp);

    history.push("/login");
    // <Redirect to="/login" />;
  };
  useEffect(() => {
    axios.get("/api/games").then((response) => {
      setGameList(response.data.getallgames);
      // console.log(gameList);
    });
  }, []);

  return (
    <main className="signuppagecontainer">
      <form onSubmit={processNewUser}>
        <h1 className="">Sign Up Here</h1>
        <label className="">
          {" "}
          Username :
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
            autoFocus
          />
        </label>
        <br />
        <label className="">
          Password :
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
        </label>
        <br />
        <label className="">
          {" "}
          Display Name :
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
          />
        </label>
        <br />
        <label className="">
          Email Address :
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
        </label>
        <br />
        <label className="">
          Name :
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
        </label>
        <br />
        <label className="">
          {" "}
          Your profile Pic :
          <input
            type="file"
            name="photo"
            onChange={(e) => {
              setPhoto(e.target.files[0]);
            }}
          />
        </label>
        <br />

        <label className="">
          Please Choose Your 5 Favorite Games
          <MultiSelect
            data={gameList.slice()}
            onChange={(e) => {
              setGames(e.target.value);
            }}
            placeholder="Begin by typing in a game title..."
            value={games}
            dataItemKey="id"
            textField="title"
            filterable={true}
            // onFilterChange={e => {
            //   let results = filterBy(gameList.slice(), e.filter)
            //   setGameList(results)
            // }}
            // defaultItem={{ title: "Select game...", id: null }}
          />
          {/* <button
          disabled={games.length > 5 ? true : false}
          value={games}
          onClick={(e) => {
            setGames(games)
            console.log(games)
          }}
        >
          Add Game
        </button> */}
        </label>

        <input className="" type="submit" value="Signup" />
      </form>
      <Link to="/login">
        <button className="">Log In</button>
      </Link>
      <footer>
        <p class="">&copy; 2021 Gamers Paradise</p>
      </footer>
    </main>
  );
}

export default SignUpPage;
