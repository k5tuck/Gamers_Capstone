import React from "react";

function LikeItem({ deleteLike, addLike, post, likes, liked }) {
  return (
    <button
      onClick={(e) => {
        liked ? deleteLike(post.id) : addLike(post.id);
      }}
      className="likebutton"
    >
      {liked ? (
        <i className="fas fa-heart like-color"></i>
      ) : (
        <i className="far fa-heart"></i>
      )}{" "}
      <span>{post.Likes ? likes : 0}</span>
    </button>
  );
}

export default LikeItem;
