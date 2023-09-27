// import React from 'react'
import PropTypes from "prop-types";

const Option = ({ option, onOptionClicked, selected }) => {
  return (
    <button
      className={selected ? "option selected" : "option"}
      onClick={onOptionClicked}
    >
      {option}
    </button>
  );
};

Option.propTypes = {
  option: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onOptionClicked: PropTypes.func.isRequired,
};

export default Option;
