import React, { useState, useEffect } from "react";
import axios from "axios";

function ProfilePage() {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [posts, setPosts] = useState([]);
  const [games, setGames] = useState([]);

  async function grabAllFollowers() {
    const resp = await axios.get("/api/followers");
    const respFollowers = resp.data.followers;
    setFollowers(respFollowers);
    const respFollowing = resp.data.following;
    setFollowing(respFollowing);
  }

  async function grabPosts() {
    const respPosts = await axios.get("/api/posts");
    setPosts(respPosts);
  }
  async function grabTopFive() {
    const respGames = await axios.get("/api/topfivegames");
    setGames(respGames);
  }

  useEffect(() => {
    grabAllFollowers();
    grabPosts();
  }, []);

  return (
    // Header (Nav) Will Be Here
    <div>
      {/* <Post posts={posts}/> */}
      {posts.map((post) => {
        <div key={post.userid} >
          <h3>{post.title}</h3>
          <h4>{post.username}</h4>
          <img src={post.media} alt={post.title} />
          <p>{post.content}</p>
          <button>Edit Button</button>
          <div>
            {post.Comments.map((comment) => {
              <div>
                <h4>Username</h4>
                <p>{comment.content}</p>
              </div>;
            })}
          </div>
        </div>;
      })}

      {/* Top Five  */}
      <div>
        {games.map((game) => {
          <p>{game.Game.name}</p>;
        })}
      </div>
    </div>
    // Footer Will Be Here
  );
}

export default ProfilePage;
