import React, { useState, useEffect } from 'react';
import axios from 'axios';


function ProfilePic() {

    const [displayName, setDisplayName] = useState('')
    const [Photo, setPhoto] = useState('')

    const getData = async (e) =>{
        const resp = await axios.get('/api/photo')
        console.log(resp)
        const { photo, displayname } = resp.data;
        setDisplayName(displayname);
        setPhoto(photo)
    }

    useEffect(()=>{
        getData()
    }, [])


    return (
        <>
            <div className="profileheader">
                <h3 className="profileh3">Welcome 
                    <br/> 
                    {displayName}!</h3>
            </div>
            <div className="profilepiccontainer">
                <img className="profilepicimage" src={Photo} alt="prof pic"/>
            </div>
        </>

    )
};
export default ProfilePic;