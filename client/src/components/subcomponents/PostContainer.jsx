import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PostContainer = (props) => {
  const { editPost, deletePost, posts } = props;

  return (
    <div>
      {posts.map((post) => {
        return (
          <div key={post.userid} className="post">
            <h3>{post.title}</h3>
            <Link to={`/profile/${post.userid}`}>
              <h4>{post.username}</h4>
            </Link>
            <div className="postimgcontainer">
              <img className="postimg" src={post.media} alt={post.title} />
            </div>
            <p>{post.content}</p>
            <button onClick={editPost}>Edit Button</button>
            <button onClick={deletePost}>Delete Button</button>
            <div>
              {post.Comments.map((comment) => {
                <div>
                  <h4>Username</h4>
                  <p>{comment.content}</p>
                </div>;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostContainer;
