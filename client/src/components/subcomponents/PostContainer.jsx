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
  console.log("Here are the posts",  posts);
 

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
    setTitle(resp.data.post.title);
    setMedia(resp.data.post.media);
    setGameId(resp.data.post.gameid);
    setContent(resp.data.post.content);
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

  async function processLike(postid) {
    console.log(like);
    const resp = await axios.put(`/api/like/${postid}`, { like });
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
            {post.Game == null ? (
              ""
            ) : (
              <Link to={`/member/game/${post.gameid}`}>
                <p>{post.Game.title}</p>
              </Link>
            )}
            <Link to={`/profile/${post.userid}`}>
              <h4>{post.username}</h4>
            </Link>
            {post.media.includes("/uploads/media/") ? (
              <div className="postimgcontainer">
                <img className="postimg" src={post.media} alt={post.title} />
              </div>
            ) : (
              ""
            )}
            <p>{post.content}</p>
           
            <button
              className={ post.Like ? post.Like.map((like)=>{
                if(like.userid == sessionid){
                  if( like.like == true){
                    return "Like-True"
                  } else {
                    return "Like-False"
                  }
                }
              }): ""}
              onClick={(e) => {
                e.preventDefault();
                setLike()
                processLike(post.id);
              }}
            >
              Like
            </button>
            
            {/* {sessionid === post.User.id ? "" : ""} */}
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
                  Edit Post
                </button>
                <Modal
                  isOpen={modalIsOpen}
                  // shouldCloseOnOverlayClick={false} // Click on Overlay will not Close the Modal
                  onRequestClose={() => {
                    setModalIsOpen(false);
                  }}
                >
                  <EditPost
                    title={title}
                    post={editPostData}
                    setTitle={setTitle}
                    content={content}
                    setContent={setContent}
                    media={media}
                    setMedia={setMedia}
                    gameid={gameid}
                    setGameId={setGameId}
                    closeModal={closeModal}
                  />
                </Modal>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    deletePost(post.id);
                    window.location.reload();
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
                        <br />
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            deleteComment(comment.id);
                            window.location.reload();
                          }}
                        >
                          Delete Comment
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
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
