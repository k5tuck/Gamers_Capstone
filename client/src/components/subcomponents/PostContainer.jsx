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

  //edit post state variables
  const [title, setTitle] = useState("");
  const [gameid, setGameId] = useState("");
  const [media, setMedia] = useState("");
  const [content, setContent] = useState("");


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
    setTitle(resp.data.post.title)
    setMedia(resp.data.post.media)
    setGameId(resp.data.post.gameid)
    setContent(resp.data.post.content)
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

  async function deleteComment(commentid) {
    const resp = await axios.delete(`/api/comments/${commentid}`);
    console.log(resp.data);
  }

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <div>
      {posts.map((p) => {
        return (
          <div key={p.userid} className="post">
            <h3>{p.title}</h3>
            {p.Game == null ? "" :
            <Link to={`/member/game/${p.gameid}`}>
              <p>{p.Game.title}</p>
            </Link>
            }
            <Link to={`/profile/${p.userid}`}>
              <h4>{p.username}</h4>
            </Link>
            {  p.media.includes('/uploads/media/') ? <div className="postimgcontainer">
               <img className="postimg" src={p.media} alt={p.title} /> 
            </div>
            : ""}
            <p>{p.content}</p>
            <p>Likes: 7</p>
            {/* <p>Likes: {post.Vote.like}</p> Setup Boolean */}
            {sessionid === p.userid ? (
              <div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    editPost(p.id);
                    setModalIsOpen(true);
                    // Need to push 'editPostData' to EditPost.jsx
                    // Display EditPost.jsx

                    // Does Not Work
                    // <Link to="/editpost">
                    //   <EditPost post={editPostData} />
                    // </Link>;
                  }}
                >
                  Edit Post
                </button>
                <Modal
                  isOpen={modalIsOpen}
                  // shouldCloseOnOverlayClick={false} // Click on Overlay will not Close the Modal
                  onRequestClose={() => {
                    setModalIsOpen(false);
                  }}
                >
                  <EditPost title={title} post={editPostData} setTitle={setTitle} content={content} setContent={setContent} media={media} setMedia={setMedia} gameid={gameid} setGameId={setGameId} closeModal={closeModal} />
                </Modal>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    deletePost(p.id);
                    window.location.reload()
                  }}
                >
                  Delete Post
                </button>
              </div>
            ) : (
              ""
            )}
            <button
              onClick={(e) => {
                e.preventDefault();
                editPost(p.id);
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
              {p.Comments.map((comment) => {
                return (
                  <div>
                    <h4>{comment.User.displayname}</h4>
                    <p>{comment.content}</p>
                   
                  {sessionid === comment.User.id ? (
                    <div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        editComment(comment.id);
                        setModalIsOpenEditComment(true);
                      }}
                    >
                      Edit Comment
                    </button>
                    <br/>
                    <button
                    onClick={(e) => {
                      e.preventDefault();
                      deleteComment(comment.id);
                      window.location.reload()
                    }}
                  >
                    Delete Comment
                  </button>
                  </div>
                   ) : ""}
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
                        setEditCommentContent={setEditCommentContent}
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
