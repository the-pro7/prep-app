import React from "react";
// Loaders
import {RotatingLines} from "react-loader-spinner"

const ProfileUpdateForm = ({
  loading,
  setName,
  setEmail,
  setPasswords,
  handleUserProfileUpdate,
  user,
  name,
  email,
  passwords,
  currentClass,
  setCurrentClass,
  favoriteSubject,
  setFavoriteSubject,
  hobby,
  setHobby,
}) => {
  return (
    <form className="data-form" onSubmit={handleUserProfileUpdate}>
      <div className="form-groups">
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
        <div className="form-group">
          <label htmlFor="email">Current Class</label>
          <input
            type="email"
            value={currentClass}
            onChange={(e) => setCurrentClass(e.target.value)}
            placeholder="Enter current class here"
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            placeholder="New password (leave blank to keep old password)"
            name="newPassword"
            disabled={!passwords.oldPassword}
            value={passwords.newPassword}
            onChange={(e) =>
              setPasswords((prev) => ({
                ...prev,
                newPassword: e.target.value,
              }))
            }
          />
        </div>
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
          <label htmlFor="hobby">Your hobby</label>
          <input
            type="password"
            placeholder="Any hobbies?"
            name="oldPassword"
            value={hobby}
            onChange={(e) => setHobby(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">Favorite subject</label>
          <input
            type="password"
            placeholder="Got any favorite subject?..."
            name="favorite-subject"
            value={favoriteSubject}
            onChange={(e) => setFavoriteSubject(e.target.value)}
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={!name && !email || loading}
        className="update-button form-cta"
      >
        {loading && <RotatingLines strokeColor="#fff" width="20" height="20"/>}
        {loading ? "Updating Profile" : "Update Profile"}
      </button>
    </form>
  );
};

export default ProfileUpdateForm;
