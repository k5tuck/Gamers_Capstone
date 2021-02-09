import React, { useState } from "react";
import axios from "axios";

function LikeItem({ deleteLike, addLike, post, likes, liked }) {
  return (
    <button
      onClick={(e) => {
        liked ? deleteLike(post.id) : addLike(post.id);
      }}
      className=""
    >
      {liked ? (
        <i className="fas fa-heart like-color"></i>
      ) : (
        <i class="fas fa-thumbs-down"></i>
      )}{" "}
      <span>{post.Likes ? likes : 0}</span>
    </button>
  );
}

export default LikeItem;
