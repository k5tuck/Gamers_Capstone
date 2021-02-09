import axios from "axios";
import React from "react";
import { Link, useHistory } from "react-router-dom";

function Header() {
  let history = useHistory();

  async function onSubmitLogout() {
    const resp = await axios.post("/api/logout");
    console.log(resp);
    history.push("/");
  }

  return (
    <div>
      <h1>Gamers Capstone</h1>
      <nav>
        <Link to="/member/home">
          <button>
            <li>Home</li>
          </button>
        </Link>
        <Link to="/about">
          <button>
            <li>About</li>
          </button>
        </Link>
        <Link to="/contact">
          <button>
            <li>Contact</li>
          </button>
        </Link>
        <Link to="/member/chat">
          <button>
            <li>Chat</li>
          </button>
        </Link>
        <button>
          <li onClick={onSubmitLogout}>Logout</li>
        </button>
      </nav>
    </div>
  );
}

export default Header;
