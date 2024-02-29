import "../../stylesheets/UserProfile.scss";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Components
import ProfileUpdateForm from "./ProfileUpdateForm";
import ProfileClock from "./ProfileClock";
import ProfileAvatar from "./ProfileHeader";
import ProfileSidebar from "./ProfileSidebar";

const UserProfile = () => {
  // Other extracted state
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const token = localStorage.getItem("token");
  // General state
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
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
  // General state end
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL

  //State to show or hide edit or save image buttons
  const [isImageChosen, setIsImageChosen] = useState(false);

  const showMessage = (message, type) => {
    setMessage({ message, type });
    setTimeout(() => setMessage({ message: "", type: "" }), 1500);
  };

  const navigate = useNavigate();

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
        `${BASE_URL}/update-profile-image`,
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

    if (name === user.name || email === user.email) {
      return showMessage(
        "Your name or email is the same as your previous",
        "error"
      );
    }

    const formData = {
      name: name,
      email: email,
      hobby,
      favoriteSubject,
      password: passwords.newPassword,
    };

    try {
      setLoading(true);
      const response = await fetch(
        `${BASE_URL}/update-profile`,
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
      const { message, userData } = data;
      setUser((prevUser) => ({
        ...prevUser,
        name: userData.name,
        email: userData.email,
        hobby: userData.hobby,
        favoriteSubject: userData.favoriteSubject,
      }));
      localStorage.setItem("user", JSON.stringify(user));
      console.log(data);
      showMessage(message, "success");
    } catch (error) {
      showMessage(error.message, "error");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logoutUser = async () => {
    try {
      setLoading(true);
      let response = await fetch(`${BASE_URL}/logout`);

      if (!response.ok)
        console.log("Failed to logout user", response.statusText);
      console.log("User logged out successfully");
      // Remove user info from local storage
      localStorage.removeItem("user");
      // Remove user token from local storage
      localStorage.removeItem("token");

      navigate("/login");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-profile">
      {/* Sidebar */}

      <ProfileSidebar
        user={user}
        setAvatar={setAvatar}
        isImageChosen={isImageChosen}
        logoutUser={logoutUser}
        handleUserProfileImageUpdate={handleUserProfileImageUpdate}
      />

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
          handleUserProfileUpdate={handleUserProfileUpdate}
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
