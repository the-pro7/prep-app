import React, { useEffect, useState } from "react";
import {
  faAngleLeft,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UnapprovedRequests from "./unapproved/UnapprovedRequests";
import ApprovedRequests from "./approved/ApprovedRequests";

// Admin requests panel
const AdminRequestPanel = ({ showStudentRequests }) => {
  const token = localStorage.getItem("token");
  const [requestData, setRequestData] = useState([]);
  const [search, setSearch] = useState("");

  // Grab BASE_URL from .env file
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

  // Get all requests from server
  useEffect(() => {
    // http://localhost:5003/api/users/all-requests
    async function getAllStudentRequests() {
      let getOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        let response = await fetch(`${BASE_URL}/all-requests`, getOptions);

        if (!response.ok) console.log(response.statusText);

        let data = await response.json();
        setRequestData(data);
      } catch (error) {
        console.log(error.message);
      }
    }

    // Call function to get all user requests
    getAllStudentRequests();
  }, []);

  // Get approved requests
  const approveRequests = requestData.filter(
    (request) => request?.approved === true
  );

  return (
    <div className="admin-requests">
      <div className="primary-nav">
        <button className="back-cta" onClick={() => showStudentRequests(false)}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <h1>Prep App</h1>
      </div>
      <div className="secondary-nav">
        <h3>Requests</h3>
        <div className="search">
          <input
            type="search"
            id="search"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
        </div>
      </div>
      <div className="requests-area">
        <div className="not-approved">
          <UnapprovedRequests requests={requestData} searchQuery={search} />
        </div>
        <div className="approved">
          <ApprovedRequests requests={approveRequests} />
        </div>
      </div>
    </div>
  );
};

export default AdminRequestPanel;
