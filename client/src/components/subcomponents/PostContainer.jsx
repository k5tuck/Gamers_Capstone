import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { Link } from "react-router-dom";
import EditPost from "../EditPost";
import AddComment from "./AddComment";
import EditComment from "../EditComment";

Modal.setAppElement("#root");
const PostContainer = (props) => {
  const { posts, sessionid } = props;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpenComment, setModalIsOpenComment] = useState(false);
  const [modalIsOpenEditComment, setModalIsOpenEditComment] = useState(false);
  const [editPostData, setEditPostData] = useState({});
  const [editCommentContent, setEditCommentContent] = useState("");
  const [editCommentID, setEditCommentID] = useState(null);

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
  function closeCommentModal() {
    setModalIsOpenComment(false);
  }
  function closeCommentEditModal() {
    setModalIsOpenEditComment(false);
  }

  async function editPost(postid) {
    const resp = await axios.get(`/api/repost/${postid}`);
    console.log("======================");
    console.log(resp.data.post);
    console.log("======================");
    console.log(modalIsOpen);
    setEditPostData(resp.data.post);
    // setModalIsOpen(true);
    // Display React Modal Here
  }

  const editComment = async (commentid) => {
    const resp = await axios.get(`/api/comments/${commentid}`);
    console.log(modalIsOpenComment);
    setEditCommentContent(resp.data.content);
    setEditCommentID(resp.data.id);
  };

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
            {sessionid === post.userid ? (
              <div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    editPost(post.id);
                    setModalIsOpen(true);
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
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    deletePost(post.id);
                  }}
                >
                  Delete Button
                </button>
              </div>
            ) : (
              ""
            )}
            <button
              onClick={(e) => {
                e.preventDefault();
                editPost(post.id);
                setModalIsOpenComment(true);
              }}
            >
              Add Comment
            </button>
            <Modal
              isOpen={modalIsOpenComment}
              // shouldCloseOnOverlayClick={false} // Click on Overlay will not Close the Modal
              onRequestClose={() => {
                setModalIsOpenComment(false);
              }}
            >
              <AddComment post={editPostData} closeModal={closeCommentModal} />
            </Modal>
            <div>
              {post.Comments.map((comment) => {
                return (
                  <div>
                    <h4>{comment.User.displayname}</h4>
                    <p>{comment.content}</p>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        editComment(comment.id);
                        setModalIsOpenEditComment(true);
                      }}
                    >
                      Edit Comment
                    </button>
                    <Modal
                      isOpen={modalIsOpenEditComment}
                      // shouldCloseOnOverlayClick={false} // Click on Overlay will not Close the Modal
                      onRequestClose={() => {
                        setModalIsOpenEditComment(false);
                      }}
                    >
                      <EditComment
                        id={editCommentID}
                        content={editCommentContent}
                        // callComment={editComment}
                        closeModal={closeCommentEditModal}
                      />
                    </Modal>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostContainer;
