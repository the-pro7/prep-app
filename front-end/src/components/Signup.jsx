// import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import "../stylesheets/Signup.scss";

const Signup = () => {
  return (
    <div className="form-wrapper">
      <form className="form-primary">
        <div className="form-primary__header">
          <h2 className="header">Sign Up</h2>
          <p>Create an account</p>
        </div>
        <div className="form-primary__groupings">
          <div className="form-group group-one">
            <div>
              <label htmlFor="first-name">First Name</label>
              <input
                type="text"
                name="firt-name"
                id="first-name"
                placeholder="John"
              />
            </div>
            <div>
              <label htmlFor="first-name">Last Name</label>

              <input
                type="text"
                name="firt-name"
                id="first-name"
                placeholder="Doe"
              />
            </div>
          </div>
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
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              name="confirm-password"
              id="confirm-password"
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
        <div className="old-user">
            An old user? <Link to="/login" className="link">Log In</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
