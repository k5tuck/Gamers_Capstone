import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


function ProfilePagePic() {
    const { id } = useParams();

    const [displayName, setDisplayName] = useState('')
    const [Photo, setPhoto] = useState('')

    const getData = async (e) =>{
        const resp = await axios.get(`/api/photo/${id}`)
        console.log(resp)
        const { photo, displayname } = resp.data;
        setDisplayName(displayname);
        setPhoto(photo)
    }

    useEffect(()=>{
        getData()
    }, [])


    return (
        <div className="profilepiccircle">
            <h3 className="profilepicheader">{displayName}</h3>
            <div className="profilepiccontainer">
                <img className="profilepicimage" src={Photo} alt="prof pic"/>
            </div>
        </div>

    )
};
export default ProfilePagePic;