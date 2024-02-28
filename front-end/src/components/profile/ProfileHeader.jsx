import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const ProfileAvatar = ({ user, setAvatar, handleUserProfileImageUpdate }) => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  return (
    <div className="header-container" style={{marginLeft: "2.5em"}}>
      <h1>Update credentials on your profile</h1>
      <p>All changes will be applied almost instantly.</p>
    </div>
  );
};

export default ProfileAvatar;
