import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import PostContainer from "./subcomponents/PostContainer";

function GamePage() {
  const [game, setGame] = useState({});
  const [gameposts, setGamePosts] = useState([]);
  const [genre, setGenre] = useState("");
  const [sessionid, setSessionId] = useState(null);
  const [platform, setPlatform] = useState("");
  const { id } = useParams();

  const getGame = async () => {
    const resp = await axios.get(`/api/game/${id}`);
    console.log(resp.data);
    setGame(resp.data);
    setGenre(resp.data.genre.replace(/[',}{"]+/g, " | "));
    setPlatform(resp.data.platform.replace(/['},{"]+/g, " | "));
    const gameResp = await axios.get(`/api/gameposts/${id}`);
    setGamePosts(gameResp.data.posts);
    setSessionId(gameResp.data.sessionid);
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
      </div>
      <PostContainer posts={gameposts} sessionid={sessionid} />
    </div>
  );
}

export default GamePage;
