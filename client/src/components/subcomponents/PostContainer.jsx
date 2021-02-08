import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { Link } from "react-router-dom";
import EditPost from "../EditPost";

Modal.setAppElement("#root");
const PostContainer = (props) => {
  const { posts, sessionid } = props;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editPostData, setEditPostData] = useState({});

  function checkUser() {
    let value = false;
    for (let post of posts) {
      if (sessionid === post.userid) {
        value = true;
        break;
      }
    }
    return value;
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  async function editPost(postid) {
    const resp = await axios.get(`/api/repost/${postid}`);
    console.log(resp.data.post);
    console.log(modalIsOpen);
    setEditPostData(resp.data.post);
    setModalIsOpen(true);
    // Display React Modal Here
  }

  async function deletePost(postid) {
    const resp = await axios.delete(`/api/delpost/${postid}`);
    console.log(resp.data);
  }

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <div>
      {posts.map((post) => {
        return (
          <div key={post.userid} className="post">
            <h3>{post.title}</h3>
            <Link to={`/profile/${post.userid}`}>
              <h4>{post.username}</h4>
            </Link>
            <div className="postimgcontainer">
              <img className="postimg" src={post.media} alt={post.title} />
            </div>
            <p>{post.content}</p>
            <p>Likes: 7</p>
            {/* <p>Likes: {post.Vote.like}</p> Setup Boolean */}
            {checkUser() ? (
              <div>
                <button
                  onClick={(e) => {
                    editPost(post.id);

                    // Need to push 'editPostData' to EditPost.jsx
                    // Display EditPost.jsx

                    // Does Not Work
                    // <Link to="/editpost">
                    //   <EditPost post={editPostData} />
                    // </Link>;
                  }}
                >
                  Edit Button
                </button>
                <Modal
                  isOpen={modalIsOpen}
                  // shouldCloseOnOverlayClick={false} // Click on Overlay will not Close the Modal
                  onRequestClose={() => {
                    setModalIsOpen(false);
                  }}
                >
                  <EditPost post={editPostData} closeModal={closeModal} />
                </Modal>
                ;
                <button
                  onClick={(e) => {
                    deletePost(post.id);
                  }}
                >
                  Delete Button
                </button>
              </div>
            ) : (
              ""
            )}
            <div>
              {post.Comments.map((comment) => {
                <div>
                  <h4>Username</h4>
                  <p>{comment.content}</p>
                </div>;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostContainer;
