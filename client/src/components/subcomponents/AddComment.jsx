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
    console.log(postid);
    let response = await axios.post("/api/comments/" + postid, comment);

    closeModal();
    window.location.reload();
  }

  return (
    <div className="commentpost">
      <h4>Comment on:</h4>
      <h2>{post.title}</h2>

      <div className="postimgcontainer">
        {post.media ? <img className="postimg" src={post.media} alt={post.title} /> : ""}
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
        <br/>
        <div className="submitbuttoncomment">
          <input type="submit" value="submit" />
        </div>
      </form>
    </div>
  );
}

export default AddComment;
