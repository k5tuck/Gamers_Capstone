import React from "react";
import { Link } from "react-router-dom";

function FollowerPage({ followers, closeFollowerModal }) {
  return (
    <div className="followermodal">
      <h1 classname="followermodalheader">Followers:</h1>
      {followers.map((follower) => {
        return (
          <li className="followers">
            <Link
              className="followerlinks"
              to={`/profile/${follower.follower}`}
            >
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
      <br />
      <br />
      <button
        onClick={(e) => {
          closeFollowerModal();
        }}
      >
        Close
      </button>
    </div>
  );
}

export default FollowerPage;
