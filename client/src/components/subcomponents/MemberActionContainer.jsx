import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const MemberActionContainer = () => {
  const [id, setid] = useState(null);

  const [followers, setFollower] = useState([]);
  const [following, setFollowing] = useState([]);

  const getFollowers = async () => {
    const resp = await axios.get("/api/follow");
    console.log(resp.data);
    setid(resp.data.id);
  };
  getFollowers();
  let followersPath = "/members/followers/" + id;
  let followingPath = "/members/following/" + id;
  let profilePath = "/member/profile/" + id;
  // let followers = 35;
  // let followees = 77;

  return (
    <div className="memberactionscontainer">
      <div className="memberactionsfollowers">
        <Link style={{ textDecoration: "none" }} to={followersPath}>
          <button>Followers</button>
        </Link>
        <p>{followers.length}</p>
        <Link style={{ textDecoration: "none" }} to={followingPath}>
          <button>Following</button>
        </Link>
        <p>{following.length}</p>
      </div>
      <div className="addpostlink">
        <Link style={{ textDecoration: "none" }} to="/addPost">
          <button>Add Post</button>
        </Link>
      </div>
      <br />
      <div className="viewprofilelink">
        <Link style={{ textDecoration: "none" }} to={`/profile/${id}`}>
          <button>View Profile</button>
        </Link>
      </div>
      <br />
      <div className="searchlink">
        <Link style={{ textDecoration: "none" }} to="/member/search">
          <button>Search</button>
        </Link>
      </div>
    </div>
  );
};

export default MemberActionContainer;
