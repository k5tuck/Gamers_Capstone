import React from 'react'

function EditProfile({ displayName, editProfileDetails, setDisplayName, setPhoto }) {
    return (
        <div>
            <form onSubmit= {(e) => {
                const data = new FormData();
                // data.append("file", photo);
                const details = {
                    displayName,
                    data
                }
                editProfileDetails(details)
            }}>
                <label>
                    Display Name:
                    <input type="text" value={displayName} onChange={(e) => {
                        setDisplayName(e.target.value)
                    }}/> 
                </label>
                <label >
                    Photo: 
                    <input type="file" onChange={(e) => {
                        setPhoto(e.target.files[0])
                    }}/>
                </label>
                <input type="submit" value="Change Profile Details"/>
            </form>
        </div>
    )
}

export default EditProfile()