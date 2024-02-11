import { faAngleLeft, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const UserProfile = () => {
  // grab user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const role = localStorage.getItem("role");
  //   State for toggling button activity
  const [fieldNotChanged, setFieldNotChanged] = useState(true);

  // Create reference for input boxes
  const nameRef = useRef();
  const emailRef = useRef();

  //   Change button activity based on whether any of the inbut boxes has a value present or not
  useEffect(() => {
    if (!nameRef.current?.value || !emailRef.current?.value) {
      setFieldNotChanged(true);
    } else {
      setFieldNotChanged(false);
    }
  }, [nameRef.current?.value, emailRef.current?.value]);

  return (
    <div className="user-profile">
      <aside className="user-profile__sidebar">
        <Link to={-1}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </Link>
        <div className="user-profile__welcome">
          <div className="user">
            <h1>{user.name}</h1>
            <span>{user.email}</span>
            {/* <p>
              Last signed-in time:{" "}
              {user?.logBarDetails[logBarDetails?.length - 1]?.signTime}
            </p> */}
          </div>
          <h2>Welcome to your profile!</h2>
          <summary>
            Go ahead an apply changes to your profile. Changes will be applied
            almost instantly to your profile in your dashboard and yout prep
            admin will also have your profile updated on their end.
          </summary>
        </div>
      </aside>
      <div className="user-profile__profile">
        <div className="avatar-container">
          <img src={user?.avatar} alt="Your profile image" />
          <form className="edit-profile-image">
            <label htmlFor="edit-image">
              {" "}
              <FontAwesomeIcon icon={faEdit} /> Change Image
            </label>
            <input type="file" className="edit-image" />
          </form>
        </div>
        <form className="data-container">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder={user.name}
              ref={nameRef}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email"> Email</label>
            <input type="email" placeholder={user.email} ref={emailRef} />
          </div>
          <button disabled={fieldNotChanged}>Update Profile</button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
