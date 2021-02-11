import React from "react";
import { Link } from "react-router-dom";

function FollowerPage({ followers }) {
  return (
    <div>
      <h1>This is The Followers Page</h1>
      {followers.map((follower) => {
        return (
          <ul>
            <li>
              <Link to={`/profile/${follower.follower}`}>
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

export default FollowerPage;
