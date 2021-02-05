import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useHistory} from 'react-router-dom'

function AddPost(props) {
    const history = useHistory()
    const [title, setTitle] = useState('')
    const [gameTitle, setGameTitle] = useState('')
    const [media, setMedia] = useState('')
    const [content, setContent] = useState('')
    const [games, setGames] = useState([])

    const createPost = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("file", media);
        const newPost = {
            title,
            gameTitle,
            content,
        } 
        const resp = await axios.post("/api/post", newPost)
        const postid = resp.data.id

        const uploadImage = await axios.put(`/api/postimage/${postid}`, data, {
            headers: {
                "Content-Type" : "multipart/form-data"
             }
        })
        history.push("/member/home");
    };
    const getGames = async() => {
    const resp = await axios.get('/api/games')
    setGames(resp.data.getallgames)}
    useEffect(() => {
        getGames()
    }, [] )

    return (
        <div>
            <form onSubmit={createPost} enctype="multipart/form-data">
                <label > Title
                    <input 
                        type="text" 
                        value={title} 
                        placeholder="enter title"
                        onChange={(e) =>{
                            setTitle(e.target.value)
                        }}
                    />
                </label>
                    <br/>
                <label > Game Title
                    <select 
                        value={gameTitle}
                        onChange={(e) =>{
                            setGameTitle(e.target.value)
                        }}
                    >
                    ${games.map(game=> `<option value="${game.id}">${game.title}</option>`)}
                    </select>
                </label>
                    <br/>
                <label > Media
                    <input 
                        type="file" 
                        value={media} 
                        onChange={(e)=> {
                            setMedia(e.target.value)
                        }}
                        />
                </label>
                    <br/>
                <label > Content
                    <textarea 
                    value={content} 
                    placeholder="Make A Post Here" 
                    cols="50" 
                    rows="4" 
                    onChange={(e) =>{
                        setContent(e.target.value)
                    }}
                    ></textarea>
                </label>
                    <br/>
                <input type="submit" value="POST"/>
            </form>
        </div>
    )
}

export default AddPost;