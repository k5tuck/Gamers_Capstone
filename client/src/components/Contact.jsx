import React from "react";
import { Link, Router } from "react-router-dom";

function Contact() {
  return (
    <div>
      <div className="navbarcontainer">
        <div className="navlogocontainer">
          <img src="../../images/GPIcon.png" alt="logo" className="navlogo" />
        </div>
        <nav className="navlinks">
          {/* {isLoggedIn ? ( */}
          <Link to="/member/home" style={{ margin: "3% 3% 3% 13%" }}>
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
        </nav>
        <h1 className="navheader">
          Gamers
          <br />
          Paradise
        </h1>
      </div>
      <div className="contactpage">
        <h1>Contact Us.</h1>
        <h3>Joshua Lopez</h3>

        <li>
          <Link
            to={{ pathname: "https://github.com/JoshuaNow" }}
            target="_blank"
          >
            <button>Github</button>
          </Link>
        </li>
        <li>
          <Link
            to={{ pathname: "https://www.linkedin.com/in/joshua-lopez-dev/" }}
            target="_blank"
          >
            <button>LinkedIn</button>
          </Link>
        </li>

        <h3>Ian Storms</h3>

        <li>
          <Link
            to={{ pathname: "https://github.com/Stormy110" }}
            target="_blank"
          >
            <button>Github</button>
          </Link>
        </li>
        <li>
          <Link
            to={{ pathname: "https://www.linkedin.com/in/ianstorms/" }}
            target="_blank"
          >
            <button>LinkedIn</button>
          </Link>
        </li>

        <h3>Kevin Tucker</h3>

        <li>
          <Link to={{ pathname: "https://github.com/k5tuck" }} target="_blank">
            <button>Github</button>
          </Link>
        </li>
        <li>
          <Link
            to={{ pathname: "https://www.linkedin.com/in/ktuck18/" }}
            target="_blank"
          >
            <button>LinkedIn</button>
          </Link>
        </li>

        <h3>Shoel Uddin</h3>

        <li>
          <Link
            to={{ pathname: "https://github.com/shoel-uddin" }}
            target="_blank"
          >
            <button>Github</button>
          </Link>
        </li>
        <li>
          <Link
            to={{ pathname: "https://www.linkedin.com/in/shoel-uddin/" }}
            target="_blank"
          >
            <button>LinkedIn</button>
          </Link>
        </li>
        <br />
        <br />
      </div>
      <footer>
        <p class="">&copy; 2021 Gamers Paradise</p>
      </footer>
    </div>
  );
}

export default Contact;
