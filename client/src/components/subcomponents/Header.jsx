import axios from "axios";
import React from "react";
import { Link, useHistory, Redirect } from "react-router-dom";

function Header({ isLoggedIn, setIsLoggedIn }) {
  let history = useHistory();

  async function onSubmitLogout() {
    const resp = await axios.post("/api/logout");
    console.log(resp);
    setIsLoggedIn(false);
    history.push("/");
  }

  return (
    <div>
      <h1>Gamers Capstone</h1>
      <nav>
        {isLoggedIn ? (
          <Link to="/member/home">
            <button>
              <li>Home</li>
            </button>
          </Link>
        ) : (
          <Redirect to="/" />
        )}

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

        <button>
          <li onClick={onSubmitLogout}>Logout</li>
        </button>
      </nav>
    </div>
  );
}

export default Header;
