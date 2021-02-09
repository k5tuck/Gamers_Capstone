import React, { useState, useEffect } from "react";
import axios from "axios";

import FollowButton from "./subcomponents/FollowButton";

import { Link, useParams } from "react-router-dom";
import PersonalTopGamesContainer from "./subcomponents/PersonalTopGameContainer";
import UnfollowButton from "./subcomponents/UnfollowButton";
import PostContainer from "./subcomponents/PostContainer";
import ProfilePagePic from './subcomponents/ProfilePagePic';
function ProfilePage({ createFollow, removeFollow }) {
  // function ProfilePage({ editPost, deletePost, createFollow, removeFollow }) {
  const { id } = useParams();
  console.log(id);

  const [sessionid, setSessionId] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [posts, setPosts] = useState([]);

  async function grabContent() {
    const resp = await axios.get(`/api/follows/${id}`);
    console.log(resp.data);
    setSessionId(resp.data.sessionid);
    const respFollowers = resp.data.followers;
    setFollowers(respFollowers);
    const respFollowing = resp.data.following;
    setFollowing(respFollowing);
    const respPosts = await axios.get(`/api/posts/${id}`);
    setPosts(...posts, respPosts.data);
  }

  const checkFollowing = () => {
    let value = false;
    for (let follower of followers) {
      if (follower.followerid === sessionid) {
        value = true;
        break;
      }
    }
    return value;
  };

  useEffect(() => {
    grabContent();
    checkFollowing();
  }, []);

  return (
    <div className="profilecontainer">
      <div className="profileleftpanel">
        <ProfilePagePic />
        <div className="memberactionscontainer">
          <div className="memberactionsfollowers">
            <Link
              style={{ textDecoration: "none" }}
              to={`/members/followers/${id}`}
            >
              <button>Followers</button>
            </Link>
            <p>{followers.length}</p>
          </div>

          {checkFollowing() ? (
            <UnfollowButton removeFollow={removeFollow} />
          ) : (
            <FollowButton createFollow={createFollow} />
          )}
        </div>
      </div>
      <div className="profilemiddle">
        <PostContainer posts={posts} sessionid={sessionid} />
      </div>
      <div className="rightside">
        <PersonalTopGamesContainer />
      </div>
    </div>
  );
}

export default ProfilePage;
