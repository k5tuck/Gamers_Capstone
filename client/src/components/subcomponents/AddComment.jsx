import axios from 'axios'
import React, { useState } from 'react'

function AddComment(props) {
    const {post, closeModal} = props
    const [content, setContent] = useState('')
    async function processComment(postid) {
        let response = await axios.post("/api/comments/" + postid)

    }
    

    return (
        <div className="">
            <h1>Comment on: {post.title}</h1>
            <div className="">
            {post.media.includes("/uploads/media/") ? <img
                src={post.media}
                alt={post.title}
            />:'' }
            </div>
            <p>{post.content}</p>

            <form onSubmit={processComment(post.id)} >
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