import axios from "axios";
import React, { useState } from "react";

function AddComment(props) {
  const { post, closeModal } = props;
  const [content, setContent] = useState("");
  async function processComment(postid) {
    const comment = {
      content,
      id: postid,
    };
    // console.log(postid);
    await axios.post("/api/comments/" + postid, comment);

    closeModal();
    window.location.reload();
  }

  return (
    <div className="commentpost">
      <h4>Comment on:</h4>
      <h2>{post.title}</h2>

      <div className="postimgcontainer">
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
      </div>
      <p>{post.content}</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          processComment(post.id);
        }}
      >
        <label>
          <textarea
            name="content"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></textarea>
        </label>
        <br />
        <br />
        <div className="submitbuttoncomment">
          <input type="submit" value="submit" />
        </div>
      </form>
    </div>
  );
}

export default AddComment;
