import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <>
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
        {/* <Link to="/login">
          <button>
            <li>Login</li>
          </button>
        </Link> */}
      </nav>
      <div className="game-page">
        <h1>About Us</h1>
        <p>
          We are a group of coders who loves to play games with our friends.
          <br />
          Our goal for this project was to build an application that brings
          gamers together.
          <br />
          Gamer's Paradise is a social site where users can share video games
          they have played recently and other users can review and comment their
          opinions about those games.
          <br />
          We hope you enjoy!
        </p>
      </div>
    </>
  );
}

export default About;
