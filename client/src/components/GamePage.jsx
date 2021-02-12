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

  async function addLike(pid) {
    const resp = await axios.put(`/api/like/${pid}`, { like: true });
    console.log(resp.data);
    const newPosts = gameposts.map((p) => {
      if (p.id === pid) {
        console.log(p.id);
        return {
          ...p,
          Likes: [...p.Likes, resp.data],
        };
      } else {
        return p;
      }
    });
    setGamePosts(newPosts);
  }

  async function deleteLike(pid) {
    const resp = await axios.delete(`/api/like/${pid}`);
    console.log(resp.data);
    const newPosts = gameposts.map((p) => {
      if (p.id === pid) {
        console.log(p.id);
        return {
          ...p,
          // Little Off
          // Likes: p.Likes.filter(
          //   (l) => l.userid !== sessionid && l.postid !== pid
          // ),
          Likes: p.Likes.filter((l) => {
            if (l.userid === sessionid && l.postid === pid) {
              return false;
            } else return true;
          }),
        };
      } else {
        return p;
      }
    });
    setGamePosts(newPosts);
  }

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
      <PostContainer
        posts={gameposts}
        sessionid={sessionid}
        addLike={addLike}
        deleteLike={deleteLike}
      />
      <footer>
        <p class="">&copy; 2021 Gamers Paradise</p>
      </footer>
    </div>
  );
}

export default GamePage;
