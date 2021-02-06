import React, { useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import axios from "axios";


function GamePage() {

  const [game, setGame] = useState({})



  const getGame = async () => {
      const resp = await axios.get('/api/game/66')
      console.log(resp.data)
      setGame(resp.data)
  }
useEffect(()=>{
    getGame()
}, [])
  return (
    <div className="">
      <div className="">
        <h1>{game.title}</h1>
        <div className="">
          <img src={game.image} alt={game.title}/>
        </div>
        <p>Genre: ${game.genre}</p>
        <p>Platforms: ${game.platform}</p>
        <Link to="/member/home">
          <button>Home</button>
        </Link>
      </div>
    </div>
  );
}

export default GamePage;
