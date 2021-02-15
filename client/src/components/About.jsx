import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="aboutcontainer">
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
      <div className="aboutparagraph">
        <h1>About Us</h1>
        <p className="aboutp">
          We are a group of coders who love to play video games with our friends. Our
          goal for this project was to build an application that brings gamers
          together. Gamer's Paradise is a social media web application where users can upload images and videos of video games
          to the world. The application also allows for other users to comment and provide feedback on your content or share content of their own.
          You can discover what video games your friends are currently playing or 
          what the most popular video games worldwide are. We hope you enjoy!
        </p>
      </div>
      <footer>
        <p class="">&copy; 2021 Gamer's Paradise</p>
      </footer>
    </div>
  );
}

export default About;
