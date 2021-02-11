import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function AddPost() {
  const history = useHistory();
  const [tagname, setTagname] = useState("");
  const [title, setTitle] = useState("");
  const [gameid, setGameId] = useState(null);
  const [media, setMedia] = useState("");
  const [content, setContent] = useState("");
  const [games, setGames] = useState([]);

  const createPost = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", media);
    const newPost = {
      title,
      gameid,
      content,
    };
    const resp = await axios.post("/api/post", newPost);
    const postid = resp.data.post.id;

    const respTag = await axios.post(`/api/tags/${postid}`, { tagname });
    console.log(respTag.data);

    const uploadImage = await axios.put(`/api/postimage/${postid}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });




    console.log(uploadImage);
    history.push("/member/home");
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
      <form onSubmit={createPost} enctype="multipart/form-data">
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
          required autoFocus/>
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
          required>
            <option selected>Please Select a Game</option>$
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
        <input type="submit" value="POST" />
      </form>
    </div>
  );
}

export default AddPost;
