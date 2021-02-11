import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function TopGamesContainer() {
  const [games, setGames] = useState([]);
  async function getGame() {
    const resp = await axios.get("/api/maintopfive");
    console.log(resp.data);
    setGames(resp.data);
  }
  useEffect(() => {
    getGame();
  }, []);
  return (
    <div className="TopGamesContainer">
      
        <h2>Current Top 5 Games </h2>
        {games
          ? games.map((g) => {
              return (
                <Link
                  className="links"
                  
                  to={"/member/game/" + g.gameid}
                >
                  <li style={{ listStyleType: "none" }}>{g.title}</li>
                  <br />
                </Link>
              );
            })
          : "No Games Added"}
      
    </div>
  );
}
export default TopGamesContainer;
