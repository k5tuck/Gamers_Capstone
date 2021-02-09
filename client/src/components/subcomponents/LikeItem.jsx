import React, { useState } from "react";
import axios from "axios";

function LikeItem({ post, likes, liked }) {
  const [like, setLike] = useState(liked);

  async function addLike(pid) {
    const resp = await axios.put(`/api/like/${pid}`, { like: true });
    console.log(resp.data);
  }
  async function deleteLike(pid) {
    const resp = await axios.delete(`/api/like/${pid}`);
    console.log(resp.data);
  }

  return (
    <button
      onClick={(e) => {
        like ? deleteLike(post.id) : addLike(post.id);
        setLike(!like);
      }}
      className=""
    >
      {like ? (
        <i className="fas fa-heart like-color"></i>
      ) : (
        <i class="fas fa-thumbs-down"></i>
      )}{" "}
      <span>{post.Likes ? likes : 0}</span>
    </button>
  );
}

export default LikeItem;
