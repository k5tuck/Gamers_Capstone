import React from "react";
import { Link } from "react-router-dom";

function HomeInitial() {
  return (
    <>
      {/* <nav> This is my nav bar</nav> */}
      <h1>Welcome to GamersParadise</h1>
      <body>
        <article>
          Welcome to gamers GamersParadise, This is a true Video game social
          media platform to share video game content connect with average and
          professional players alike sharing video game any video game content
          (news, stories, release dates leaks)
        </article>
        <p>This is where the top 4 will show ~~~~</p>
      </body>
      <footer>
        <Link to="/signup">SignUp</Link>
        <br />
        <br />
        <Link to="/login">Login</Link>
        <br />
        {/* <Link to="/about"> About Us</Link>
                <br/>
                <Link to="/Contact"> Contact Us </Link> */}
      </footer>
    </>
  );
}

export default HomeInitial;
