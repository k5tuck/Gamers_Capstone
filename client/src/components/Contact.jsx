import React from "react";
import { Link, Router } from "react-router-dom";

function Contact() {
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
      <div >
        <h1>Contact Us.</h1>
        <h3>Joshua Lopez</h3>
        <ul className="contact">
          <li>
            <Link to="https://github.com/JoshuaNow">Github</Link>
          </li>
          <li>
            <Link to="https://www.linkedin.com/in/joshua-lopez-dev/">
              LinkedIn
            </Link>
          </li>
        </ul >
        <h3>Ian Storms</h3>
        <ul className="contact">
          <li>
            <Link to="https://github.com/Stormy110">Github</Link>
          </li>
          <li>
            <Link to="https://www.linkedin.com/in/ianstorms/">LinkedIn</Link>
          </li>
        </ul>
        <h3>Kevin Tucker</h3>
        <ul className="contact">
          <li>
            <Link to="https://github.com/k5tuck">Github</Link>
          </li>
          <li>
            <Link to="https://www.linkedin.com/in/ktuck18/">LinkedIn</Link>
          </li>
        </ul>
        <h3>Shoel Uddin</h3>
        <ul className="contact">
          <li>
            <Link to="https://github.com/shoel-uddin">Github</Link>
          </li>
          <li>
            <Link to="https://www.linkedin.com/in/shoel-uddin/">LinkedIn</Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Contact;
