import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Modal from "react-modal";
import EditProfile from './EditProfile'

function ProfilePagePic() {
    const { id } = useParams();
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [displayName, setDisplayName] = useState('')
    const [Photo, setPhoto] = useState('')
    
    const getData = async (e) =>{
        const resp = await axios.get(`/api/photo/${id}`)
        console.log(resp)
        const { photo, displayname } = resp.data;
        setDisplayName(displayname);
        let profilePhoto = photo ? photo : " "
        setPhoto(profilePhoto)
    }
    const editProfileDetails = async (details) => {
        const resp = await axios.put(`/api/editprofile/${id}`, details, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        console.log(resp, "====== this is the editprofile +++++");
        setDisplayName (resp.data.displayname)
        setPhoto (resp.data.photo)

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
        <button onClick={(e) => {
            e.preventDefault()
            // Function
            //setModalIsOpen(true);
            }
        }> Edit Profile</button>
        <Modal
            isOpen={modalIsOpen}
            // shouldCloseOnOverlayClick={false} // Click on Overlay will not Close the Modal
            onRequestClose={() => {
            setModalIsOpen(false);
            }}
        ><EditProfile
            setPhoto = {setPhoto}
            setDisplayName = {setDisplayName}
            displayName={displayName}
            photo={Photo}
            editProfileDetails={editProfileDetails}
        /></Modal>
        </div>
        

    )
};
export default ProfilePagePic;