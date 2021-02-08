import React, { useState, useEffect } from "react";
import axios from "axios";

function EditComment({ content, closeModal, id }) {
  const [newcontent, setNewContent] = useState(content);
  //   console.log(comment.id);
  //   console.log(comment.postid);
  //   console.log(comment.content);
  //   console.log(comment.createdAt);
  console.log(content);
  console.log(newcontent);

  //   useEffect(() => {
  //     setNewContent(content);
  //   }, []);

  async function processComment(commentid) {
    console.log(commentid);
    let response = await axios.put(`/api/comments/${commentid}`, {
      newcontent,
    });
    closeModal();
    window.location.reload();
  }
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          processComment(id);
        }}
      >
        <label>
          Edit Comment:
          <textarea
            name="content"
            value={newcontent}
            // placeholder={content}
            onChange={(e) => {
              setNewContent(e.target.value);
            }}
          ></textarea>
        </label>
        <br />
        <input type="submit" value="Edit Comment" />
      </form>
    </div>
  );
}

export default EditComment;
