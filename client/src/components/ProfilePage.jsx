import React, { useState, useEffect } from "react";
import axios from "axios";

import FollowButton from "./subcomponents/FollowButton";
import FollowerPage from "./subcomponents/FollowerPage";
import Modal from "react-modal";

import { Link, useParams } from "react-router-dom";
import PersonalTopGamesContainer from "./subcomponents/PersonalTopGameContainer";
import UnfollowButton from "./subcomponents/UnfollowButton";
import PostContainer from "./subcomponents/PostContainer";
import ProfilePagePic from "./subcomponents/ProfilePagePic";
function ProfilePage({ createFollow, removeFollow }) {
  // function ProfilePage({ editPost, deletePost, createFollow, removeFollow }) {
  const { id } = useParams();
  console.log(id);

   const [followermodalIsOpen, setFollowerModalIsOpen] = useState(false);
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

  async function addLike(pid) {
    const resp = await axios.put(`/api/like/${pid}`, { like: true });
    console.log(resp.data);
    const newPosts = posts.map((p) => {
      if (p.id === pid) {
        console.log(p.id);
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
    const resp = await axios.delete(`/api/like/${pid}`);
    console.log(resp.data);
    const newPosts = posts.map((p) => {
      if (p.id === pid) {
        console.log(p.id);
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
          <button
          style={{ textDecoration: "none" }}
          onClick={(e) => {
            e.preventDefault();
            setFollowerModalIsOpen(true);
          }}
        >
          Followers
        </button>
        <Modal
          id="profilefollowermodal"
          
          isOpen={followermodalIsOpen}
          // shouldCloseOnOverlayClick={false} // Click on Overlay will not Close the Modal
          onRequestClose={() => {
            setFollowerModalIsOpen(false);
          }}
        >
          <FollowerPage followers={followers} />
        </Modal>
        {/* </Link> */}


            <p>{followers ? followers.length : "No Followers"}</p>
          </div>

          {followers ? (
            checkFollowing() ? (
              <UnfollowButton removeFollow={removeFollow} />
            ) : (
              <FollowButton createFollow={createFollow} />
            )
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="profilemiddle">
        <PostContainer
          posts={posts}
          sessionid={sessionid}
          addLike={addLike}
          deleteLike={deleteLike}
        />
      </div>
      <div className="rightside">
        <PersonalTopGamesContainer />
      </div>
    </div>
  );
}

export default ProfilePage;
