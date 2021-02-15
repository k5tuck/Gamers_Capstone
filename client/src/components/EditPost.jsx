import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function EditPost({
  post,
  title,
  setTitle,
  content,
  setContent,
  media,
  setMedia,
  gameid,
  setGameId,
  tagname,
  setTagname,
  closeModal,
}) {
  const history = useHistory();
  // const [title, setTitle] = useState(post.title);
  // const [gameid, setGameId] = useState(post.gameid);
  // const [media, setMedia] = useState(post.media);
  // const [content, setContent] = useState(post.content);
  const [games, setGames] = useState([]);

  const editPost = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", media);
    const editedPostInfo = {
      title,
      gameid,
      content,
      tagname,
    };
    const resp = await axios.put(`/api/editpost/${post.id}`, editedPostInfo);
    const uploadImage = await axios.put(`/api/postimage/${post.id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(uploadImage);
    closeModal();
    window.location.reload();
  };

  const getGames = async () => {
    const resp = await axios.get("/api/games");
    setGames(resp.data.getallgames);
  };
  useEffect(() => {
    getGames();
  }, []);

  return (
    <div>
      <form
        className="editpostmodal"
        onSubmit={editPost}
        enctype="multipart/form-data"
      >
        <label>
          {" "}
          Title
          <input
            type="text"
            value={title}
            placeholder="enter title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </label>
        <br />
        <label>
          {" "}
          Game Title
          <select
            value={gameid}
            onChange={(e) => {
              setGameId(e.target.value);
            }}
          >
            $
            {games.map((game) => (
              <option value={game.id}>{game.title}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          {" "}
          Media
          <input
            type="file"
            onChange={(e) => {
              setMedia(e.target.files[0]);
            }}
          />
        </label>
        <br />
        <label>
          {" "}
          Content
          <textarea
            value={content}
            placeholder="Make A Post Here"
            cols="50"
            rows="4"
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></textarea>
        </label>
        <br />
        <label>
          Tags:
          <input
            type="text"
            value={tagname}
            onChange={(e) => {
              setTagname(e.target.value);
            }}
          />
        </label>
        <br />
        <input type="submit" value="Edit Post" />
      </form>
    </div>
  );
}

export default EditPost;
