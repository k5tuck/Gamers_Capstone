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
    setFollower(resp.data.followers);
    setFollowing(resp.data.following);
    setid(resp.data.id);
  };

  useEffect(() => {
    getFollowers();
  }, []);

  let followersPath = "/members/followers/" + id;
  let followingPath = "/members/following/" + id;
  let profilePath = "/member/profile/" + id;
  // let followers = 35;
  // let followees = 77;

  return (
    <div>
      <div className="member-actions">
        <Link to={followersPath}>Followers</Link>:{followers.length}
        <Link to={followingPath}>Following</Link>: {following.length}
        <br />
        <Link to="/addPost">Add Post</Link>
        <br />
        <Link to={`/profile/${id}`}>View Profile</Link>
        <br />
        <Link to="/member/search">Search</Link>
      </div>
    </div>
  );
};

export default MemberActionContainer;
