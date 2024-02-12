import { faAngleLeft, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const token = localStorage.getItem("token");
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [avatar, setAvatar] = useState("");
  const [message, setMessage] = useState({ message: "", type: "" });

  // useEffect(() => {
  //   setUser(JSON.parse(localStorage.getItem("user")));
  // }, []);

  const showMessage = (message, type) => {
    setMessage({ message, type });
    setTimeout(() => setMessage({ message: "", type: "" }), 1500);
  };

  const handleUserProfileImageUpdate = async (e) => {
    e.preventDefault();

    if (!avatar) return showMessage("No image chosen", "error");

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
      showMessage("Profile image updated successfully", "success");
    } catch (error) {
      showMessage(error.message, "error");
    }
  };

  const handleUserProfileUpdate = async (e) => {
    e.preventDefault();

    if (passwords.oldPassword === passwords.newPassword) {
      return showMessage("New and old passwords are the same", "error");
    }

    const formData = {
      name: name,
      email: email,
      password: passwords.newPassword,
    };

    try {
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

      if (!response.ok) throw new Error("Failed to update profile");

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
    }
  };

  return (
    <div className="user-profile">
      {/* Sidebar */}
      <aside className="user-profile__sidebar">
        <Link to={-1}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </Link>
        <div className="user-profile__welcome">
          <div className="user">
            <h1>{user.name}</h1>
            <span>{user.email}</span>
          </div>
          <h2>Welcome to your profile!</h2>
          <summary>
            Go ahead and apply changes to your profile. Changes will be applied
            almost instantly to your profile in your dashboard, and your prep
            admin will also have your profile updated on their end.
          </summary>
        </div>
      </aside>

      {/* Profile */}
      <div className="user-profile__profile">
        {message.message && <p>{message.message}</p>}
        <div className="avatar-container">
          <img
            src={`http://localhost:5003/uploads/${user.avatar}`}
            alt="Your profile image"
          />
          <form
            className="edit-profile-image"
            onSubmit={(e) => handleUserProfileImageUpdate(e)}
          >
            <label htmlFor="edit-image">
              <FontAwesomeIcon icon={faEdit} />
            </label>
            <input
              type="file"
              className="edit-image"
              id="edit-image"
              name="avatar"
              accept="png, jpg, jpeg, jfif"
              onChange={(e) => setAvatar(e.target.files[0])}
            />
            <button type="submit">Change Profile</button>
          </form>
        </div>

        <form className="data-container" onSubmit={handleUserProfileUpdate}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={user.name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={user.email}
            />
          </div>
          <p>Change password</p>
          <div className="form-group">
            <label htmlFor="oldPassword">Old Password</label>
            <input
              type="password"
              placeholder="Old password"
              name="oldPassword"
              value={passwords.oldPassword}
              onChange={(e) =>
                setPasswords((prev) => ({
                  ...prev,
                  oldPassword: e.target.value,
                }))
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              placeholder="New password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={(e) =>
                setPasswords((prev) => ({
                  ...prev,
                  newPassword: e.target.value,
                }))
              }
            />
          </div>
          <button type="submit">Update Profile</button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
