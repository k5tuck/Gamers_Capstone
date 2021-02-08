import React, { useState, useEffect } from "react";
import axios from "axios";

function EditComment({ content, closeModal, id, setEditCommentContent }) {

  async function processComment(commentid) {
    console.log(commentid);
    console.log(content)
    let response = await axios.put(`/api/comments/${commentid}`, {
      content,
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
            value={content}
            // placeholder={content}
            onChange={(e) => {
              setEditCommentContent(e.target.value);
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
