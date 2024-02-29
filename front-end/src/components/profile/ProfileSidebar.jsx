import React from "react";
import { Link } from "react-router-dom";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleLeft,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
// Icons
import { IoMdMore } from "react-icons/io";
import { IoExitOutline } from "react-icons/io5";

const ProfileSidebar = ({ user, isImageChosen, logoutUser, setAvatar, handleUserProfileImageUpdate }) => {
  //State to show or hide edit or save image buttons

  // Grab uploads URL from .env file
  const UPLOADS_URL = import.meta.env.VITE_APP_UPLOADS_URL;

  return (
    <aside className="user-profile__sidebar">
      <Link to={-1} className="back-button">
        <FontAwesomeIcon icon={faAngleLeft} />
        Back
      </Link>
      {/* <div className="user-profile__welcome"> */}
      <div className="user">
        <div className="user-avatar">
          <img
            src={`${UPLOADS_URL}/${user.avatar}`}
            alt="Your avatar"
            className="image-first"
          />
          <form
            className="edit-profile-image-form"
            onSubmit={(e) => handleUserProfileImageUpdate(e)}
          >
            <label
              htmlFor="edit-image"
              className={`${
                isImageChosen ? "edit-image-cta sleep" : "edit-image-cta"
              }`}
            >
              <FontAwesomeIcon icon={faEdit} /> Edit
            </label>
            <input
              type="file"
              className="edit-image"
              id="edit-image"
              name="avatar"
              accept="image/*"
              onChange={(e) => setAvatar(e.target.files[0])}
            />
            <button
              type="submit"
              disabled={!isImageChosen}
              className="upload-image-cta"
            >
              Change Image
            </button>
          </form>
        </div>
        <h1>{user.name}</h1>
        <span>Email: {user.email}</span>
        <div className="show-more">
          <span className="show-extra-info">
            Show more info{" "}
            <i>
              <FontAwesomeIcon icon={faAngleDown} />
            </i>
          </span>
          <div className="user-extra-info">
            <p>
              Your hobby <b>{user.hobby || "Not set"}</b>
            </p>
            <p>
              Your favorite subject <b>{user.favoriteSubject || "Not set"}</b>
            </p>
          </div>
        </div>
      </div>
      <div className="bottom-actions">
        <button className="logout-button" onClick={logoutUser}>
          <IoExitOutline className="logout-icon" /> Logout
        </button>
        <span className="more-button">
          {" "}
          <IoMdMore className="more-icon" /> More
        </span>
      </div>
      {/* </div> */}
    </aside>
  );
};

export default ProfileSidebar;
