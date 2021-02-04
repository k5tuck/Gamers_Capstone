import React, { useState, useEffect } from 'react';
import axios from 'axios';


function ProfilePic() {

    const [displayName, setDisplayName] = useState('')
    const [Photo, setPhoto] = useState('')

    const getData = async (e) =>{
        const resp = axios.get('/api/photo')
        const { displayname, photo } = resp.data;
        setDisplayName(displayname);
        setPhoto(photo)
    }

    useEffect(()=>{
        getData()
    }, [])


    return (
        <div>
        <h3> Welcome {displayName}!</h3>

        <img src={Photo} alt="prof pic"/>
        </div>

    )
};
export default ProfilePic;