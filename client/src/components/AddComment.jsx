import React, { useState } from 'react'

function AddComment(props) {
    const [content, setContent] = useState('')
    

    return (
        <div className="">
            <h1>Comment on: ${post.title}</h1>
            <div className="">
            ${post.media.includes("/uploads/media/") ? `<img
                src="${post.media}"
                alt="${post.displayname}'s image"
            />`:'' }
            </div>
            <p>${post.content}</p>

            <form onSubmit={props.processComment}>
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