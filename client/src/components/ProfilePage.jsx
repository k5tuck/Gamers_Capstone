import React, { useState, useEffect } from "react";
import axios from "axios";

import FollowButton from "./subcomponents/FollowButton";

import { Link, useParams } from "react-router-dom";

function ProfilePage({ editPost, deletePost, createFollow }) {
  const { id } = useParams();
  console.log(id);

  // const [userid, setUserId] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [posts, setPosts] = useState([]);
  const [games, setGames] = useState([]);

  // Too Many Requests
  async function grabContent() {
    // const resp = await axios.get(`/api/follows/${id}`);
    // const respFollowers = resp.data.followers;
    // setFollowers(respFollowers.data.followers);
    // const respFollowing = resp.data.following;
    // setFollowing(respFollowing.data.following);
    const respPosts = await axios.get(`/api/posts/${id}`);
    setPosts(...posts, respPosts.data);
    console.log(respPosts.data);
    const respGames = await axios.get(`/api/pertopfive/${id}`);
    setGames(...games, respGames.data.topFive);
    console.log(respGames.data.topFive);
  }
  console.log(posts);
  console.log(games);
  // async function grabAllFollowers() {
  //   const resp = await axios.get(`/api/follow/${id}`);
  //   const respFollowers = resp.data.followers;
  //   setFollowers(respFollowers);
  //   const respFollowing = resp.data.following;
  //   setFollowing(respFollowing);
  // }

  // async function grabPosts() {
  //   const respPosts = await axios.get(`/api/posts/${id}`);
  //   setPosts(respPosts);
  // }
  // async function grabTopFive() {
  //   const respGames = await axios.get(`/api/pertopfive/${id}`);
  //   setGames(respGames);
  // }

  //Needs to Be passed Down as a Prop - Error: Running on Page Load
  // async function createFollow() {
  //   const resp = await axios.post(`/api/follow/${id}`);
  //   console.log(resp);
  // }

  useEffect(() => {
    // setUserId(id);
    grabContent();
    // createFollow();
    // grabAllFollowers();
    // grabPosts();
    // grabTopFive();
  }, []);

  return (
    // Header (Nav) Will Be Here
    <div>
      <FollowButton createFollow={createFollow} />

      {/* <Post posts={posts}/> */}

      {posts.map((post) => {
        <div key={post.id}>
          <h3>{post.title}</h3>
          <Link to={`/profile/${post.id}`}>
            <h4>{post.username}</h4>
          </Link>
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
        </div>;
      })}

      {/* Top Five  */}
      <div>
        {games.map((game) => {
          <p>{game.Game.title}</p>;
        })}
      </div>
    </div>
    // Footer Will Be Here
  );
}

export default ProfilePage;
