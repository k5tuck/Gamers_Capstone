import React, { useState, useEffect } from "react";
import ProfilePic from "./subcomponents/ProfilePic";
import MemberActionContainer from "./subcomponents/MemberActionContainer";
import PostContainer from "./subcomponents/PostContainer";
import TopGamesContainer from "./subcomponents/TopGamesContainer";
import axios from "axios";
import WidgetChat from "./subcomponents/WidgetChat";
import { Link } from "react-router-dom";

function MemberHome({ isLoggedIn }) {
  // function MemberHome({ editPost, deletePost }) {
  const [posts, setPosts] = useState([]);
  const [sessionid, setSessionId] = useState(null);
  const [displayName, setDisplayName] = useState("");
  async function addLike(pid) {
    const resp = await axios.put(`/api/like/${pid}`, { like: true });
    // console.log(resp.data);
    const newPosts = posts.map((p) => {
      if (p.id === pid) {
        // console.log(p.id);
        return {
          ...p,
          Likes: [...p.Likes, resp.data],
        };
      } else {
        return p;
      }
    });
    setPosts(newPosts);
  }

  async function deleteLike(pid) {
    await axios.delete(`/api/like/${pid}`);
    // console.log(resp.data);
    const newPosts = posts.map((p) => {
      if (p.id === pid) {
        // console.log(p.id);
        return {
          ...p,
          // Little Off
          // Likes: p.Likes.filter(
          //   (l) => l.userid !== sessionid && l.postid !== pid
          // ),
          Likes: p.Likes.filter((l) => {
            if (l.userid === sessionid && l.postid === pid) {
              return false;
            } else return true;
          }),
        };
      } else {
        return p;
      }
    });
    setPosts(newPosts);
  }

  async function grabPosts() {
    const respPosts = await axios.get("/api/posts");
    console.log(respPosts);
    setPosts(...posts, respPosts.data.posts);
    setSessionId(respPosts.data.sessionid);
    setDisplayName(respPosts.data.displayname);
  }

  useEffect(() => {
    grabPosts();
  }, []);

  return (
    <div className="newsfeedcontainer">
      <div className="leftpanel">
        {/* <div className=""> */}
        <div className="fixed">
          <div className="profilepiccomponent">
            <ProfilePic />
          </div>
          <div className="memberactions">
            <MemberActionContainer isLoggedIn={isLoggedIn} />
          </div>
        </div>
      </div>
      <div className="middle">
        <div className="postcontainer">
          <PostContainer
            addLike={addLike}
            deleteLike={deleteLike}
            posts={posts}
            displayName={displayName}
            sessionid={sessionid}
            isLoggedIn={isLoggedIn}
          />
        </div>
      </div>
      <div className="rightside">
        <TopGamesContainer />
        <div className="linksgamescontainer">
          <br />
          <button>
            <Link
              to={{ pathname: "https://store.steampowered.com" }}
              target="_blank"
            >
              <i className="fab fa-steam"> STEAM</i>
            </Link>
          </button>
          <br />
          <br />
          <br />
          <button>
            <Link to={{ pathname: "https://www.twitch.tv/" }} target="_blank">
              <i className="fab fa-twitch"> TWITCH</i>
            </Link>
          </button>
          <br />
          <br />
          <br />
          <button>
            <Link
              to={{ pathname: "https://www.youtube.com/gaming" }}
              target="_blank"
            >
              <i className="fab fa-youtube"> YOUTUBE</i>
            </Link>
          </button>
        </div>
        <WidgetChat sessionid={sessionid} />
      </div>
    </div>
  );
}

export default MemberHome;
