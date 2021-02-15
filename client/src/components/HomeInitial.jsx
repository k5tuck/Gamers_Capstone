import React from "react";
import { Link } from "react-router-dom";

function HomeInitial() {
  return (
    <div className="homeintialcontainer">
    <div className="homeinitial">
      <h1 className="homeinitialheader">Gamer's Paradise</h1>
      <br/>
      <div>
        <Link 
        style={{margin: "3%"}}
        to="/signup"><button >SignUp</button></Link>
       
        <Link 
        style={{margin: "3%"}}
        to="/login"><button >Login</button></Link>
        <br />
      </div>
      <footer>
        <p class="">&copy; 2021 Gamer's Paradise</p>
      </footer>
    </div>
    </div>
  );
}

export default HomeInitial;
