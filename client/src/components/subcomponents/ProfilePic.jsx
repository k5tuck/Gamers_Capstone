import React from 'react'

function ProfilePic(props) {
    const { displayname } = props

    return (
        <div>
            <h3> Welcome {displayname }</h3>

        <img src="{}" alt=""/>
        </div>

    )
};
export default ProfilePic;