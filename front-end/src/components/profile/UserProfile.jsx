import "../../stylesheets/UserProfile.scss";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Icons
import { IoMdMore } from "react-icons/io";
import { IoExitOutline } from "react-icons/io5";
import {
  faAngleLeft,
  faAngleDown,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Components
import ProfileUpdateForm from "./ProfileUpdateForm";
import ProfileClock from "./ProfileClock";
import ProfileAvatar from "./ProfileHeader";

const UserProfile = () => {
  // Other extracted state
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const token = localStorage.getItem("token");
  // General state
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [currentClass, setCurrentClass] = useState("");
  const [hobby, setHobby] = useState("");
  const [favoriteSubject, setFavoriteSubject] = useState("");
  const [loading, setLoading] = useState(false);

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [avatar, setAvatar] = useState("");
  const [message, setMessage] = useState({ message: "", type: "" });

  //State to show or hide edit or save image buttons
  const [isImageChosen, setIsImageChosen] = useState(false);

  const showMessage = (message, type) => {
    setMessage({ message, type });
    setTimeout(() => setMessage({ message: "", type: "" }), 1500);
  };

  // Basic logic
  useEffect(() => {
    if (!avatar) {
      setIsImageChosen(false);
    } else setIsImageChosen(true);
  }, [avatar]);

  // Function to update user profile image
  const handleUserProfileImageUpdate = async (e) => {
    e.preventDefault();

    if (!avatar) {
      return showMessage("No image chosen", "error");
    }

    const formData = new FormData();
    formData.append("avatar", avatar);

    try {
      const response = await fetch(
        "http://localhost:5003/api/users/update-profile-image",
        {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to update profile image");

      const data = await response.json();
      // Set new user
      setUser((prevUser) => ({ ...prevUser, avatar: data.newFileName }));
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, avatar: data.newFileName })
      ); // Update localStorage with new data
      setAvatar("");
      showMessage("Profile image updated successfully", "success");
    } catch (error) {
      showMessage(error.message, "error");
    } finally {
      setIsImageChosen(false);
      setAvatar("");
    }
  };

  // Function to update user profile credentials
  const handleUserProfileUpdate = async (e) => {
    e.preventDefault();

    if (passwords.oldPassword === passwords.newPassword) {
      return showMessage("New and old passwords are the same", "error");
    }

    if (!name || !email || !passwords.newPassword) {
      return showMessage("You haven't updated any credential!");
    }

    const formData = {
      name: name,
      email: email,
      password: passwords.newPassword,
    };

    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:5003/api/users/update-profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        setLoading(false);
        throw new Error("Failed to update profile");
      }

      const data = await response.json();
      setUser((prevUser) => ({
        ...prevUser,
        name: data.user.name,
        email: data.user.email,
      }));
      localStorage.setItem("user", JSON.stringify(user));
      showMessage("Updated user data successfully", "success");
    } catch (error) {
      showMessage(error.message, "error");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-profile">
      {/* Sidebar */}
      <aside className="user-profile__sidebar">
        <Link to={-1} className="back-button">
          <FontAwesomeIcon icon={faAngleLeft} />
          Back
        </Link>
        {/* <div className="user-profile__welcome"> */}
        <div className="user">
          <div className="user-avatar">
            <img
              src={`http://localhost:5003/uploads/${user.avatar}`}
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
                accept="png, jpg, jpeg, jfif, avif"
                onChange={(e) => setAvatar(e.target.files[0])}
              />
              <button
                type="submit"
                disabled={!isImageChosen}
                className="upload-image-cta"
              >
                Change Profile
              </button>
            </form>
          </div>
          <h1>{user.name}</h1>
          <span>Email: {user.email}</span>
          <span className="show-more">
            Show more info <FontAwesomeIcon icon={faAngleDown} />{" "}
          </span>
        </div>
        <div className="bottom-actions">
          <button className="logout-button">
            <IoExitOutline className="logout-icon" /> Logout
          </button>
          <span className="more-button">
            {" "}
            <IoMdMore className="more-icon" /> More
          </span>
        </div>
        {/* </div> */}
      </aside>

      {/* Profile Area */}
      <div className="user-profile__profile">
        {/* Welcome message */}
        <div className="welcome">
          {/* Clock */}
          <ProfileClock />
        </div>
        {/* Avatar container */}
        <ProfileAvatar
          user={user}
          setAvatar={setAvatar}
          handleUserProfileImageUpdate={handleUserProfileImageUpdate}
        />

        {/* User credentials update */}
        {message.message && (
          <p className="response-message">{message.message}</p>
        )}
        <ProfileUpdateForm
          user={user}
          setName={setName}
          setEmail={setEmail}
          setPasswords={setPasswords}
          handleUserProfileUpdate={handleUserProfileImageUpdate}
          name={name}
          email={email}
          currentClass={currentClass}
          setCurrentClass={setCurrentClass}
          hobby={hobby}
          setHobby={setHobby}
          favoriteSubject={favoriteSubject}
          setFavoriteSubject={setFavoriteSubject}
          passwords={passwords}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default UserProfile;
