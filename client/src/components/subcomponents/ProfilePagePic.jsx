import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import EditProfile from "./EditProfile";

Modal.setAppElement("#root");
function ProfilePagePic() {
  const { id } = useParams();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [displayName, setDisplayName] = useState("");
  const [Photo, setPhoto] = useState("");

  function closeModal() {
    setModalIsOpen(false);
  }

  const getData = async (e) => {
    const resp = await axios.get(`/api/photo/${id}`);
    console.log(resp);
    const { photo, displayname } = resp.data;
    setDisplayName(displayname);
    setPhoto(photo);
  };

  const editProfileDetails = async (data) => {
    const resp = await axios.post(`/api/eprofile/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(resp, "====== this is the editprofile +++++");
    setPhoto(resp.data.photo);
    // setDisplayName(resp.data.displayname);
    // const picresp = await axios.put(`/api/eprofilepic/${id}`, data, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });
  };
  console.log(displayName);
  console.log(Photo);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="profilepiccircle">
      <h3 className="profilepicheader">{displayName}</h3>
      <div className="profilepiccontainer">
        <img className="profilepicimage" src={Photo} alt="prof pic" />
      </div>
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            // Function
            setModalIsOpen(true);
          }}
        >
          {" "}
          Edit Profile
        </button>
        <Modal
          isOpen={modalIsOpen}
          // shouldCloseOnOverlayClick={false} // Click on Overlay will not Close the Modal
          onRequestClose={() => {
            setModalIsOpen(false);
          }}
        >
          <EditProfile
            setPhoto={setPhoto}
            setDisplayName={setDisplayName}
            displayName={displayName}
            Photo={Photo}
            editProfileDetails={editProfileDetails}
            closeModal={closeModal}
          />
        </Modal>
      </div>
    </div>
  );
}
export default ProfilePagePic;
