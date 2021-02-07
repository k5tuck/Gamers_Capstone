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
    <div>
      <ul>
        <h2>{displayname}'s Top 5 Games </h2>
        {games.map((g) => {
          return (
            <Link
              style={{ textDecoration: "none" }}
              to={"/member/game/" + g.gameid}
            >
              <li style={{ listStyleType: "none" }}>{g.title}</li>
              <br />
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
export default PersonalTopGamesContainer;
