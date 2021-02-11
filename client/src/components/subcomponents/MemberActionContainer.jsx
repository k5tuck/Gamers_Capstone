import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FollowingPage from "./FollowingPage";
import FollowerPage from "./FollowerPage";
import Modal from "react-modal";
import axios from "axios";

const MemberActionContainer = ({ isLoggedIn }) => {
  const [id, setid] = useState(null);
  const [followingmodalIsOpen, setFollowingModalIsOpen] = useState(false);
  const [followermodalIsOpen, setFollowerModalIsOpen] = useState(false);

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
    <div className="memberactionscontainer">
      <div className="memberactionsfollowers">
        {/* <Link  to={followersPath}> */}
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
          dialogClassName="my-modal"
          isOpen={followermodalIsOpen}
          // shouldCloseOnOverlayClick={false} // Click on Overlay will not Close the Modal
          onRequestClose={() => {
            setFollowerModalIsOpen(false);
          }}
        >
          <FollowerPage followers={followers} />
        </Modal>
        {/* </Link> */}
        <p>{followers ? followers.length : ""}</p>
        {/* <Link  to={followingPath}> */}
        <button
          style={{ textDecoration: "none" }}
          onClick={(e) => {
            e.preventDefault();
            setFollowingModalIsOpen(true);
          }}
        >
          Following
        </button>
        <Modal
          dialogClassName="my-modal"
          isOpen={followingmodalIsOpen}
          // shouldCloseOnOverlayClick={false} // Click on Overlay will not Close the Modal
          onRequestClose={() => {
            setFollowingModalIsOpen(false);
          }}
        >
          <FollowingPage following={following} />
        </Modal>
        {/* </Link> */}
        <p>{following ? following.length : ""}</p>
      </div>
      <div className="addpostlink">
        <Link className="links" to="/addPost">
          <button>Add Post</button>
        </Link>
      </div>
      <br />

      {/* {isLoggedIn && ( */}

      <div className="viewprofilelink">
        <Link className="links" to={`/profile/${id}`}>
          <button>View Profile</button>
        </Link>
      </div>

      {/* )} */}

      <br />
      <div className="searchlink">
        <Link className="links"  to="/member/search">
          <button>Search</button>
        </Link>
      </div>
    </div>
  );
};

export default MemberActionContainer;
