import React from "react";
import { Link } from "react-router-dom";

function FollowingPage({ following }) {
  return (
    <div className="followermodal">
      <h1 className="followermodalheader">Following:</h1>
      {following.map((follower) => {
        return (
          <li className="followers">
            <Link className="followerlinks" to={`/profile/${follower.followee}`}>
              <div className="userpostpiccontainer">
                <span className="postpiccontainer">
                  <img className="postpicimage" src={follower.photo} alt="" />
                </span>
                <h4>{follower.displayname}</h4>
              </div>
            </Link>
          </li>
        );
      })}
    </div>
  );
}

export default FollowingPage;
