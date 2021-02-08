import axios from 'axios'
import React, { useState } from 'react'

function AddComment(props) {
    const {post, closeModal} = props
    console.log(post);
    const [content, setContent] = useState('')
    async function processComment(postid) {
        const comment = { 
            content,
            id: postid
        }
        console.log(postid);
        let response = await axios.post("/api/comments/" + postid, comment)
        
        closeModal()
            window.location.reload();
    }
    

    return (
        <div className="">
            <h1>Comment on: {post.title}</h1>
            <div className="">
            {post.media ? <img
                src={post.media}
                alt={post.title}
            />:'' }
            </div>
            <p>{post.content}</p>

            <form onSubmit={(e)=> {
                e.preventDefault()
                processComment(post.id)}} >
            <label>
                Comment:
                <textarea name="content" value={content} onChange={e => {
                    setContent(e.target.value)
                }}></textarea>
            </label>
            <br />
            <input type="submit" value="submit" />
            </form>
        </div>
    )
}

export default AddComment;