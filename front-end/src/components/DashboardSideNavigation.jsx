import React, { useState } from "react";
// import { useAuth } from '../contexts/AuthContext'
import { faUser } from "@fortawesome/free-regular-svg-icons";
import exitIcon from "../assets/exit.svg";
import loopIcon from "../assets/loop.svg";
import notificationIcon from "../assets/notif.svg";
import "../stylesheets/DashboardSideNavigation.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faAdjust,
  faClipboardUser,
  faMedal,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDashBoardValues } from "../contexts/DashboardContext";
// Sinners/Loaders
import { RotatingLines } from "react-loader-spinner";

const DashboardSideNavigation = ({
  showAttendanceButton,
  setShowStudentRequests,
  setShowNotifications,
  requestsAvailable,
}) => {
  // const { currentUser, logout } = useAuth()
  const navigate = useNavigate();
  const { updateShowAllRequests, setShowAttendances, showAttendances } =
    useDashBoardValues();
  // Menu
  const [showUserMenu, setShowUserMenu] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  // Get user role from local storage
  const role = localStorage.getItem("role");

  // Function to handle logging out of currently active users
  const logoutUser = async () => {
    try {
      let response = await fetch("http://localhost:5003/api/users/logout");

      if (!response.ok)
        console.log("Failed to logout user", response.statusText);
      console.log("User logged out successfully");
      // Remove user info from local storage
      localStorage.removeItem("user");
      // Remove user token from local storage
      localStorage.removeItem("token");

      navigate("/login");
    } catch (error) {}
  };

  return (
    <aside className="dashboard-nav">
      <h1>Prep App</h1>
      <div className="profile">
        <div className="profile__image">
          {user?.avatar ? (
            <img src={`http://localhost:5003/uploads/${user.avatar}`} alt="Your avatar" className="profile__image-img" />
          ) : (
            <FontAwesomeIcon icon={faUser} style={{ fontSize: "1.5rem" }} />
          )}
        </div>
        <div className="profile__user">
          <h3>{user?.name}</h3>
          <span className="user-email">{user?.email}</span>
        </div>
        {user?.isAdmin && (
          <FontAwesomeIcon
            icon={faMedal}
            className="admin-badge"
            title="Admin Badge"
          />
        )}
      </div>
      <div className="actions">
        <button
          className="actions_requests"
          onClick={() => {
            updateShowAllRequests(true);
            setShowStudentRequests(true);
          }}
        >
          <img src={loopIcon} alt="" /> Requests
          {/* <span className='request-in'></span> */}
        </button>
        <button className="actions_notifications">
          <img src={notificationIcon} alt="" />
          Notifications
        </button>
        {/* Show attendance button if user is admin */}
        {showAttendanceButton && (
          <button
            className="actions_notifications"
            onClick={() => setShowAttendances((prev) => !prev)}
          >
            <FontAwesomeIcon
              icon={faClipboardUser}
              style={{ fontSize: "1.6rem" }}
            />
            {showAttendances ? "Hide Attendance" : "Attendance"}
            {console.log(showAttendances)}
          </button>
        )}
      </div>
      <div className="action__secondary">
        <ul className={`pop-up ${showUserMenu && "show"}`} aria-hidden="true">
          <li className="pop-up__item">
            <FontAwesomeIcon icon={faAddressBook} />
            <Link to={`/${role}/${user?._id}/profile`}>Profile</Link>
          </li>
          <li className="pop-up__item">
            <FontAwesomeIcon icon={faAdjust} />
            <Link>Theme</Link>
          </li>
        </ul>
        <button
          className="settings"
          onClick={() => setShowUserMenu((prev) => !prev)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
          >
            <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
          </svg>
        </button>
        <button className="logout" onClick={logoutUser}>
          <img
            src={exitIcon}
            alt=""
            style={{ transform: "rotateY(-180deg)" }}
          />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default DashboardSideNavigation;
