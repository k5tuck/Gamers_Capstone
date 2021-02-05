import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MemberActionContainer = () => {

    const getFollowers = async () => {
        let resp = await axios.get('/api/follower')
        console.log(resp.data)
    }
    getFollowers()
    let followers = 35;
    let followees = 77;

    return (
        <div>
            <div className="member-actions">
            <Link to="/member/followers/:id">Followers</Link>:{followers} <Link to="/member/following/:id">Following</Link>: {followees}
            <br/>
            <Link to="/member/add-post">Add Post</Link>
            <br/>
            <Link to="/member/profile/:id">View Profile</Link>
            <br/>
            <Link to="/member/search">Search</Link>
         </div>
        </div>
    )
}

export default MemberActionContainer;