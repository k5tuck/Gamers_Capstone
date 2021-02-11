import React from "react";
import { Link } from "react-router-dom";

function FollowingPage({ following }) {
  return (
    <div>
      <h1>This is The Following Page</h1>
      {following.map((follower) => {
        return (
          <ul>
            <li>
              <Link to={`/profile/${follower.followee}`}>
                <div className="userpostpiccontainer">
                  <span className="postpiccontainer">
                    <img className="postpicimage" src={follower.photo} alt="" />
                  </span>
                  <h4>{follower.displayname}</h4>
                </div>
              </Link>
            </li>
          </ul>
        );
      })}
    </div>
  );
}

export default FollowingPage;
