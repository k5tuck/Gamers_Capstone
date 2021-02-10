import React from "react";
import { useHistory } from "react-router-dom";

function EditProfile(props) {
  const {
    Photo,
    displayName,
    editProfileDetails,
    setDisplayName,
    setPhoto,
    closeModal,
  } = props;

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData();
          data.append("file", Photo);
          editProfileDetails(displayName, data);
          closeModal();
          window.location.reload();
        }}
        enctype="multipart/form-data"
      >
        <label>
          Display Name:{" "}
          <input
            type="text"
            value={displayName}
            onChange={(e) => {
              setDisplayName(e.target.value);
            }}
          />
        </label>
        <br />
        <br />
        <label>
          Photo:{" "}
          <input
            type="file"
            onChange={(e) => {
              setPhoto(e.target.files[0]);
            }}
          />
        </label>
        <br />
        <br />
        <input type="submit" value="Update Profile" />
      </form>
    </div>
  );
}

export default EditProfile;
