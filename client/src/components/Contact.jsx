import React from "react";
import { Link, Router } from "react-router-dom";

function Contact() {
  return (
    <div >
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
            <Link to="https://github.com/JoshuaNow"><button>Github</button></Link>
          </li>
          <li>
            <Link to="https://www.linkedin.com/in/joshua-lopez-dev/">
            <button>LinkedIn</button>
            </Link>
          </li>
        
        <h3>Ian Storms</h3>
       
          <li>
            <Link to="https://github.com/Stormy110"><button>Github</button></Link>
          </li>
          <li>
            <Link to="https://www.linkedin.com/in/ianstorms/"><button>LinkedIn</button></Link>
          </li>
        
        <h3>Kevin Tucker</h3>
        
          <li>
            <Link to="https://github.com/k5tuck"><button>Github</button></Link>
          </li>
          <li>
            <Link to="https://www.linkedin.com/in/ktuck18/"><button>LinkedIn</button></Link>
          </li>
       
        <h3>Shoel Uddin</h3>
        
          <li>
            <Link to="https://github.com/shoel-uddin"><button>Github</button></Link>
          </li>
          <li>
            <Link to="https://www.linkedin.com/in/shoel-uddin/"><button>LinkedIn</button></Link>
          </li>
          <br/>
          <br/>
        
      </div>
      <footer>
        <p class="">&copy; 2021 Gamers Paradise</p>
      </footer>
    </div>
  );
}

export default Contact;
