// import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import "../stylesheets/Signin.scss";

const Signin = () => {
  return (
    <div className="form-wrapper">
      <form className="form-primary">
        <div className="form-primary__header">
          <h2 className="header">Login</h2>
          <p>Sign in to you account</p>
        </div>
        <div className="form-primary__groupings">
         
          <div className="form-group group-two">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="doe_j@soshgic.edu.gh"
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="............."
            />
          </div>
          <button type="submit">Next</button>
        </div>
        <div className="other-sign-in-methods">
            or continue
          <button>
            <FontAwesomeIcon icon={faGoogle} /> Continue with Google
          </button>
          <button>Continue with ManageBac</button>
        </div>
        <div className="new-user">
            An new user? <Link to="/signup" className="link">Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default Signin;
