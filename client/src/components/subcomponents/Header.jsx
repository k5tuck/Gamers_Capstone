import axios from "axios";
import React from "react";
import { Link, useHistory } from "react-router-dom";

function Header({ isLoggedIn, setIsLoggedIn }) {
  let history = useHistory();

  async function onSubmitLogout() {
    await axios.post("/api/logout");
    // console.log(resp);
    setIsLoggedIn(false);
    history.push("/");
  }

  return (
    <div className="navbarcontainer">
      <div className="navlogocontainer">
        <img src="../../images/GPIcon.png" alt="logo" className="navlogo" />
      </div>
      <nav className="navlinks">
        {/* {isLoggedIn ? ( */}
        <Link to="/member/home" style={{ margin: "3%" }}>
          <button>
            <li>Home</li>
          </button>
        </Link>
        {/* ) : (
          <Redirect to="/" />
        )} */}

        <Link to="/about" style={{ margin: "3%" }}>
          <button>
            <li>About</li>
          </button>
        </Link>

        <Link to="/contact" style={{ margin: "3%" }}>
          <button>
            <li>Contact</li>
          </button>
        </Link>

        <button style={{ margin: "3%" }}>
          <li onClick={onSubmitLogout}>Logout</li>
        </button>
      </nav>
      <h1 className="navheader">
        Gamers
        <br />
        Paradise
      </h1>
    </div>
  );
}

export default Header;
