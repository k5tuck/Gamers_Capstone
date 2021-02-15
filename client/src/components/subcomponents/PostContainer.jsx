import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { Link } from "react-router-dom";
import EditPost from "../EditPost";
import AddComment from "./AddComment";
import EditComment from "../EditComment";
import LikeItem from "./LikeItem";

Modal.setAppElement("#root");
const PostContainer = (props) => {
  const { posts, sessionid, addLike, deleteLike } = props;
  // console.log("Here are the posts", posts);
  // console.log(sessionid);

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
  const [tagname, setTagname] = useState("");

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

  function checkLike(arr) {
    let value = arr.find((like) => like.userid === sessionid);
    // console.log("====================================");
    // console.log(value);
    // console.log("====================================");
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
    // console.log("======================");
    // console.log(resp.data.post);
    // console.log("======================");
    // console.log(modalIsOpen);
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
    // console.log(modalIsOpenComment);
    setEditCommentContent(resp.data.content);
    setEditCommentID(resp.data.id);
  };

  async function deletePost(postid) {
    const resp = await axios.delete(`/api/delpost/${postid}`);
    // console.log(resp.data);
  }

  async function deleteComment(commentid) {
    const resp = await axios.delete(`/api/comments/${commentid}`);
    // console.log(resp.data);
  }

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <div>
      {posts
        ? posts.map((post) => {
            return (
              <div key={post.id} className="post">
                <div className="post-top-row">
                  <Link className="links" to={`/profile/${post.userid}`}>
                    <div className="userpostpiccontainer">
                      <span className="postpiccontainer">
                        <img
                          className="postpicimage"
                          src={post.userphoto}
                          alt=""
                        />
                      </span>
                      <h4>{post.displayname}</h4>
                    </div>
                  </Link>

                  {post.Game == null ? (
                    ""
                  ) : (
                    <Link className="links" to={`/member/game/${post.gameid}`}>
                      <p>{post.Game.title}</p>
                    </Link>
                  )}
                </div>
                <h3 className="posttitle">
                  {post.title ? post.title : "There Are No Posts"}
                </h3>
                {/* {isLoggedIn ? ( */}

                {/* ) : (
              <Redirect to="/" />
            )} */}

                {post.media ? (
                  post.media.includes("/uploads/media/") ? (
                    post.mediatype.includes("video") ? (
                      <div className="postimgcontainer">
                        {/* <video autoPlay loop className="postimg"> */}
                        <video controls className="postimg">
                          <source src={post.media} type={post.mediatype} />
                        </video>
                      </div>
                    ) : (
                      <div className="postimgcontainer">
                        <img
                          className="postimg"
                          src={post.media}
                          alt={post.title}
                        />
                      </div>
                    )
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
                <div className="postcontent">
                  <p className="postcontentp">{post.content}</p>
                </div>
                <div className="postbuttons">
                  <LikeItem
                    post={post}
                    addLike={addLike}
                    deleteLike={deleteLike}
                    liked={
                      post.Likes
                        ? checkLike(post.Likes)
                          ? true
                          : false
                        : false

                      // ? post.Likes.find((like) => like.userid === sessionid)
                    }
                    likes={post.Likes ? post.Likes.length : 0}
                  />
                  <button
                    className="addcommentbutton"
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
                    <AddComment
                      post={editPostData}
                      closeModal={closeCommentModal}
                    />
                  </Modal>
                  {/* {sessionid === post.User.id ? "" : ""} */}
                  {sessionid === post.userid ? (
                    <div className="editdelpostbtns">
                      <button
                        className="editpostbutton"
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
                        <i className="far fa-edit"> </i>
                      </button>
                      <Modal
                        className="editpostmodal"
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
                          tagname={tagname}
                          setTagname={setTagname}
                          closeModal={closeModal}
                        />
                      </Modal>
                      <button
                        className="editpostbutton"
                        onClick={(e) => {
                          e.preventDefault();
                          deletePost(post.id);
                          window.location.reload();
                        }}
                      >
                        <i className="far fa-trash-alt"> </i>
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className="commentcontainer">
                  {post.Comments
                    ? post.Comments.map((comment, idx) => {
                        return (
                          <div key={idx}>
                            <hr />
                            <div className="comment">
                              <Link 
                              className="links" to={`/profile/${comment.userid}`}>
                              <div className="userpostpiccontainercomment">
                                <span className="postpiccontainercomment">
                                  <img
                                    className="postpicimage"
                                    src={comment.User.photo}
                                    alt=""
                                  />
                                </span>
                                <h4>{comment.User.displayname}: </h4>
                              </div>
                              </Link>
                              <div className="commentandbuttons">
                                <p className="commentcontent">
                                  {comment.content}
                                </p>

                                {sessionid === comment.User.id ? (
                                  <div className="commentbuttoncontainer">
                                    <button
                                      className="commentbuttons"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        editComment(comment.id);
                                        setModalIsOpenEditComment(true);
                                      }}
                                    >
                                      {/* <i className="far fa-comment-dots"></i> */}
                                      <i className="far fa-edit"> </i>
                                    </button>
                                    <br />
                                    <button
                                      className="commentbuttons"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        deleteComment(comment.id);
                                        window.location.reload();
                                      }}
                                    >
                                      <i className="far fa-trash-alt"> </i>
                                    </button>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                              {/* <hr /> */}
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
                          </div>
                        );
                      })
                    : "No Comments"}
                  {/* <hr /> */}
                </div>
              </div>
            );
          })
        : "Sorry There are No Posts"}
    </div>
  );
};

export default PostContainer;
