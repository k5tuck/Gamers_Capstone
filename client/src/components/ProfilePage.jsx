import React, { useState, useEffect } from "react";
import axios from "axios";

import FollowButton from "./subcomponents/FollowButton";

import { Link, useParams } from "react-router-dom";
import PersonalTopGamesContainer from "./subcomponents/PersonalTopGameContainer";
import UnfollowButton from "./subcomponents/UnfollowButton";

function ProfilePage({ editPost, deletePost, createFollow, removeFollow }) {
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
    let value = false
    for (let follower of followers) {
      if (follower.followerid === sessionid) {
          value = true 
          break
      }
    } 
    return value
  };
  // console.log(checkFollowing());

  useEffect(() => {
    grabContent();
    checkFollowing();
  }, []);

  // console.log(following);
  console.log(removeFollow);
  return (
    <div>
      <div className="memberactionscontainer">
        <div className="memberactionsfollowers">
          <Link
            style={{ textDecoration: "none" }}
            to={`/members/followers/${id}`}
          >
            <button>Followers</button>
          </Link>
          <p>{followers.length}</p>
          <Link
            style={{ textDecoration: "none" }}
            to={`/members/following/${id}`}
          >
            <button>Following</button>
          </Link>
          <p>{following.length}</p>
        </div>
      </div>

      {checkFollowing() ? (
        <UnfollowButton removeFollow={removeFollow} />
      ) : (
        <FollowButton createFollow={createFollow} />
      )}
      

      {/* <FollowButton createFollow={createFollow} /> */}

      {/* <Post posts={posts}/> */}

      {posts.map((post) => {
        return (
          <div key={post.id}>
            <h3>{post.title}</h3>
            {/* <Link to={`/profile/${post.id}`}> */}
            <h4>{post.username}</h4>
            {/* </Link> */}
            <div>
              <img src={post.media} alt={post.title} />
            </div>
            <p>{post.content}</p>
            <button onClick={editPost}>Edit Button</button>
            <button onClick={deletePost}>Delete Button</button>
            <div>
              {post.Comments.map((comment) => {
                <div>
                  <h4>Username: {post.User.username}</h4>
                  <p>{comment.content}</p>
                </div>;
              })}
            </div>
          </div>
        );
      })}

      {/* Top Five  */}
      <PersonalTopGamesContainer />
    </div>
  );
}

export default ProfilePage;
