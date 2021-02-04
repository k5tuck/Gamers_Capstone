import React, { useState } from 'react'

function CreatePostForm(props) {
    const [title, setTitle] = useState('')
    const [gameTitle, setGameTitle] = useState('')
    const [media, setMedia] = useState('')
    const [content, setContent] = useState('')




    return (
        <div>
            <form onSubmit={props.createPost} enctype="multipart/form-data">
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

export default CreatePostForm;