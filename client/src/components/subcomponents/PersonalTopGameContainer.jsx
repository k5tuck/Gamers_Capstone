import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function PersonalTopGamesContainer() {
  const { id } = useParams();
  const [displayname, setDisplayName] = useState("");
  const [games, setGames] = useState([]);

  async function getGame() {
    const resp = await axios.get(`/api/pertopfive/${id}`);
    console.log(resp.data);
    setGames(resp.data.grabPersonalTopFive);
    setDisplayName(resp.data.displayname);
  }
  useEffect(() => {
    getGame();
  }, []);
  return (
    <div className="TopGamesContainer">
      <h2>
        {displayname}'s
        <br /> Top 5 Games{" "}
      </h2>
      {games
        ? games.map((g) => {
            return (
              <Link className="links" to={"/member/game/" + g.gameid}>
                <li key={g.id} style={{ listStyleType: "none" }}>
                  {g.title}
                </li>
                <br />
              </Link>
            );
          })
        : "No Games Added"}
    </div>
  );
}
export default PersonalTopGamesContainer;
