// import React from 'react'
import Option from "./Option";
import "../../stylesheets/AccountOptions.scss";
import ButtonProivder from "../../contexts/ButtonProivder";
import { useButtonSelected, useButtonUpdater } from "../../contexts/ButtonProivder";
const AccountOptions = () => {
  const selected = useButtonSelected()
  const setSelected = useButtonUpdater()
  return (
    <div className="account-wrapper">
      <div className="account-options">
        <div className="account-options__header">
          <h2>Please Select</h2>
          <p>Select the option that best suits your user profile</p>
        </div>
        <div className="account-options__av-options">
          <ButtonProivder>
            <Option option="Student" selected={selected} onOptionClicked={() => setSelected()}/>
            <Option option="Hostel Tutor or Prefect" selected={selected} onOptionClicked={() => setSelected()}/>
            <Option option="Prep Admin" selected={selected} onOptionClicked={() => setSelected()}/>
          </ButtonProivder>
        </div>
        <button className="--cta next" onClick={() => {}}>
          Next
        </button>
      </div>
    </div>
  );
};

export default AccountOptions;
