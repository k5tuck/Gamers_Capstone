import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function GamePage() {
  const [game, setGame] = useState({});
  const [genre, setGenre] = useState("");
  const [platform, setPlatform] = useState("");
  const { id } = useParams();

  const getGame = async () => {
    const resp = await axios.get(`/api/game/${id}`);
    console.log(resp.data);
    setGame(resp.data);
    setGenre(resp.data.genre.replace(/[',}{"]+/g, " | "));
    setPlatform(resp.data.platform.replace(/['},{"]+/g, " | "));
  };
  useEffect(() => {
    getGame();
  }, []);
  return (
    <div className="gamepagecontainer">
      <div className="">
        <h1>{game.title}</h1>
        <div className="gameimgcontainer">
          <img className="gameimg" src={game.image} alt={game.title} />
        </div>
        <p>Genre: {genre}</p>
        <p>Platforms: {platform}</p>
        <Link to="/member/home">
          <button>Home</button>
        </Link>
      </div>
    </div>
  );
}

export default GamePage;
