// import React from 'react'
import Option from "./Option";
import "../../stylesheets/AccountOptions.scss";

const AccountOptions = () => {
  return (
   <div className="account-wrapper">
     <div className="account-options">
      <div className="account-options__header">
        <h2>Please Select</h2>
        <p>Select the option that best suits your user profile</p>
      </div>
      <div className="account-options__av-options">
        <Option option="Student" />
        <Option option="Hostel Tutor or Prefect" />
        <Option option="Prep Admin" />
      </div>
      <button className="--cta next">Next</button>
    </div>
   </div>
  );
};

export default AccountOptions;
